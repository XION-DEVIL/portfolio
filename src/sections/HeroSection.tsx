import { useEffect, useState, memo, useRef, lazy, Suspense } from "react";
const HeroBadge = lazy(() => import("../components/reactbits/HeroBadge"));
const HeroName = lazy(() => import("../components/reactbits/HeroName"));
import { Play, ArrowUpRight } from "lucide-react";
import RotatingText from "../components/RotatingText";
import FocusText from "../components/FocusText";
import { RainbowButton } from "../components/magicui/rainbow-button";

// Static Badge Card fallback — visually matches Three.js 3D Lanyard badge to prevent layout/visual flash
const StaticBadgeCard = () => (
  <div className="relative w-full h-full flex flex-col items-center justify-start pointer-events-none select-none animate-portrait-float">
    {/* Hanging Lanyard Strap & Clip */}
    <div className="w-5 h-8 bg-[#18181b] border-x border-white/20 flex flex-col items-center justify-end -mb-1 z-10 shadow-md">
      <div className="w-6 h-2.5 bg-[#27272a] rounded-[2px] border border-white/30" />
      <div className="w-3 h-2 border-b-2 border-x-2 border-zinc-400 rounded-b-sm" />
    </div>

    {/* ID Badge Card matching 3D Lanyard aspect ratio & dimensions */}
    <div className="relative w-[180px] h-[255px] sm:w-[205px] sm:h-[290px] lg:w-[230px] lg:h-[325px] rounded-2xl overflow-hidden border border-white/20 bg-[#0b0b14] shadow-[0_20px_50px_rgba(0,0,0,0.85)] flex items-center justify-center">
      <img
        src={`${import.meta.env.BASE_URL}profile.webp`}
        alt="Sahaya Savari F"
        width={240}
        height={340}
        className="w-full h-full object-cover object-top"
        loading="eager"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10 pointer-events-none" />
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/15 pointer-events-none" />
    </div>
  </div>
);

const StaticHeroName = () => (
  <span
    aria-hidden="true"
    className="text-[clamp(1.8rem,5.8vw,5.8rem)] font-heading font-extrabold tracking-tight whitespace-nowrap inline-block select-none"
    style={{
      backgroundImage:
        "radial-gradient(circle, #ffffff 42%, #818cf8 50%, transparent 58%)",
      backgroundSize: "3px 3px",
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      WebkitTextFillColor: "transparent",
      color: "transparent",
      filter: "drop-shadow(0 0 16px rgba(129, 140, 248, 0.45))",
    }}
  >
    Sahaya Savari&nbsp;F
  </span>
);

interface HeroSectionProps {
  setShowResume: (show: boolean) => void;
}

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf?v=${typeof __RESUME_HASH__ !== "undefined" ? __RESUME_HASH__ : Date.now()}`;
const HERO_POSTER = `${import.meta.env.BASE_URL}hero-ambient-poster.webp`;

const HeroSection = memo(({ setShowResume }: HeroSectionProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [enableInteractiveEffects, setEnableInteractiveEffects] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("requestIdleCallback" in window) {
      const id = (
        window as Window & {
          requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number;
        }
      ).requestIdleCallback(() => setIsMounted(true), { timeout: 1200 });
      return () => {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(id);
      };
    } else {
      const timer = setTimeout(() => setIsMounted(true), 300);
      return () => clearTimeout(timer);
    }
  }, []);

  // Interactive 3D Lanyard ID Card (Pull and play physics on all devices)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    // Enable immediately after hydration tick so users can grab and pull right away
    const timer = setTimeout(() => {
      setEnableInteractiveEffects(true);
    }, 120);

    const onUserInteraction = () => {
      setEnableInteractiveEffects(true);
    };
    window.addEventListener("pointerdown", onUserInteraction, { once: true, passive: true });
    window.addEventListener("touchstart", onUserInteraction, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointerdown", onUserInteraction);
      window.removeEventListener("touchstart", onUserInteraction);
    };
  }, []);

  // Ambient botanical flowers video: loads on user interaction (touch, scroll, click, pointer, wheel)
  // so the instant 78KB WebP poster provides an ultra-fast sub-second LCP without 11MB video bandwidth contention
  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    const constrainedConnection =
      connection?.saveData || /(2g|3g)/.test(connection?.effectiveType || "");

    if (prefersReducedMotion || constrainedConnection) return;

    const events = ["scroll", "pointerdown", "touchstart", "keydown", "wheel"] as const;
    const startVideo = () => {
      events.forEach((e) => window.removeEventListener(e, startVideo));
      setShouldLoadVideo(true);
    };

    events.forEach((e) => window.addEventListener(e, startVideo, { once: true, passive: true }));

    return () => {
      events.forEach((e) => window.removeEventListener(e, startVideo));
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Introduction"
      className="relative min-h-[100dvh] flex flex-col px-6 overflow-hidden bg-transparent"
    >
      {/* Background ambient visual on all screens (responsive flowers image + flowing video) */}
      <div
        className="absolute inset-0 w-full h-full z-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Ambient botanical flowers poster image */}
          <img
            src={HERO_POSTER}
            alt=""
            width={960}
            height={540}
            fetchPriority="high"
            decoding="async"
            className={`w-full h-full object-cover object-center transition-opacity duration-1000 ${
              isVideoLoaded ? "opacity-0" : "opacity-75"
            }`}
            aria-hidden="true"
          />

          {/* Ambient botanical flowers background video */}
          {shouldLoadVideo && (
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
              poster={HERO_POSTER}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              width={1920}
              height={1080}
              onCanPlay={() => setIsVideoLoaded(true)}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
                isVideoLoaded ? "opacity-75" : "opacity-0"
              }`}
              aria-hidden="true"
            />
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-black/15 z-0 pointer-events-none" aria-hidden="true" />
      <div
        className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black via-black/40 to-transparent z-[1]"
        aria-hidden="true"
      />

      {/* Main hero content */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center pt-28 pb-16 md:pt-36 md:pb-24 w-full">
        <div className="max-w-5xl lg:max-w-6xl xl:max-w-7xl text-center flex flex-col items-center w-full">
          <div className="liquid-glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full bg-green-400 animate-pulse"
              aria-hidden="true"
            ></span>
            <span className="text-xs font-body font-medium text-white/80">
              Open to Opportunities · Summer/Fall 2026
            </span>
          </div>
          <div className="relative mb-6 md:mb-8 flex flex-col items-center justify-center w-full">
            <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 lg:gap-8 relative w-full max-w-[1000px] mx-auto">
              <h1
                aria-label="Sahaya Savari F"
                className="font-heading not-italic font-bold text-white order-2 md:order-1 mb-6 md:mb-0 w-full md:w-auto md:flex-1 max-w-[850px] h-[90px] sm:h-[120px] md:h-[150px] lg:h-[180px] flex items-center justify-center whitespace-nowrap overflow-hidden"
                style={{ fontStyle: "normal" }}
              >
                {isMounted ? (
                  <Suspense fallback={<StaticHeroName />}>
                    <HeroName />
                  </Suspense>
                ) : (
                  <StaticHeroName />
                )}
              </h1>

              {/* Balanced Floating Ethereal Portrait (Hardware-composited via GPU CSS animation) */}
              <div className="relative order-1 md:order-2 shrink-0 group md:mr-24 lg:mr-32">
                <div className="relative w-[200px] h-[290px] sm:w-[230px] sm:h-[330px] lg:w-[260px] lg:h-[370px]">
                  {enableInteractiveEffects ? (
                    <div className="absolute -inset-x-[70px] -top-6 -bottom-6 sm:-inset-x-[80px] md:-inset-x-[160px] lg:-inset-x-[220px]">
                      <Suspense fallback={<StaticBadgeCard />}>
                        <HeroBadge />
                      </Suspense>
                    </div>
                  ) : (
                    <StaticBadgeCard />
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 w-full px-4 mt-4">
              <span className="font-heading font-normal text-fluid-hero-role text-white/80">
                I am an
              </span>
              <div className="w-[280px] sm:w-auto text-center sm:text-left flex justify-center sm:justify-start">
                <RotatingText
                  texts={[
                    "AI Engineer",
                    "M.Sc. AI Student",
                    "Python Developer",
                    "Full Stack Developer",
                  ]}
                  mainClassName="px-3.5 py-1 liquid-glass text-white overflow-hidden rounded-lg font-bold not-italic text-fluid-hero-role inline-flex items-center justify-center"
                  staggerFrom="last"
                  splitBy="words"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={4000}
                />
              </div>
            </div>
          </div>

          {/* LCP Text: Rendered immediately with optimal contrast */}
          <p className="text-white/75 font-body font-light text-lg md:text-xl max-w-2xl mb-8 md:mb-12 leading-relaxed">
            M.Sc. Artificial Intelligence student building Machine Learning applications, Python
            automation tools, and responsive web software with React and TypeScript. Highlighting
            verified engineering projects for Summer/Fall 2026 opportunities.
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4">
            <RainbowButton onClick={() => setShowResume(true)} aria-label="View Resume">
              View Resume
              <ArrowUpRight
                className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                aria-hidden="true"
              />
            </RainbowButton>
            <a
              href="#projects"
              className="text-white/70 hover:text-white font-body font-medium text-sm flex items-center gap-2 transition-all px-8 py-4 bg-white/5 rounded-full backdrop-blur-md border border-white/10 hover:bg-white/10 min-h-[48px]"
              aria-label="View Projects"
            >
              View Projects <Play className="w-4 h-4 fill-current" aria-hidden="true" />
            </a>
          </div>

          {/* Recruiter Quick View Card */}
          <div
            className="mt-12 w-full max-w-4xl rounded-3xl border border-white/[0.08] transition-all duration-700"
            style={{
              background: "rgba(10, 10, 14, 0.65)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 0 1px rgba(255,255,255,0.02), 0 20px 50px rgba(0,0,0,0.4)",
            }}
          >
            <div className="grid md:grid-cols-3 gap-8 p-6 md:p-8 text-left">
              {/* Left Column: Core Credentials & Bio info */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4">
                  <div>
                    <h2 className="text-white font-heading font-bold text-lg leading-none">
                      Recruiter Quick View
                    </h2>
                    <span className="text-[10px] text-white/70 font-body uppercase tracking-wider block mt-1.5">
                      Candidate profile summary
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-green-400 border border-green-500/20 px-2 py-0.5 rounded bg-green-500/5 flex items-center gap-1.5 shrink-0">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"
                      aria-hidden="true"
                    />
                    Available Summer/Fall 2026
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-x-4 gap-y-4 text-xs font-body">
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">
                      Education
                    </span>
                    <span className="text-white/90 font-medium">
                      M.Sc. AI (Current) · B.Sc. Data Science
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">
                      Experience
                    </span>
                    <span className="text-white/90 font-medium">SEO & Web Trainee @ HodoLabs</span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">
                      Target Roles
                    </span>
                    <span className="text-white/90 font-medium">
                      AI Engineer, Python Developer, Full Stack
                    </span>
                  </div>
                  <div>
                    <span className="block text-[9px] text-white/70 uppercase tracking-widest mb-1">
                      Location & Preference
                    </span>
                    <span className="text-white/90 font-medium">
                      Tamil Nadu, India · Remote / Relocate
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <span className="block text-[9px] font-body text-white/70 uppercase tracking-widest mb-2">
                    Primary Stack
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Python",
                      "Artificial Intelligence",
                      "Machine Learning",
                      "React",
                      "TypeScript",
                      "Firebase",
                    ].map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-white/70"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: CTA Actions */}
              <div className="flex flex-col justify-center gap-4 bg-white/[0.01] border-t md:border-t-0 md:border-l border-white/[0.06] pt-6 md:pt-0 md:pl-8">
                {/* 1-Click Resume Download */}
                <a
                  href={RESUME_URL}
                  download="Sahaya_Savari_Resume.pdf"
                  className="w-full text-center text-xs font-body font-semibold px-4 py-3.5 rounded-full bg-white text-black hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer"
                  aria-label="Download PDF Resume"
                >
                  Download PDF Resume
                </a>

                {/* Get in Touch CTA */}
                <a
                  href="#contact"
                  className="w-full text-center text-xs font-body font-medium px-4 py-3.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-white/90 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  aria-label="Get In Touch — Contact section"
                >
                  Get In Touch
                </a>

                {/* Profiles row */}
                <div className="flex items-center justify-center gap-6 mt-2">
                  <a
                    href="https://github.com/sahaya-savari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-xs font-body flex items-center gap-1.5"
                    aria-label="GitHub (opens in new tab)"
                  >
                    GitHub
                  </a>
                  <span className="text-white/10" aria-hidden="true">
                    |
                  </span>
                  <a
                    href="https://www.linkedin.com/in/sahaya-savari"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors text-xs font-body flex items-center gap-1.5"
                    aria-label="LinkedIn (opens in new tab)"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Moved outside max-w-4xl to give FocusText full section width */}
        <div
          className="mt-8 md:mt-12 flex flex-col items-center gap-4 shrink-0 pointer-events-none w-full"
          aria-hidden="true"
        >
          <div className="liquid-glass px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white/70">
            What I work with
          </div>
          <FocusText prefix="Data AI Analytics" focusText="GenAI" className="" />
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
