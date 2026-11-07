import { createFileRoute } from "@tanstack/react-router";
import ExperiencePage from "@/pages/ExperiencePage";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/experience")({
  head: () =>
    buildSeoHead({
      title: "Work Experience & Hackathon Honors | Sahaya Savari F",
      description:
        "Professional work experience, software engineering internships, technical SEO leadership at HodoLabs, and national AI hackathon championship awards of Sahaya Savari F.",
      url: `${SITE_URL}/experience`,
    }),
  component: ExperiencePage,
});

