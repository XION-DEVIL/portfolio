import { memo, useState } from "react";
import {
  Briefcase,
  Trophy,
  Award,
  Calendar,
  MapPin,
  CheckCircle2,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { Link } from "@/lib/router-compat";
import SectionBadge from "../components/ui/SectionBadge";
import { EXPERIENCES, HONORS_AND_AWARDS } from "../data";

const ExperienceSection = memo(() => {
  const [activeTab, setActiveTab] = useState<"experience" | "awards">("experience");

  return (
    <section
      aria-label="Work Experience & Achievements"
      className="py-16 md:py-24 px-6 relative overflow-hidden"
    >
      <div className="max-w-screen-xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <SectionBadge>Proven Track Record</SectionBadge>
            <h2 className="text-fluid-section-heading font-heading font-bold text-white tracking-tight leading-[0.9] mb-4">
              Work Experience &amp; <br />
              Hackathon Honors.
            </h2>
            <p className="text-white/70 font-body font-light text-base md:text-lg leading-relaxed">
              Demonstrated hands-on experience in technical SEO, PageSpeed audits, and full stack
              engineering at HodoLabs Technologies, combined with championship wins in competitive
              AI hackathons.
            </p>
          </div>

          {/* Tab Controls */}
          <div className="flex items-center gap-2 p-1.5 liquid-glass rounded-full border border-white/10 self-start lg:self-end">
            <button
              type="button"
              onClick={() => setActiveTab("experience")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
                activeTab === "experience"
                  ? "bg-white text-black shadow-lg font-semibold"
                  : "text-white/70 hover:text-white"
              }`}
              aria-pressed={activeTab === "experience"}
            >
              <Briefcase size={14} />
              <span>Work Experience</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 ml-0.5">
                {EXPERIENCES.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("awards")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-body font-medium transition-all cursor-pointer ${
                activeTab === "awards"
                  ? "bg-white text-black shadow-lg font-semibold"
                  : "text-white/70 hover:text-white"
              }`}
              aria-pressed={activeTab === "awards"}
            >
              <Trophy size={14} />
              <span>Hackathons &amp; Honors</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/10 dark:bg-white/10 ml-0.5">
                {HONORS_AND_AWARDS.length}
              </span>
            </button>
          </div>
        </div>

        {/* Tab 1: Work Experience */}
        {activeTab === "experience" && (
          <div className="space-y-6">
            {EXPERIENCES.map((exp, idx) => (
              <div
                key={`${exp.company}-${exp.role}`}
                className="liquid-glass p-6 md:p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-xs font-mono font-medium px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {exp.type}
                      </span>
                      <span className="text-xs text-white/40">•</span>
                      <span className="text-xs font-body text-white/60 flex items-center gap-1">
                        <MapPin size={12} className="text-white/40" />
                        {exp.location}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-heading font-bold text-white mb-1">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-3">
                      <p className="text-sm font-body font-medium text-white/80">{exp.company}</p>
                      <a
                        href="https://www.linkedin.com/in/sahaya-savari"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                        aria-label={`View ${exp.company} experience on LinkedIn`}
                      >
                        <span>LinkedIn</span>
                        <ExternalLink size={11} />
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-white/60 shrink-0 bg-white/[0.03] px-3.5 py-1.5 rounded-full border border-white/10">
                    <Calendar size={13} className="text-white/50" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3 mb-6">
                  {exp.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 text-sm font-body font-light text-white/70 leading-relaxed"
                    >
                      <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[11px] font-mono px-3 py-1 rounded-full bg-white/[0.03] border border-white/10 text-white/80"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Hackathons & Competitions */}
        {activeTab === "awards" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {HONORS_AND_AWARDS.map((award, idx) => {
              const isGrandChampion = idx === 0;
              const linkedinTarget =
                award.linkedinUrl || "https://www.linkedin.com/in/sahaya-savari";
              return (
                <div
                  key={award.title + award.event}
                  className={`liquid-glass p-6 rounded-3xl border transition-all duration-300 flex flex-col justify-between group ${
                    isGrandChampion
                      ? "border-amber-400/30 bg-gradient-to-b from-amber-500/10 via-white/[0.02] to-transparent shadow-[0_0_30px_rgba(251,191,36,0.1)] md:col-span-2 lg:col-span-3"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                          isGrandChampion
                            ? "bg-amber-400/20 text-amber-300 border-amber-400/30"
                            : "bg-white/[0.05] text-white/80 border-white/10"
                        }`}
                      >
                        {award.badge}
                      </span>
                      <span className="text-xs font-mono text-white/50">{award.date}</span>
                    </div>

                    <h3
                      className={`font-heading font-bold text-white mb-2 ${isGrandChampion ? "text-2xl md:text-3xl" : "text-xl"}`}
                    >
                      {award.title}
                    </h3>
                    <p className="text-xs font-mono text-white/60 uppercase tracking-wider mb-3">
                      {award.event}
                    </p>
                    <p className="text-sm font-body font-light text-white/70 leading-relaxed mb-4">
                      {award.desc}
                    </p>

                    {award.image && (
                      <div className="mb-4 rounded-xl overflow-hidden border border-white/10 aspect-video bg-black/40">
                        <img
                          src={award.image}
                          alt={`${award.title} certificate / proof`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs font-body text-white/60">
                    <div className="flex items-center gap-2">
                      <Award
                        size={14}
                        className={isGrandChampion ? "text-amber-400" : "text-white/40"}
                      />
                      <span>{award.organizer}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      {isGrandChampion && (
                        <Link
                          to="/projects/nelsync-ai"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-medium transition-colors"
                        >
                          <span>Case Study</span>
                          <ChevronRight size={12} />
                        </Link>
                      )}
                      <a
                        href={linkedinTarget}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black font-body text-xs font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
                        aria-label={`Verify ${award.title} on LinkedIn`}
                      >
                        <span>View on LinkedIn</span>
                        <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
});

export default ExperienceSection;
