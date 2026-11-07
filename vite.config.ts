import fs from "node:fs";
import crypto from "node:crypto";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { apiChatPlugin } from "./server/apiChatPlugin";

const pagesBase = normalizeBase(process.env["PAGES_BASE"] ?? "/");

function normalizeBase(base: string) {
  let value = base.trim() || "/";
  if (!value.startsWith("/")) value = `/${value}`;
  if (!value.endsWith("/")) value = `${value}/`;
  return value;
}

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
  base: process.env["PAGES_BASE"] ? pagesBase : "/",
  define: {
    __RESUME_HASH__: JSON.stringify(getResumeHash()),
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    tanstackStart(
      process.env["PRERENDER"] !== "false"
        ? {
            server: { entry: "server" },
            router: { basepath: process.env["PAGES_BASE"] ? pagesBase : "/" },
            pages: [
              { path: "/" },
              { path: "/ai" },
              { path: "/blog" },
              { path: "/experience" },
              { path: "/recruiter" },
              { path: "/resume" },
              { path: "/projects" },
              { path: "/projects/nelsync-ai" },
              { path: "/projects/daily-spark" },
              { path: "/projects/prepmind-ai" },
              { path: "/projects/portfolio-website" },
            ],
            prerender: { enabled: true, autoStaticPathsDiscovery: false, crawlLinks: false },
          }
        : { server: { entry: "server" } },
    ),
    react(),
    tailwindcss(),
    apiChatPlugin(),
  ],
});
