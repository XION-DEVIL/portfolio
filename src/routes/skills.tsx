import { createFileRoute } from "@tanstack/react-router";
import SkillsPage from "@/pages/SkillsPage";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/skills")({
  head: () =>
    buildSeoHead({
      title: "Technical Skills & Competencies | Sahaya Savari F",
      description:
        "Technical skill inventory: Python, Machine Learning, Scikit-learn, React, TypeScript, Next.js, SQL, and Full-Stack Engineering by Sahaya Savari F.",
      url: `${SITE_URL}/skills`,
    }),
  component: SkillsPage,
});
