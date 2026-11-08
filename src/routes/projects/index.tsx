import { createFileRoute } from "@tanstack/react-router";
import ProjectsPage from "@/pages/ProjectsPage";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/projects/")({
  head: () =>
    buildSeoHead({
      title: "Projects & Case Studies | Sahaya Savari",
      description:
        "Explore software applications, machine learning tools, and web applications created by Sahaya Savari.",
      url: `${SITE_URL}/projects`,
    }),
  component: ProjectsPage,
});
