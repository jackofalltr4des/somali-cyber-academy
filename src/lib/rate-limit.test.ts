import { describe, it, expect, vi, beforeEach } from "vitest";

const rpcMock = vi.fn();
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: { rpc: (...args: unknown[]) => rpcMock(...args) },
}));

const { enforceRateLimit } = await import("./rate-limit");

describe("enforceRateLimit", () => {
  beforeEach(() => {
    rpcMock.mockReset();
  });

  it("resolves without throwing when the RPC allows the request", async () => {
    rpcMock.mockResolvedValueOnce({ data: true, error: null });
    await expect(enforceRateLimit("user-1", "submitPayment")).resolves.toBeUndefined();
  });

  it("throws a friendly, localized error when the RPC reports the limit was exceeded", async () => {
    rpcMock.mockResolvedValueOnce({ data: false, error: null });
    await expect(enforceRateLimit("user-1", "submitPayment")).rejects.toThrow(
      "Waad soo dirtay codsi badan oo dhow. Fadlan sug in yar kadib isku day.",
    );
  });

  it("does not throw and does not leak raw Postgres/RPC error details when the RPC call itself errors", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    rpcMock.mockResolvedValueOnce({
      data: null,
      error: {
        message: 'duplicate key value violates unique constraint "rate_limit_counters_pkey"',
      },
    });

    await expect(enforceRateLimit("user-1", "submitPayment")).resolves.toBeUndefined();
    consoleSpy.mockRestore();
  });

  it("never includes a Postgres/RPC error message in the thrown error for an over-limit rejection", async () => {
    rpcMock.mockResolvedValueOnce({ data: false, error: null });
    try {
      await enforceRateLimit("user-1", "submitExam", "soc-analyst");
      expect.unreachable("expected enforceRateLimit to throw");
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      expect(message).not.toMatch(/duplicate key|postgres|rpc|sql|constraint/i);
    }
  });

  it("scopes the action key when a scope is provided (per-path / per-lab limits)", async () => {
    rpcMock.mockResolvedValueOnce({ data: true, error: null });
    await enforceRateLimit("user-1", "submitExam", "soc-analyst");
    expect(rpcMock).toHaveBeenCalledWith(
      "check_rate_limit",
      expect.objectContaining({ p_action: "submitExam:soc-analyst", p_user_id: "user-1" }),
    );
  });

  it("uses the plain action as the key when no scope is provided", async () => {
    rpcMock.mockResolvedValueOnce({ data: true, error: null });
    await enforceRateLimit("user-1", "completeLesson");
    expect(rpcMock).toHaveBeenCalledWith(
      "check_rate_limit",
      expect.objectContaining({ p_action: "completeLesson" }),
    );
  });

  it("passes the configured window/limit for each action", async () => {
    rpcMock.mockResolvedValueOnce({ data: true, error: null });
    await enforceRateLimit("user-1", "adminAction");
    expect(rpcMock).toHaveBeenCalledWith(
      "check_rate_limit",
      expect.objectContaining({ p_window_seconds: 5 * 60, p_limit: 30 }),
    );
  });
});
