import { memo } from "react";
import { Award, ArrowUpRight, Database, Code, Brain, Terminal } from "lucide-react";
import { CERTIFICATIONS, FEATURED_CREDENTIALS } from "../data";
import SectionBadge from "../components/ui/SectionBadge";

// Resolve string icon identifiers from data.ts to actual components
const ICON_MAP: Record<
  string,
  React.ComponentType<{ className?: string; "aria-hidden"?: boolean }>
> = {
  database: Database,
  code: Code,
  brain: Brain,
};

const CertificationsSection = memo(() => {
  return (
    <section aria-label="Certifications and courses" className="py-16 px-6 relative">
      <div className="max-w-screen-xl mx-auto">
        <div className="mb-12 text-center">
          <SectionBadge>Learning Journey</SectionBadge>
          <h2 className="text-fluid-section-heading font-heading font-bold text-white tracking-tight leading-[0.9]">
            Certificates &amp; Courses
          </h2>
          <p className="text-white/50 font-body font-light mt-6 max-w-xl mx-auto">
            Focused on building practical, project-ready skills in Artificial Intelligence, Machine
            Learning, Python development, data analytics, and software development.
          </p>
        </div>

        {/* FEATURED CREDENTIALS SUBSECTION */}
        <div className="mb-12 md:mb-20 lg:mb-24">
          <div className="flex items-center gap-3 justify-center mb-10">
            <Award className="w-6 h-6 text-white/50 animate-pulse" aria-hidden="true" />
            <h3 className="font-heading font-bold text-3xl text-white tracking-tight">
              Featured Credentials
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left max-w-7xl mx-auto items-stretch">
            {FEATURED_CREDENTIALS.map((cred, idx) => (
              <div
                key={cred.title}
                className="certificate-card liquid-glass p-6 rounded-[2rem] flex flex-col justify-between border border-white/10 hover:-translate-y-1 transition-transform group relative cursor-target h-full"
                style={{
                  background: "rgba(255, 255, 255, 0.02)",
                  boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <div className="flex flex-col flex-1">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-5 gap-3 min-h-[46px]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-white/90 group-hover:border-white/20 group-hover:bg-white/[0.08] transition-all shadow-sm shrink-0">
                        {idx === 0 ? (
                          <Award className="w-5 h-5 text-amber-400" aria-hidden="true" />
                        ) : idx === 1 ? (
                          <Brain className="w-5 h-5 text-indigo-400" aria-hidden="true" />
                        ) : idx === 2 ? (
                          <Code className="w-5 h-5 text-purple-400" aria-hidden="true" />
                        ) : (
                          <Terminal className="w-5 h-5 text-emerald-400" aria-hidden="true" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
                          Credential {cred.rank || `0${idx + 1}`}
                        </span>
                        <span className="text-[11px] font-mono text-white/70">
                          {cred.issuer.includes("IBM")
                            ? "IBM Specialization"
                            : cred.issuer.includes("NIELIT")
                              ? "NIELIT Certified"
                              : cred.issuer.includes("IIT") || cred.issuer.includes("NPTEL")
                                ? "IIT Madras"
                                : "HodoLabs Certified"}
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0 text-right">
                      <span className="text-[8px] font-mono uppercase tracking-widest text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-green-400"></span>
                        Verified
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                        {cred.issuer}
                      </span>
                    </div>
                  </div>

                  {/* Card Title - aligned height */}
                  <h4 className="font-heading font-bold text-xl text-white mb-3 leading-snug tracking-tight min-h-[3.25rem] flex items-center">
                    {cred.title}
                  </h4>

                  {cred.image && (
                    <div className="mb-4 rounded-xl overflow-hidden border border-white/10 aspect-video bg-black/40">
                      <img
                        src={cred.image}
                        alt={`${cred.title} certificate`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                  )}

                  {/* Card Description - aligned height */}
                  {cred.desc && (
                    <p className="text-white/60 font-body font-light text-xs leading-relaxed mb-4 min-h-[4rem] line-clamp-3">
                      {cred.desc}
                    </p>
                  )}

                  {/* Skills badges - standardized count & aligned height */}
                  {cred.skills && cred.skills.length > 0 && (
                    <div className="flex flex-wrap content-start gap-1.5 mb-4 min-h-[3.25rem]">
                      {cred.skills.slice(0, 5).map((skill) => (
                        <span
                          key={skill}
                          className="px-2 py-0.5 rounded-full text-[9px] font-mono text-white/50 bg-white/5 border border-white/5"
                        >
                          {skill}
                        </span>
                      ))}
                      {cred.skills.length > 5 && (
                        <span className="px-2 py-0.5 rounded-full text-[9px] font-mono text-white/40 bg-white/[0.03] border border-white/5">
                          +{cred.skills.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {/* Metadata grid - standardized height */}
                  <div className="grid grid-cols-2 gap-x-3 gap-y-2 text-[10px] font-mono text-white/50 mb-4 border-t border-white/5 pt-3 min-h-[52px]">
                    <div>
                      <span className="text-white/60 block text-[8px] uppercase tracking-wider">
                        Issued
                      </span>
                      {cred.issueDate || "June 2026"}
                    </div>
                    <div className="truncate" title={cred.credentialId}>
                      <span className="text-white/60 block text-[8px] uppercase tracking-wider">
                        {cred.issuer.includes("NIELIT") ? "Certificate No." : "ID"}
                      </span>
                      {cred.credentialId || "Verified"}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA Button - locked to bottom */}
                <div className="mt-auto pt-4 flex flex-col gap-2 relative z-20">
                  <a
                    href={
                      cred.verifyUrl ||
                      cred.linkedinUrl ||
                      "https://www.linkedin.com/in/sahaya-savari"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-black text-xs font-body font-semibold transition-all duration-300 hover:scale-[1.02] min-h-[38px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    aria-label={`Verify ${cred.title} credential from ${cred.issuer}`}
                  >
                    <span>Verify Credential</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-black/60 group-hover:text-black" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LEARNING JOURNEY TIMELINE */}
        <div className="mb-16 lg:mb-24">
          <div className="flex items-center gap-3 justify-center mb-10">
            <h3 className="font-heading font-bold text-3xl text-white/60 tracking-tight">
              The Learning Journey
            </h3>
          </div>
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute top-0 bottom-0 left-[28px] md:left-1/2 w-[2px] bg-gradient-to-b from-white/0 via-white/10 to-white/0 -translate-x-1/2"></div>

            {[
              {
                year: "2023",
                title: "Foundations & Python",
                desc: "Started with CS50P and automation scripts, building strong core programming logic.",
              },
              {
                year: "2023",
                title: "Web Development",
                desc: "Learned full-stack architecture, React, and Firebase to bring ideas to the browser.",
              },
              {
                year: "2024",
                title: "Data Analytics",
                desc: "Completed IBM Data Analyst Specialization, mastering SQL, Pandas, and visualization.",
              },
              {
                year: "2024",
                title: "Machine Learning",
                desc: "Dived into Kaggle, TensorFlow, and Scikit-learn to build predictive models.",
              },
              {
                year: "2025",
                title: "Artificial Intelligence",
                desc: "Pursuing M.Sc AI while focusing on LLMs, Prompt Engineering, Machine Learning evaluation, and intelligent pipelines.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`relative flex items-center mb-8 last:mb-0 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="hidden md:block w-1/2"></div>
                <div className="absolute left-[28px] md:left-1/2 w-4 h-4 rounded-full bg-black border-2 border-white/20 -translate-x-1/2 flex items-center justify-center z-10 transition-colors hover:border-white/50">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/50"></div>
                </div>
                <div className="ml-12 md:ml-0 md:w-1/2 p-6 liquid-glass rounded-2xl md:mx-8 border border-white/5 hover:bg-white/5 transition-colors">
                  <span className="text-[10px] font-mono text-white/60 uppercase tracking-widest">
                    {item.year}
                  </span>
                  <h4 className="text-xl font-heading font-bold text-white mt-2 mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm font-body text-white/60 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SPECIALIZED DOMAINS GRID */}
        <div>
          <div className="flex items-center gap-3 justify-center mb-10">
            <h3 className="font-heading font-bold text-3xl text-white tracking-tight">
              Specialized Domains &amp; Coursework
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {CERTIFICATIONS.map(({ title, icon, subtitle, desc, items }) => {
              const IconComponent = ICON_MAP[icon] || Award;
              return (
                <div
                  key={title}
                  className="liquid-glass p-6 md:p-8 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between group"
                  style={{
                    background: "rgba(255, 255, 255, 0.02)",
                    boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.08)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:bg-white/10 transition-colors">
                        <IconComponent className="w-5 h-5" aria-hidden={true} />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xl text-white tracking-tight">
                          {title}
                        </h4>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/50">
                          {subtitle}
                        </span>
                      </div>
                    </div>

                    <p className="text-white/60 font-body font-light text-xs leading-relaxed mb-6">
                      {desc}
                    </p>

                    <div className="space-y-2.5">
                      {items.map((c) => (
                        <div
                          key={c.name}
                          className="bg-white/[0.03] border border-white/5 hover:border-white/15 p-3 rounded-xl flex items-center justify-between gap-3 transition-colors"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <Award className="w-4 h-4 text-white/40 shrink-0" aria-hidden="true" />
                            <span className="text-xs font-body font-normal text-white/85 truncate">
                              {c.name}
                            </span>
                          </div>
                          {c.tag && (
                            <span className="shrink-0 px-2 py-0.5 rounded-full text-[9px] font-mono text-white/40 bg-white/5 border border-white/5">
                              {c.tag}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                    <span>{items.length} Modules Completed</span>
                    <span className="text-emerald-400/80 flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-emerald-400"></span> Verified
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

export default CertificationsSection;
