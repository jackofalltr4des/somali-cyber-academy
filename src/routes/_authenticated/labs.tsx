import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/labs")({
  component: LabsLayout,
});

function LabsLayout() {
  return <Outlet />;
}