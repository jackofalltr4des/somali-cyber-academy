import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Shell";

export const Route = createFileRoute("/tools")({
  component: ToolsLayout,
});

function ToolsLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}
