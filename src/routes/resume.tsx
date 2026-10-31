import { createFileRoute } from "@tanstack/react-router";
import ResumePage from "@/pages/ResumePage";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/resume")({
  head: () =>
    buildSeoHead({
      title: "Resume & Curriculum Vitae | Sahaya Savari",
      description:
        "View and download the complete curriculum vitae of Sahaya Savari, M.Sc. Artificial Intelligence student, AI/ML & Full Stack Developer.",
      url: `${SITE_URL}/resume`,
    }),
  component: ResumePage,
});
