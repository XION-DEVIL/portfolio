import { createFileRoute } from "@tanstack/react-router";
import CertificationsPage from "@/pages/CertificationsPage";
import { buildSeoHead, SITE_URL } from "@/seo";

export const Route = createFileRoute("/certifications")({
  head: () =>
    buildSeoHead({
      title: "Certifications, Specializations & Coursework | Sahaya Savari F",
      description:
        "Verified credentials: IBM Data Analyst Professional Certificate, NPTEL IIT Madras Machine Learning, NIELIT Yuva AI for All, and HodoLabs Software Engineering by Sahaya Savari F.",
      url: `${SITE_URL}/certifications`,
    }),
  component: CertificationsPage,
});
