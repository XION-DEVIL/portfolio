import { memo } from "react";

import SectionBadge from "../components/ui/SectionBadge";
import Button from "../components/ui/PortfolioButton";

interface AboutSectionProps {
  setShowResume: (show: boolean) => void;
}

const AboutSection = memo(({ setShowResume }: AboutSectionProps) => {
  return (
    <section aria-label="About me" className="relative py-16 px-6 overflow-hidden">
      <div className="relative z-10 max-w-screen-xl mx-auto grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-start">
        <div>
          <SectionBadge>About Me</SectionBadge>
          <h2 className="text-fluid-section-heading font-heading font-bold text-white tracking-tight leading-[0.9] mb-12">
            Engineering with <br /> purpose &amp; discipline.
          </h2>
          <div className="space-y-8 text-white/60 font-body font-light text-lg leading-relaxed max-w-xl">
            <p>
              I am <strong>Sahaya Savari F</strong>, an M.Sc. Artificial Intelligence student at St.
              Joseph's College (Autonomous), Tiruchirappalli, with a foundation in B.Sc. Data
              science from Thiagarajar College, Madurai, and currently a Digital Marketing Intern at
              HodoLabs.
            </p>
            <p>
              My technical work centers on{" "}
              <strong>Artificial Intelligence, Machine Learning, and Cybersecurity</strong>,
              developed through hands-on software engineering projects, competitive hackathons, and
              practical industry experience. I value clean code, strong system fundamentals,
              teamwork, leadership, transparent communication, and disciplined coordination.
            </p>
            <p>
              Whether organizing campus technical symposiums as Event In-Charge, coordinating
              multi-stage hackathon deliverables, or building applications with Python, React,
              TypeScript, and SQL databases, I bring curiosity, rigor, and verified execution to
              every team.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2 liquid-glass rounded-3xl p-8 overflow-hidden relative border border-white/10 cursor-target">
            <h3 className="font-heading font-bold text-3xl text-white mb-6">
              Recruiter Quick Scan
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-white/60 mb-2">
                  What I Do
                </h4>
                <p className="text-sm font-body text-white/80 font-light">
                  Build web applications, backend services, and applied AI systems that connect
                  practical software engineering to verified user needs.
                </p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-white/60 mb-2">
                  Top Skills
                </h4>
                <p className="text-sm font-body text-white/80 font-light">
                  PostgreSQL, Node.js, React.js, Python, Machine Learning, and Data Analytics.
                </p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-white/60 mb-2">
                  What I'm Learning
                </h4>
                <p className="text-sm font-body text-white/80 font-light">
                  System Design, Advanced ML Modeling, and Practical Cybersecurity.
                </p>
              </div>
              <div>
                <h4 className="text-[10px] uppercase tracking-widest text-white/60 mb-2">
                  What I'm Looking For
                </h4>
                <p className="text-sm font-body text-white/80 font-light">
                  Summer 2027 internships in Software Engineering, Backend Development, and Applied
                  AI.
                </p>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 liquid-glass-strong rounded-3xl p-8 backdrop-blur-2xl cursor-target">
            <h3 className="font-heading font-bold text-3xl text-white mb-6">Why Work With Me</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <ul className="space-y-4 text-sm text-white/70 font-body font-light">
                <li>
                  <strong className="text-white font-medium">Problem Solving:</strong> I deeply
                  understand requirements before writing code, prioritizing scalable architecture
                  over quick hacks.
                </li>
                <li>
                  <strong className="text-white font-medium">AI & Full-Stack Synergy:</strong> I
                  don't just train models; I integrate them into accessible, production-ready web
                  applications.
                </li>
              </ul>
              <ul className="space-y-4 text-sm text-white/70 font-body font-light">
                <li>
                  <strong className="text-white font-medium">Continuous Learning:</strong> I rapidly
                  adapt to new tech stacks, evidenced by my self-directed transition into AI and
                  Data Analytics.
                </li>
                <li>
                  <strong className="text-white font-medium">Verifiable Output:</strong> Every skill
                  I claim is backed by a deployed project, a certified credential, or an academic
                  result.
                </li>
              </ul>
            </div>
          </div>
          <div className="md:col-span-2 liquid-glass rounded-3xl p-8 mt-8 overflow-hidden relative border border-white/10 cursor-target">
            <div className="relative z-10 grid md:grid-cols-2 gap-8 items-start">
              {/* Left Panel: Currently Seeking Banner */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"
                    aria-hidden="true"
                  ></span>
                  <h4 className="font-mono text-xs tracking-widest text-green-400 uppercase font-bold">
                    Currently Seeking
                  </h4>
                </div>
                <h5 className="font-heading font-bold text-3xl text-white leading-tight">
                  Software Engineering, Backend &amp; Applied AI Internships
                </h5>
                <p className="text-white/60 font-body font-light text-sm leading-relaxed">
                  Looking for Summer 2027 internship roles focused on software engineering, backend
                  systems, applied AI, and modern web applications.
                </p>

                <div className="grid grid-cols-2 gap-4 text-xs font-mono text-white/50 border-t border-white/10 pt-4">
                  <div>
                    <span className="text-white/60 block text-[9px] uppercase tracking-wider mb-1">
                      Availability
                    </span>
                    <span className="text-white">Summer 2027</span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[9px] uppercase tracking-wider mb-1">
                      Location Flexibility
                    </span>
                    <span className="text-white">Madurai, Remote, Relocation Open</span>
                  </div>
                </div>
              </div>

              {/* Right Panel: Recruiter Snapshot Card */}
              <div className="space-y-4 border-t border-white/10 pt-6 mt-6 md:border-t-0 md:pt-0 md:mt-0 md:border-l md:border-white/10 md:pl-8">
                <h4 className="font-mono text-xs tracking-widest text-blue-400 uppercase font-bold">
                  Professional Snapshot
                </h4>

                <div className="space-y-4">
                  <div>
                    <span className="text-white/60 block font-mono text-[9px] uppercase tracking-wider mb-1">
                      Key Strengths
                    </span>
                    <span className="text-white/80 font-body text-sm block font-medium">
                      PostgreSQL, Node.js, React.js · Python &amp; ML · Team Leadership &amp;
                      Coordination
                    </span>
                  </div>
                  <div>
                    <span className="text-white/60 block font-mono text-[9px] uppercase tracking-wider mb-1">
                      Value Contribution
                    </span>
                    <span className="text-white/80 font-body text-sm block font-light leading-relaxed">
                      Delivering shipped, reliable software (Daily Spark offline habit tracker,
                      VibeCraft campus suite, PrepMind AI) and driving problem research and team
                      coordination in high-stakes competitions.
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    variant="primary"
                    icon
                    onClick={() => setShowResume(true)}
                    aria-label="Open Resume PDF viewer"
                  >
                    View Resume
                  </Button>
                  <a
                    href="#contact"
                    className="liquid-glass px-5 py-2.5 rounded-full font-body font-semibold text-xs inline-flex items-center gap-1.5 hover:scale-105 transition-transform border border-white/10 min-h-[38px] text-white"
                    aria-label="Scroll to contact information"
                  >
                    Contact Me
                  </a>
                </div>
              </div>
            </div>
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
});

export default AboutSection;
