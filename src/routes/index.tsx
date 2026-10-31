import { createFileRoute } from "@tanstack/react-router";
import HomePage from "@/pages/HomePage";
import { buildSeoHead, DEFAULT_DESCRIPTION, DEFAULT_TITLE } from "@/seo";

export const Route = createFileRoute("/")({
  head: () => buildSeoHead({ title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION }),
  component: HomePage,
});
