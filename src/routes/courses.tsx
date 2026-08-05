import { createFileRoute, Outlet } from "@tanstack/react-router";
import { PageShell } from "@/components/site/Shell";

export const Route = createFileRoute("/courses")({
  component: CoursesLayout,
});

function CoursesLayout() {
  return (
    <PageShell>
      <Outlet />
    </PageShell>
  );
}