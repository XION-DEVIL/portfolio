import { createFileRoute } from "@tanstack/react-router";
import AboutPage from "@/pages/AboutPage";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/about")({
  head: () =>
    buildSeoHead({
      title: "About Sahaya Savari F | AI/ML & Full Stack Software Engineer",
      description:
        "Biography, academic background at St. Joseph's and Thiagarajar, core philosophy, and engineering story of Sahaya Savari F.",
      url: `${SITE_URL}/about`,
    }),
  component: AboutPage,
});
