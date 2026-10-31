// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Cache-busting hash for /resume.pdf links (carried over from the original portfolio).
const getResumeHash = () => {
  try {
    const fileBuffer = fs.readFileSync(path.resolve(process.cwd(), "public/resume.pdf"));
    return crypto.createHash("md5").update(fileBuffer).digest("hex").slice(0, 8);
  } catch {
    return Date.now().toString(36);
  }
};

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    define: {
      __RESUME_HASH__: JSON.stringify(getResumeHash()),
    },
  },
});
