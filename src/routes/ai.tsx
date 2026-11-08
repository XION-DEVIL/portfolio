import { createFileRoute } from "@tanstack/react-router";
import AskSahayaAI from "@/pages/AskSahayaAI";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/ai")({
  head: () =>
    buildSeoHead({
      title: "Ask Sahaya | Portfolio Assistant",
      description:
        "Chat with Sahaya Savari F's portfolio assistant to learn about his background, projects, technical skills in React, TypeScript, Next.js, and Python, and how to get in touch.",
      url: `${SITE_URL}/ai`,
    }),
  component: AskSahayaAI,
});
