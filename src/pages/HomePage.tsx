import { lazy } from "react";
import { useOutletContext } from "@/lib/router-compat";
import SEOHead from "../components/SEOHead";
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, homeSchema } from "../seo";

// Import Hero directly for above-the-fold fast rendering
import HeroSection from "../sections/HeroSection";
import IntersectionLazy from "../components/IntersectionLazy";
import { DotPattern } from "../components/magicui/dot-pattern";

// Lazy-load remaining sections to optimize initial bundle size & Core Web Vitals
const AboutSection = lazy(() => import("../sections/AboutSection"));
const ExperienceSection = lazy(() => import("../sections/ExperienceSection"));
const SkillsSection = lazy(() => import("../sections/SkillsSection"));
const StatsSection = lazy(() => import("../sections/StatsSection"));
const ProjectsSection = lazy(() => import("../sections/ProjectsSection"));
const BlogSection = lazy(() => import("../sections/BlogSection"));
const OpenSourceSection = lazy(() => import("../sections/OpenSourceSection"));
const CertificationsSection = lazy(() => import("../sections/CertificationsSection"));
const ContactSection = lazy(() => import("../sections/ContactSection"));

export default function HomePage() {
  const { setShowResume, setShowCommandPalette } = useOutletContext<{
    setShowResume: (show: boolean) => void;
    setShowCommandPalette: (show: boolean) => void;
  }>();

  return (
    <>
      <SEOHead title={DEFAULT_TITLE} description={DEFAULT_DESCRIPTION} schema={homeSchema} />

      {/* Hero Section */}
      <HeroSection setShowResume={setShowResume} />

      {/* Content sections between Hero and Contact */}
      <div className="relative isolate overflow-hidden max-w-screen-xl mx-auto">
        <DotPattern
          width={28}
          height={28}
          cx={1}
          cy={1}
          cr={1}
          className="pointer-events-none fill-white/[0.035] [mask-image:linear-gradient(to_bottom,transparent,white_6rem,white_calc(100%-6rem),transparent)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,white_6rem,white_calc(100%-6rem),transparent)]"
        />

        {/* 1. About Me */}
        <div id="about">
          <IntersectionLazy fallbackHeight="100vh">
            <AboutSection setShowResume={setShowResume} />
          </IntersectionLazy>
        </div>

        {/* 2. Work Experience & Hackathons */}
        <div id="experience">
          <IntersectionLazy fallbackHeight="80vh">
            <ExperienceSection />
          </IntersectionLazy>
        </div>

        {/* 3. Technologies & Skills */}
        <div id="skills">
          <IntersectionLazy fallbackHeight="80vh">
            <SkillsSection />
          </IntersectionLazy>
        </div>

        {/* Stats Overview */}
        <IntersectionLazy fallbackHeight="40vh">
          <StatsSection />
        </IntersectionLazy>

        {/* 4. Featured Projects */}
        <div id="projects">
          <IntersectionLazy fallbackHeight="150vh">
            <ProjectsSection />
          </IntersectionLazy>
        </div>

        {/* 5. Developer Blog */}
        <div id="blog">
          <IntersectionLazy fallbackHeight="80vh">
            <BlogSection />
          </IntersectionLazy>
        </div>

        {/* 6. Open Source / GitHub */}
        <div id="open-source">
          <IntersectionLazy fallbackHeight="60vh">
            <OpenSourceSection />
          </IntersectionLazy>
        </div>

        {/* Certifications */}
        <div id="certifications">
          <IntersectionLazy fallbackHeight="100vh">
            <CertificationsSection />
          </IntersectionLazy>
        </div>

        <div className="section-divider" aria-hidden="true" />
      </div>

      {/* 8. Contact CTA (Full-width cinematic footer spanning edge-to-edge) */}
      <div id="contact" className="w-full">
        <IntersectionLazy fallbackHeight="100vh">
          <ContactSection setShowCommandPalette={setShowCommandPalette} />
        </IntersectionLazy>
      </div>
    </>
  );
}
