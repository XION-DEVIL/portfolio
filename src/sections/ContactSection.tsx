import { useState, memo } from "react";
import {
  Check,
  Mail,
  MapPin,
  Linkedin,
  Github,
  Search,
  Copy,
  ArrowUpRight,
  ExternalLink,
} from "lucide-react";
import HlsVideo from "../components/HlsVideo";
import Dock from "../components/Dock";

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf?v=${typeof __RESUME_HASH__ !== "undefined" ? __RESUME_HASH__ : Date.now()}`;

interface ContactSectionProps {
  setShowCommandPalette: (v: boolean) => void;
}

const ContactSection = memo(({ setShowCommandPalette }: ContactSectionProps) => {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@sahayasavari.dev");
      setCopied(true);
      setCopyError(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopyError(true);
    }
  };

  return (
    <footer
      className="relative pt-16 pb-16 px-4 md:px-6 overflow-hidden bg-black"
      aria-label="Contact information"
    >
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <HlsVideo
          src="https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8"
          className="w-full h-full object-cover opacity-50"
          poster="https://image.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q/thumbnail.webp?time=0&width=960"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/20 to-black" />
      </div>
      <div className="relative z-10 max-w-screen-xl mx-auto">
        <div className="text-center mb-16 md:mb-24 lg:mb-32">
          <h2 className="text-fluid-contact-heading font-heading font-bold text-white tracking-tight leading-[0.8] mb-8 md:mb-12">
            Let's Build <br /> Something.
          </h2>
          <p className="text-white/60 font-body font-light text-xl max-w-2xl mx-auto mb-10 md:mb-16">
            I'm open to new projects, internships, and collaborations where AI, Machine Learning,
            Python, React, TypeScript, Firebase, and full-stack product thinking can create
            real-world impact.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <div className="liquid-glass-strong rounded-full font-body flex items-center border border-white/10 hover:border-white/20 transition-all shadow-lg backdrop-blur-xl p-1.5 sm:p-2 gap-1 sm:gap-2 max-w-full">
              {/* Touching the email address copies it to clipboard */}
              <button
                type="button"
                onClick={copyEmail}
                className="flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-5 py-2 rounded-full hover:bg-white/10 text-white font-medium text-sm sm:text-base md:text-lg transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 touch-manipulation"
                aria-label={
                  copied
                    ? "Email copied to clipboard"
                    : "Copy contact@sahayasavari.dev to clipboard"
                }
                title="Click to copy email address"
              >
                {copied ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-emerald-400" />
                ) : (
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-white/80 group-hover:text-white" />
                )}
                <span className="text-white group-hover:text-white/90">
                  contact@sahayasavari.dev
                </span>
                {copied && (
                  <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full ml-1">
                    Copied
                  </span>
                )}
              </button>

              <div className="w-[1px] h-6 bg-white/15 shrink-0" aria-hidden="true" />

              {/* Right side: Redirect button (mailto:) — clean icon, no 'Copy' letters */}
              <a
                href="mailto:contact@sahayasavari.dev"
                className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-white/15 text-white/70 hover:text-white transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 shrink-0 touch-manipulation"
                aria-label="Open email client (mailto:contact@sahayasavari.dev)"
                title="Open mail client"
              >
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
            <span className="sr-only" role="status" aria-live="polite">
              {copied
                ? "Email copied to clipboard"
                : copyError
                  ? "Could not copy email to clipboard."
                  : ""}
            </span>
            <a
              href="https://www.google.com/maps/search/Madurai,+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass px-8 py-4 rounded-full font-body font-medium text-lg flex items-center gap-3 hover:scale-105 transition-transform min-h-[48px]"
              aria-label="View location: Madurai, Tamil Nadu on Google Maps"
            >
              <MapPin className="w-5 h-5" aria-hidden="true" /> Madurai, Tamil Nadu
            </a>
          </div>
        </div>

        {/* Redesigned Balanced Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center pt-8 border-t border-white/10 gap-6 w-full text-center lg:text-left">
          {/* Left Column: Logo & Name */}
          <div className="flex items-center justify-center lg:justify-start gap-3">
            <div
              className="w-8 h-8 liquid-glass rounded-full flex items-center justify-center border border-white/20"
              aria-hidden="true"
            >
              <span className="font-heading text-sm font-bold">S</span>
            </div>
            <span className="font-heading font-bold text-lg tracking-tight text-white">
              Sahaya Savari F
            </span>
          </div>

          {/* Middle Column: Social Links Dock (Centered) */}
          <div className="flex justify-center items-center min-w-0 w-full">
            <Dock
              panelHeight={68}
              baseItemSize={50}
              magnification={70}
              items={[
                {
                  icon: <Linkedin size={20} aria-hidden="true" />,
                  label: "LinkedIn",
                  onClick: () => window.open("https://www.linkedin.com/in/sahaya-savari", "_blank"),
                  ariaLabel: "Visit LinkedIn profile",
                },
                {
                  icon: <Github size={20} aria-hidden="true" />,
                  label: "GitHub",
                  onClick: () => window.open("https://github.com/sahaya-savari", "_blank"),
                  ariaLabel: "Visit GitHub profile",
                },
                {
                  icon: <Search size={20} aria-hidden="true" />,
                  label: "Search",
                  onClick: () => setShowCommandPalette(true),
                  ariaLabel: "Open spotlight search command palette",
                },
                {
                  icon: <ExternalLink size={20} aria-hidden="true" />,
                  label: "Resume",
                  onClick: () => window.open(RESUME_URL, "_blank"),
                  ariaLabel: "Open resume PDF in new tab",
                },
                {
                  icon: <Mail size={20} aria-hidden="true" />,
                  label: "Email",
                  onClick: () => window.open("mailto:contact@sahayasavari.dev"),
                  ariaLabel: "Send email to Sahaya Savari",
                },
              ]}
            />
          </div>

          {/* Right Column: Copyright */}
          <div className="flex items-center justify-center lg:justify-end text-white/20 font-body text-[10px] uppercase tracking-widest">
            © {new Date().getFullYear()} Sahaya Savari F — Designed & Built by Sahaya Savari F
          </div>
        </div>
      </div>
    </footer>
  );
});

export default ContactSection;
