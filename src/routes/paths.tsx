import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Shell";

export const Route = createFileRoute("/paths")({
  component: PathsLayout,
});

function PathsLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}