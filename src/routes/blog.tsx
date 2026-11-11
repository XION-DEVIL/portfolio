import { createFileRoute } from "@tanstack/react-router";
import BlogPage from "@/pages/BlogPage";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/blog")({
  head: () =>
    buildSeoHead({
      title: "Technical Articles & Engineering Insights | Sahaya Savari",
      description:
        "Technical articles and insights on Artificial Intelligence, Machine Learning pipelines, React performance optimization, and software engineering by Sahaya Savari.",
      url: `${SITE_URL}/blog`,
    }),
  component: BlogPage,
});
