import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Shell";

export const Route = createFileRoute("/_authenticated/labs")({
  component: LabsLayout,
});

function LabsLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}
