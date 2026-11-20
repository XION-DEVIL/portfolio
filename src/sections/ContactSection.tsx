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
import { CONTACT_INFO } from "../data";

const RESUME_URL = `${import.meta.env.BASE_URL}resume.pdf?v=${typeof __RESUME_HASH__ !== "undefined" ? __RESUME_HASH__ : Date.now()}`;

interface ContactSectionProps {
  setShowCommandPalette: (v: boolean) => void;
}

const ContactSection = memo(({ setShowCommandPalette }: ContactSectionProps) => {
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);
  const [copyError, setCopyError] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedEmail(text);
      setCopyError(false);
      window.setTimeout(() => setCopiedEmail(null), 2000);
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
          <p className="text-white/60 font-body font-light text-base sm:text-xl max-w-2xl mx-auto mb-10 md:mb-16">
            Seeking Summer 2027 internships, engineering projects, and collaborations in software
            engineering, backend development, and applied AI.
          </p>

          {/* Contact Actions Grid */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {/* Primary Domain Email Pill */}
            <div className="liquid-glass-strong rounded-full font-body flex items-center border border-white/10 hover:border-white/20 transition-all shadow-lg backdrop-blur-xl p-1.5 sm:p-2 gap-1 sm:gap-2 max-w-full">
              <button
                type="button"
                onClick={() => copyToClipboard(CONTACT_INFO.email)}
                className="flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-2 rounded-full hover:bg-white/10 text-white font-medium text-xs sm:text-sm md:text-base transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 touch-manipulation"
                aria-label={
                  copiedEmail === CONTACT_INFO.email
                    ? "Email copied to clipboard"
                    : `Copy ${CONTACT_INFO.email} to clipboard`
                }
                title="Click to copy email address"
              >
                {copiedEmail === CONTACT_INFO.email ? (
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-emerald-400" />
                ) : (
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-emerald-400 group-hover:text-emerald-300" />
                )}
                <span className="text-white group-hover:text-white/90 break-all sm:break-normal">
                  {CONTACT_INFO.email}
                </span>
                {copiedEmail === CONTACT_INFO.email && (
                  <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-full ml-1">
                    Copied
                  </span>
                )}
              </button>

              <div className="w-[1px] h-6 bg-white/15 shrink-0" aria-hidden="true" />

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-white/15 text-white/70 hover:text-white transition-all group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 shrink-0 touch-manipulation"
                aria-label={`Open email client (mailto:${CONTACT_INFO.email})`}
                title="Open mail client"
              >
                <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Location Pill */}
            <a
              href="https://www.google.com/maps/search/Madurai,+Tamil+Nadu"
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-body font-medium text-xs sm:text-sm md:text-base flex items-center gap-2.5 hover:scale-105 transition-transform min-h-[44px] text-white/80 hover:text-white border border-white/10"
              aria-label={`View location: ${CONTACT_INFO.location} on Google Maps`}
            >
              <MapPin className="w-4 h-4 text-rose-400 shrink-0" aria-hidden="true" />
              <span>{CONTACT_INFO.location}</span>
            </a>
          </div>
        </div>

        {/* Polished Balanced Footer Grid */}
        <div className="pt-8 mt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 w-full text-center md:text-left">
          {/* Left Column: Logo, Name & Role */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div
              className="w-8 h-8 liquid-glass rounded-full flex items-center justify-center border border-white/20"
              aria-hidden="true"
            >
              <span className="font-heading text-sm font-bold">S</span>
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="font-heading font-bold text-base sm:text-lg tracking-tight text-white">
                Sahaya Savari F
              </span>
              <span className="text-[11px] font-body text-white/50 tracking-wider">
                Full-Stack & Applied AI Engineer
              </span>
            </div>
          </div>

          {/* Middle Column: Social Links Dock */}
          <div className="flex justify-center items-center min-w-0">
            <Dock
              panelHeight={64}
              baseItemSize={46}
              magnification={66}
              items={[
                {
                  icon: <Linkedin size={18} aria-hidden="true" />,
                  label: "LinkedIn",
                  onClick: () => window.open(CONTACT_INFO.linkedin, "_blank"),
                  ariaLabel: "Visit LinkedIn profile",
                },
                {
                  icon: <Github size={18} aria-hidden="true" />,
                  label: "GitHub",
                  onClick: () => window.open(CONTACT_INFO.github, "_blank"),
                  ariaLabel: "Visit GitHub profile",
                },
                {
                  icon: <Search size={18} aria-hidden="true" />,
                  label: "Search",
                  onClick: () => setShowCommandPalette(true),
                  ariaLabel: "Open spotlight search command palette",
                },
                {
                  icon: <ExternalLink size={18} aria-hidden="true" />,
                  label: "Resume",
                  onClick: () => window.open(RESUME_URL, "_blank"),
                  ariaLabel: "Open resume PDF in new tab",
                },
                {
                  icon: <Mail size={18} aria-hidden="true" />,
                  label: "Email",
                  onClick: () => window.open(`mailto:${CONTACT_INFO.primaryEmail}`),
                  ariaLabel: "Send email to Sahaya Savari",
                },
              ]}
            />
          </div>

          {/* Right Column: Copyright & Portfolio Terms */}
          <div className="flex flex-col items-center md:items-end text-white/40 font-body text-[11px] leading-relaxed tracking-wider">
            <span>© {new Date().getFullYear()} Sahaya Savari F • All Rights Reserved</span>
            <span className="text-white/30 text-[10px]">Portfolio & Engineering Terms apply</span>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default ContactSection;
