import { useEffect, useMemo, lazy, Suspense } from "react";
import { Link } from "@/lib/router-compat";
import { ArrowLeft, FileText, Sparkles } from "lucide-react";
import SEOHead from "../components/SEOHead";
import { SITE_URL, createBreadcrumbSchema } from "../seo";

const ExperienceSection = lazy(() => import("../sections/ExperienceSection"));

export default function ExperiencePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const experienceSchema = useMemo(() => {
    const breadcrumb = createBreadcrumbSchema([
      { name: "Home", url: SITE_URL },
      { name: "Experience", url: `${SITE_URL}/experience` },
    ]);
    return {
      "@context": "https://schema.org",
      "@graph": [
        breadcrumb,
        {
          "@type": "ProfilePage",
          "@id": `${SITE_URL}/experience/#webpage`,
          url: `${SITE_URL}/experience`,
          name: "Work Experience & Hackathon Honors | Sahaya Savari F",
          description:
            "Professional work experience, software engineering internships, technical SEO leadership at HodoLabs, and national AI hackathon championship awards of Sahaya Savari F.",
          author: { "@id": `${SITE_URL}/#person` },
        },
      ],
    };
  }, []);

  return (
    <>
      <SEOHead
        title="Work Experience & Hackathon Honors | Sahaya Savari F"
        description="Professional work experience, software engineering internships, technical SEO leadership at HodoLabs, and national AI hackathon championship awards of Sahaya Savari F."
        url={`${SITE_URL}/experience`}
        schema={experienceSchema}
      />
      <div className="pt-28 pb-16 px-4 md:px-6 max-w-screen-xl mx-auto min-h-screen">
        <div className="flex items-center justify-between gap-4 mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-body text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Portfolio Home
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/resume"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 text-xs font-body text-white/80 hover:text-white hover:border-white/40 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              View Resume
            </Link>
            <Link
              to="/recruiter"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-body text-white transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              Recruiter Mode
            </Link>
          </div>
        </div>

        <Suspense
          fallback={
            <div className="py-24 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white/50" />
            </div>
          }
        >
          <ExperienceSection />
        </Suspense>
      </div>
    </>
  );
}
