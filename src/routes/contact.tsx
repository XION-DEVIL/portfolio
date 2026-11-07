import { createFileRoute } from "@tanstack/react-router";
import ContactPage from "@/pages/ContactPage";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/contact")({
  head: () =>
    buildSeoHead({
      title: "Contact & Connect | Sahaya Savari F",
      description:
        "Get in touch with Sahaya Savari F for AI Engineering, Machine Learning, and Full Stack opportunities. Connect via email, LinkedIn, or schedule a discussion.",
      url: `${SITE_URL}/contact`,
    }),
  component: ContactPage,
});
