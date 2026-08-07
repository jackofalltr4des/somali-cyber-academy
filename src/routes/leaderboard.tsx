import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Loader2, Medal, Trophy } from "lucide-react";
import { PageShell } from "@/components/site/Shell";
import { getLeaderboard } from "@/lib/learning.functions";

const title = "Leaderboard — SomTrust Cyber Academy";
const description = "Top 5 ardayda ugu dhibcaha badan SomTrust Cyber Academy.";

export const Route = createFileRoute("/leaderboard")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LeaderboardPage,
});

const rankColor = [
  "bg-warning/15 text-warning", // 1st
  "bg-muted-foreground/15 text-muted-foreground", // 2nd
  "bg-primary/15 text-primary", // 3rd
];

function LeaderboardPage() {
  const fetchLeaderboard = useServerFn(getLeaderboard);
  const { data, isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: () => fetchLeaderboard(),
  });

  const entries = data?.entries ?? [];

  return (
    <PageShell>
      <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-surface px-3 py-1 text-xs text-muted-foreground">
        <Trophy className="size-3.5 text-primary" /> Leaderboard
      </span>

      <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
        Top 5 Ardayda
      </h1>

      <p className="mt-3 max-w-2xl text-muted-foreground">
        Ardayda ugu dhibcaha badan SomTrust Cyber Academy — dhibcaha waxaa
        laga helaa casharrada, labs-ka, imtixaannada, iyo streak-ga.
      </p>

      <div className="mt-8">
        {isLoading ? (
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="size-4 animate-spin" /> Waa la soo dejinayaa…
          </p>
        ) : entries.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Wali ma jiraan arday leh username la diiwaan geliyay.
          </p>
        ) : (
          <div className="space-y-3">
            {entries.map((e, i) => (
              <div
                key={e.username}
                className="bento-card flex items-center gap-4 p-5"
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full font-display text-lg font-bold ${
                    rankColor[i] ?? "bg-surface text-muted-foreground"
                  }`}
                >
                  {i < 3 ? <Medal className="size-5" /> : i + 1}
                </span>
                <div className="flex-1">
                  <p className="font-display font-semibold">@{e.username}</p>
                </div>
                <p className="font-display text-xl font-bold text-primary">
                  {e.total_points}
                  <span className="ml-1 text-xs font-medium text-muted-foreground">dhibco</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </PageShell>
  );
}
