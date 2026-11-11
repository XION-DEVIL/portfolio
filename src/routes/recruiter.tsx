import { createFileRoute } from "@tanstack/react-router";
import RecruiterMode from "@/pages/RecruiterMode";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/recruiter")({
  head: () =>
    buildSeoHead({
      title: "Recruiter Summary & Technical Profile | Sahaya Savari",
      description:
        "ATS-friendly recruiter summary for Sahaya Savari F, a Student AI/ML Engineer and M.Sc. Artificial Intelligence student seeking Summer 2027 internships in software engineering, backend, and applied AI.",
      url: `${SITE_URL}/recruiter`,
    }),
  component: RecruiterMode,
});
