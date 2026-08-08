import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

// Deliberately separate from vite.config.ts: that file is wired to
// @lovable.dev/vite-tanstack-config, which owns the app build and warns
// against adding plugins manually. Unit tests don't need the TanStack
// Start/router/Tailwind pipeline, just the "@" path alias the source
// files already use.
export default defineConfig({
  plugins: [tsConfigPaths()],
  test: {
    environment: "node",
  },
});
