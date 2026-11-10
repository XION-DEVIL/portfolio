import { memo, useState, useCallback, useEffect } from "react";
import { Award, ArrowUpRight, Database, Code, Brain, Terminal, Eye, X } from "lucide-react";
import { CERTIFICATIONS, FEATURED_CREDENTIALS, FeaturedCredential } from "../data";
import SectionBadge from "../components/ui/SectionBadge";
import { lockScroll, unlockScroll } from "../utils/scrollLock";

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
  const [previewCert, setPreviewCert] = useState<FeaturedCredential | null>(null);

  const openPreview = useCallback((cred: FeaturedCredential) => {
    setPreviewCert(cred);
    lockScroll();
  }, []);

  const closePreview = useCallback(() => {
    setPreviewCert(null);
    unlockScroll();
  }, []);

  useEffect(() => {
    if (!previewCert) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closePreview();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previewCert, closePreview]);
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
                  <div className="flex items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-3 min-w-0">
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
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-mono font-bold tracking-widest text-white/40 uppercase">
                          Credential {cred.rank || `0${idx + 1}`}
                        </span>
                        <span className="text-xs font-mono font-medium text-white/80 truncate">
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
                    <span className="text-[8px] font-mono uppercase tracking-widest text-green-400 border border-green-500/30 bg-green-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                      <span className="w-1 h-1 rounded-full bg-green-400"></span>
                      Verified
                    </span>
                  </div>

                  {/* Issuer subtitle */}
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-wider mb-3">
                    {cred.issuer}
                  </div>

                  {/* Card Title */}
                  <h4 className="font-heading font-bold text-xl text-white mb-3 leading-snug tracking-tight">
                    {cred.title}
                  </h4>

                  {cred.image && (
                    <div
                      onClick={() => openPreview(cred)}
                      className="mb-4 rounded-xl overflow-hidden border border-white/10 aspect-video bg-neutral-900/90 relative group/img cursor-pointer flex items-center justify-center p-2.5 transition-colors hover:border-white/25"
                    >
                      {/* Ambient blurred backdrop so container is seamlessly filled */}
                      <div
                        className="absolute inset-0 bg-cover bg-center filter blur-md opacity-25 scale-125 pointer-events-none"
                        style={{ backgroundImage: `url(${cred.image})` }}
                      />

                      {/* The certificate: fully contained and centered horizontally & vertically */}
                      <img
                        src={cred.image}
                        alt={`${cred.title} certificate`}
                        className="max-h-full max-w-full object-contain object-center relative z-10 transition-transform duration-300 group-hover/img:scale-105 shadow-md rounded"
                        loading="lazy"
                      />

                      {/* Quick View Hover Indicator */}
                      <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                        <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-black text-xs font-body font-semibold shadow-lg">
                          <Eye className="w-3.5 h-3.5" />
                          <span>View Certificate</span>
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Card Description - fully visible, no line-clamp truncation */}
                  {cred.desc && (
                    <p className="text-white/70 font-body font-light text-xs leading-relaxed mb-4 flex-1">
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

                {/* Bottom CTA Buttons */}
                <div className="mt-auto pt-4 flex flex-col gap-2 relative z-20">
                  {cred.image && (
                    <button
                      type="button"
                      onClick={() => openPreview(cred)}
                      className="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white text-black text-xs font-body font-semibold transition-all duration-300 hover:scale-[1.02] min-h-[38px] cursor-pointer"
                      aria-label={`View certificate preview for ${cred.title}`}
                    >
                      <Eye className="w-3.5 h-3.5 text-black/70" />
                      <span>View Certificate</span>
                    </button>
                  )}
                  <a
                    href={
                      cred.verifyUrl ||
                      cred.linkedinUrl ||
                      "https://www.linkedin.com/in/sahaya-savari"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-body transition-all duration-300 min-h-[38px] ${
                      cred.image
                        ? "bg-white/5 hover:bg-white/10 text-white font-medium border border-white/10"
                        : "bg-white text-black font-semibold hover:scale-[1.02]"
                    }`}
                    aria-label={`Verify ${cred.title} credential from ${cred.issuer}`}
                  >
                    <span>
                      {cred.issuer.includes("HodoLabs") ? "View on LinkedIn" : "Verify Credential"}
                    </span>
                    <ArrowUpRight className={`w-3.5 h-3.5 ${cred.image ? "text-white/60" : "text-black/60"}`} />
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

          <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
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

      {/* CERTIFICATE PREVIEW MODAL */}
      {previewCert && (
        <div 
          role="dialog"
          aria-modal="true"
          aria-label={`${previewCert.title} Certificate`}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={closePreview}
        >
          <div 
            className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-neutral-950/95 border border-white/15 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* HEADER */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/15">
                  {previewCert.rank || "CERT"}
                </span>
                <div>
                  <h3 className="font-heading font-bold text-lg text-white leading-tight">
                    {previewCert.title}
                  </h3>
                  <p className="text-xs font-mono text-white/60">
                    {previewCert.issuer} {previewCert.issueDate ? `· ${previewCert.issueDate}` : ''}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closePreview}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                aria-label="Close certificate preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* CERTIFICATE IMAGE VIEWPORT */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-black/60">
              {previewCert.image && (
                <img
                  src={previewCert.image}
                  alt={`${previewCert.title} certificate awarded by ${previewCert.issuer}`}
                  className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl shadow-2xl border border-white/10"
                />
              )}
            </div>

            {/* FOOTER */}
            <div className="px-6 py-3.5 border-t border-white/10 bg-white/[0.02] flex items-center justify-between flex-wrap gap-3">
              <div className="flex items-center gap-3 text-xs font-mono text-white/60">
                {previewCert.credentialId && (
                  <span>ID: <strong className="text-white/90">{previewCert.credentialId}</strong></span>
                )}
                {previewCert.score && (
                  <span>Score: <strong className="text-white/90">{previewCert.score}</strong></span>
                )}
              </div>
              <div className="flex items-center gap-2">
                {previewCert.verifyUrl && (
                  <a
                    href={previewCert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-black text-xs font-body font-semibold hover:bg-neutral-200 transition-colors"
                  >
                    <span>Verify at Issuer</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-black/70" />
                  </a>
                )}
                <button
                  type="button"
                  onClick={closePreview}
                  className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-body font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default CertificationsSection;
