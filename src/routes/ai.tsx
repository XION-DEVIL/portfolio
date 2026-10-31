import { createFileRoute } from "@tanstack/react-router";
import AskSahayaAI from "@/pages/AskSahayaAI";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/ai")({
  head: () =>
    buildSeoHead({
      title: "Ask Sahaya AI | Portfolio Assistant for AI Engineering",
      description:
        "Chat with Sahaya Savari F's portfolio assistant to learn about his AI Engineer skills, Machine Learning projects, Python, React, TypeScript, and Firebase work.",
      url: `${SITE_URL}/ai`,
    }),
  component: AskSahayaAI,
});
