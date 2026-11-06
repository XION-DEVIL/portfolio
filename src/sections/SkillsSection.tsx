import { useState, useEffect, memo, lazy, Suspense } from "react";
import { Database, Brain, Code, Terminal } from "lucide-react";
import SkillAccordion from "../components/ui/SkillAccordion";
import SectionBadge from "../components/ui/SectionBadge";
import SkillsMatrix from "../components/SkillsMatrix";
import { Marquee } from "../components/magicui/marquee";

const Galaxy = lazy(() => import("../components/ui/Galaxy/Galaxy"));

const SkillsSection = memo(() => {
  const [activePillar, setActivePillar] = useState<"Data" | "AI">("Data");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section aria-label="Skills and capabilities" className="py-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {isMounted && (
          <Suspense fallback={null}>
            <Galaxy
              transparent={true}
              density={0.7}
              glowIntensity={0.15}
              saturation={0.22}
              rotationSpeed={0.015}
              twinkleIntensity={0.12}
              mouseInteraction={true}
              mouseRepulsion={true}
            />
          </Suspense>
        )}
      </div>
      <div className="max-w-screen-xl mx-auto relative z-10">
        <div className="mb-12">
          <SectionBadge>Capabilities &amp; Learning Journey</SectionBadge>
          <h2 className="text-fluid-section-heading font-heading font-bold text-white tracking-tight leading-[0.9] mb-4">
            Core Proficiencies <br /> &amp; Active Learning.
          </h2>
          <p className="text-white/60 font-body font-light text-lg max-w-2xl">
            A transparent overview of technologies I am actively studying in my M.Sc. Artificial
            Intelligence program, learning through coursework, and applying across hands-on
            engineering projects.
          </p>
        </div>

        {/* SEO-Friendly Core Technologies Grid */}
        <Marquee>
          {[
            "Python",
            "React",
            "TypeScript",
            "FastAPI",
            "Firebase",
            "SQL",
            "Machine Learning",
            "Docker",
          ].map((name) => (
            <span
              key={name}
              className="flex items-center gap-3 whitespace-nowrap font-body text-sm text-foreground/70"
            >
              <Code className="w-4 h-4" />
              {name}
            </span>
          ))}
        </Marquee>
        <div className="mb-16 py-6 md:py-8">
          <div className="mb-6">
            <h3 className="font-heading font-bold text-2xl text-white mb-2">
              Technologies &amp; Core Tools
            </h3>
            <p className="text-white/60 font-body font-light text-sm max-w-2xl">
              Programming languages, frameworks, backend frameworks, and databases I am actively
              learning, practicing, and utilizing across my software development and hackathon
              projects.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                domain: "AI & Machine Learning",
                color: "text-purple-400",
                borderColor: "border-purple-500/20",
                items: ["Python", "Machine Learning", "Artificial Intelligence", "REST APIs"],
              },
              {
                domain: "Languages",
                color: "text-cyan-400",
                borderColor: "border-cyan-500/20",
                items: ["TypeScript", "JavaScript", "Java", "SQL"],
              },
              {
                domain: "Frontend & UI",
                color: "text-emerald-400",
                borderColor: "border-emerald-500/20",
                items: ["React", "Vite", "Tailwind CSS", "Framer Motion"],
              },
              {
                domain: "Backend & Cloud",
                color: "text-amber-400",
                borderColor: "border-amber-500/20",
                items: ["FastAPI", "Firebase", "Docker", "Git & GitHub"],
              },
            ].map((group) => (
              <div
                key={group.domain}
                className="liquid-glass p-5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors"
              >
                <h4
                  className={`text-xs font-mono font-bold uppercase tracking-widest mb-4 ${group.color}`}
                >
                  {group.domain}
                </h4>
                <div className="space-y-2">
                  {group.items.map((tech) => (
                    <div
                      key={tech}
                      className={`px-3 py-2 rounded-xl bg-white/[0.03] border ${group.borderColor} text-center`}
                    >
                      <span className="text-white font-body font-medium text-xs">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <SectionBadge>Verified Evidence</SectionBadge>
              <p className="text-white/70 font-body font-light max-w-xl text-sm">
                Every skill listed is grounded in an academic lab, certification, or hands-on
                project.
              </p>
            </div>
          </div>
          <SkillsMatrix />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
          <div className="space-y-2">
            <SkillAccordion title="Artificial Intelligence" icon={Brain}>
              <ul className="space-y-4">
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>
                    • Machine Learning model development, training, and evaluation for practical AI
                    workflows.
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Hands-on Project
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>
                    • LLM integration, prompt engineering, and structured response validation.
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Actively Exploring
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• RAG Pipelines and context injection.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Actively Learning
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• Natural Language Processing and text analysis.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Academic Study
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span>• Computer Vision and image classification.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-amber-400 border border-amber-500/30 bg-amber-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Currently Learning
                  </span>
                </li>
              </ul>
            </SkillAccordion>
            <SkillAccordion title="Python Development" icon={Code}>
              <ul className="space-y-4">
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>
                    • Python Developer workflows for backend development with Flask and FastAPI.
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Core Foundation
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• Data processing with Pandas and NumPy.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Applied in Projects
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span>• API development and third-party integrations.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Hands-on Project
                  </span>
                </li>
              </ul>
            </SkillAccordion>
            <SkillAccordion title="Web Development" icon={Terminal}>
              <ul className="space-y-4">
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>
                    • React and TypeScript for accessible, responsive frontend development.
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-blue-400 border border-blue-500/30 bg-blue-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Hands-on Project
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• Responsive UI design with Tailwind CSS.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Proficient in Projects
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span>
                    • Full Stack Developer architecture across client state, APIs, Firebase, and
                    deployment.
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Actively Learning
                  </span>
                </li>
              </ul>
            </SkillAccordion>
            <SkillAccordion title="Data &amp; Databases" icon={Database}>
              <ul className="space-y-4">
                <li className="flex items-start justify-between gap-4 border-b border-white/5 pb-3">
                  <span>• SQL for data querying and management.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Certified &amp; Coursework
                  </span>
                </li>
                <li className="flex items-start justify-between gap-4">
                  <span>• Data visualization with Matplotlib and Seaborn.</span>
                  <span className="text-[9px] font-mono uppercase tracking-widest text-purple-400 border border-purple-500/30 bg-purple-500/10 px-1.5 py-0.5 rounded-full shrink-0">
                    Coursework &amp; Practice
                  </span>
                </li>
              </ul>
            </SkillAccordion>
          </div>
          <div>
            <div
              className="liquid-glass-strong rounded-3xl p-1 w-full flex mb-6 md:mb-12"
              role="tablist"
              aria-label="Technical pillar selection"
            >
              <button
                onClick={() => setActivePillar("Data")}
                role="tab"
                aria-selected={activePillar === "Data"}
                aria-controls="pillar-panel"
                id="tab-data"
                className={`flex-1 py-4 rounded-[22px] transition-all font-body font-medium text-sm min-h-[48px] ${activePillar === "Data" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
              >
                Data Pillar
              </button>
              <button
                onClick={() => setActivePillar("AI")}
                role="tab"
                aria-selected={activePillar === "AI"}
                aria-controls="pillar-panel"
                id="tab-ai"
                className={`flex-1 py-4 rounded-[22px] transition-all font-body font-medium text-sm min-h-[48px] ${activePillar === "AI" ? "bg-white text-black" : "text-white/60 hover:text-white"}`}
              >
                AI Pillar
              </button>
            </div>
            <div
              id="pillar-panel"
              role="tabpanel"
              aria-labelledby={activePillar === "Data" ? "tab-data" : "tab-ai"}
              className="liquid-glass rounded-3xl p-6 md:p-10 flex flex-col justify-center text-center relative overflow-hidden"
            >
              {activePillar === "Data" ? (
                <div
                  key="data"
                  className="flex flex-col justify-center items-center w-full animate-fade-in"
                >
                  <h3 className="font-heading font-bold text-5xl md:text-6xl text-white mb-6 md:mb-8">
                    Code meets logic.
                  </h3>
                  <p className="text-white/70 font-body font-light text-base md:text-lg leading-relaxed max-w-md mx-auto">
                    Building robust portfolio and production-style applications with Python, React,
                    TypeScript, Firebase, and modern web technologies that deliver clean, reliable
                    experiences.
                  </p>
                  <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3">
                    {["Python", "React", "TypeScript", "FastAPI", "SQL"].map((t) => (
                      <span
                        key={t}
                        className="liquid-glass px-4 py-1.5 rounded-full text-xs font-body text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  key="ai"
                  className="flex flex-col justify-center items-center w-full animate-fade-in"
                >
                  <h3 className="font-heading font-bold text-5xl md:text-6xl text-white mb-6 md:mb-8">
                    Intelligence by design.
                  </h3>
                  <p className="text-white/70 font-body font-light text-base md:text-lg leading-relaxed max-w-md mx-auto">
                    Developing Artificial Intelligence and Machine Learning solutions that learn,
                    adapt, and solve real-world problems with precision and purpose.
                  </p>
                  <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-3">
                    {["TensorFlow", "PyTorch", "NLP", "LLMs", "Computer Vision"].map((t) => (
                      <span
                        key={t}
                        className="liquid-glass px-4 py-1.5 rounded-full text-xs font-body text-white/80"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default SkillsSection;
