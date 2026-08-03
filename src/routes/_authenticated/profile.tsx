import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Loader2, UserRound } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { getStudentData, saveProfile } from "@/lib/learning.functions";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile-kaaga — SomTrust Cyber Academy" },
      { name: "description", content: "Cusboonaysii magacaaga, magaalada, yoolkaaga iyo saacadaha barashada toddobaadlaha." },
      { property: "og:title", content: "Profile-kaaga — SomTrust Cyber Academy" },
      { property: "og:description", content: "Maamul profile-ka ardayga SomTrust Cyber Academy." },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const fetchStudent = useServerFn(getStudentData);
  const { data } = useQuery({ queryKey: ["student"], queryFn: () => fetchStudent() });

  if (!data) {
    return (
      <PageShell>
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" /> Waa la soo dejinayaa…
        </p>
      </PageShell>
    );
  }
  return <ProfileForm data={data} />;
}

type StudentData = Awaited<ReturnType<typeof getStudentData>>;

function ProfileForm({ data }: { data: StudentData }) {
  const queryClient = useQueryClient();
  const save = useServerFn(saveProfile);
  const [displayName, setDisplayName] = useState(data.profile?.display_name ?? "");
  const [city, setCity] = useState(data.profile?.city ?? "");
  const [goal, setGoal] = useState(data.profile?.goal ?? "");
  const [weeklyHours, setWeeklyHours] = useState(data.profile?.weekly_hours ?? 5);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setError(null);
    if (displayName.trim().length < 2) {
      setError("Magaca waa inuu ka badan yahay 2 xaraf.");
      return;
    }
    setBusy(true);
    try {
      await save({
        data: {
          displayName: displayName.trim(),
          city: city.trim() || undefined,
          goal: goal.trim() || undefined,
          weeklyHours: Number(weeklyHours),
        },
      });
      await queryClient.invalidateQueries({ queryKey: ["student"] });
      setMsg("Profile-ka waa la kaydiyay.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Kaydinta way fashilantay");
    } finally {
      setBusy(false);
    }
  }

  return (
    <PageShell>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1 text-xs text-muted-foreground">
        <UserRound className="size-3.5 text-primary" /> Student profile
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold">Profile-kaaga</h1>
      <p className="mt-2 text-sm text-muted-foreground">{data.email}</p>

      <form onSubmit={submit} className="bento-card mt-7 max-w-xl space-y-4 p-6">
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Magaca buuxa
          </span>
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} maxLength={60} className="input-base" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Magaalada
          </span>
          <input value={city} onChange={(e) => setCity(e.target.value)} maxLength={60} className="input-base" placeholder="Muqdisho" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Yoolkaaga
          </span>
          <input value={goal} onChange={(e) => setGoal(e.target.value)} maxLength={200} className="input-base" placeholder="Junior SOC Analyst 6 bilood gudahood" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Saacadaha toddobaadlaha ({weeklyHours}h)
          </span>
          <input
            type="range"
            min={1}
            max={40}
            value={weeklyHours}
            onChange={(e) => setWeeklyHours(Number(e.target.value))}
            className="w-full accent-[hsl(var(--primary))]"
          />
        </label>

        {error && (
          <p className="rounded-xl border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>
        )}
        {msg && (
          <p className="rounded-xl border border-primary/40 bg-primary/10 px-3 py-2 text-sm text-foreground">{msg}</p>
        )}

        <button
          type="submit"
          disabled={busy}
          className="flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          {busy && <Loader2 className="size-4 animate-spin" />} Kaydi
        </button>
      </form>
    </PageShell>
  );
}
