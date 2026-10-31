import { createFileRoute } from "@tanstack/react-router";
import NotFound from "@/pages/NotFound";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/$")({
  head: () =>
    buildSeoHead({
      title: "404 Not Found | Sahaya Savari F Portfolio",
      description: "The page you are looking for does not exist.",
      url: `${SITE_URL}/404`,
      robots: "noindex, nofollow",
    }),
  component: NotFound,
});
