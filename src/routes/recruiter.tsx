import { createFileRoute } from "@tanstack/react-router";
import RecruiterMode from "@/pages/RecruiterMode";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/recruiter")({
  head: () =>
    buildSeoHead({
      title: "Recruiter Summary & Technical Profile | Sahaya Savari",
      description:
        "ATS-friendly recruiter summary for Sahaya Savari F, an AI Engineer, Python Developer, Full Stack Developer, and M.Sc. Artificial Intelligence student.",
      url: `${SITE_URL}/recruiter`,
    }),
  component: RecruiterMode,
});
