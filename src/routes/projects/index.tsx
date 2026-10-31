import { createFileRoute } from "@tanstack/react-router";
import ProjectsPage from "@/pages/ProjectsPage";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/projects/")({
  head: () =>
    buildSeoHead({
      title: "AI Projects & Case Studies | Sahaya Savari",
      description:
        "Explore machine learning applications, Python APIs, full stack React apps, open-source contributions, and software architectures created by Sahaya Savari.",
      url: `${SITE_URL}/projects`,
    }),
  component: ProjectsPage,
});
