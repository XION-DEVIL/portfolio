import { CheckCircle, FolderGit, Award, Briefcase } from "lucide-react";
import { memo } from "react";

interface SkillEvidence {
  skill: string;
  project: string;
  certification: string;
  experience: string;
}

const EVIDENCE_DATA: SkillEvidence[] = [
  {
    skill: "Python",
    project: "NelSync AI (Hackathon Champion)",
    certification: "IBM Data Analyst Specialization",
    experience: "Data science pipelines & ML prototyping",
  },
  {
    skill: "Machine Learning",
    project: "NelSync AI (AIxcelerate 2026)",
    certification: "NPTEL / IIT Madras (ML in Tamil)",
    experience: "M.Sc. Artificial Intelligence studies & labs",
  },
  {
    skill: "React & Next.js",
    project: "VibeCraft 2026, Daily Spark & PrepMind AI",
    certification: "Web Development and Software Engineering",
    experience: "Web development & UI architecture at HodoLabs",
  },
  {
    skill: "TypeScript",
    project: "VibeCraft 2026, Daily Spark & Portfolio",
    certification: "Web Development and Software Engineering",
    experience: "Type-safe frontend development & interfaces",
  },
  {
    skill: "Tailwind CSS",
    project: "VibeCraft 2026, Daily Spark & Portfolio",
    certification: "Web Development and Software Engineering",
    experience: "Responsive styling & mobile-first layouts",
  },
  {
    skill: "SQL & PostgreSQL",
    project: "NelSync AI & Relational Lab Schemas",
    certification: "IBM Data Analyst Specialization",
    experience: "B.Sc. Data Science relational modeling",
  },
  {
    skill: "Data Analytics",
    project: "NelSync AI (Procurement Analytics)",
    certification: "IBM Data Analyst Specialization",
    experience: "B.Sc. Data Science & analytics coursework",
  },
  {
    skill: "Git & GitHub",
    project: "Daily Spark, VibeCraft 2026 & Portfolio",
    certification: "Web Development and Software Engineering",
    experience: "Version control workflows & team collaboration",
  },
  {
    skill: "Vercel & Firebase",
    project: "VibeCraft 2026, PrepMind AI & Daily Spark",
    certification: "Web Development and Software Engineering",
    experience: "Production deployments & SPA hosting",
  },
];

const SkillsMatrix = memo(function SkillsMatrix() {
  return (
    <div className="w-full mt-12 md:mt-24 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
        <div>
          <h3 className="font-heading font-bold text-3xl text-white">Skills Evidence Matrix</h3>
          <p className="text-white/50 font-body font-light text-sm mt-2">
            Every technical skill listed is grounded in academic coursework, verified
            certifications, or real engineering projects.
          </p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {EVIDENCE_DATA.map((data, idx) => (
          <div
            key={idx}
            className="liquid-glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between hover:border-white/20 transition-colors duration-300 group"
          >
            <div>
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                <h4 className="font-heading font-bold text-xl text-white group-hover:text-blue-300 transition-colors">
                  {data.skill}
                </h4>
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>

              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <span className="text-white/60 font-mono text-[9px] uppercase tracking-wider block">
                    Related Project
                  </span>
                  <div className="flex items-center gap-1.5 text-white/85 font-body">
                    <FolderGit className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{data.project}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-white/60 font-mono text-[9px] uppercase tracking-wider block">
                    Verification Certificate
                  </span>
                  <div className="flex items-center gap-1.5 text-white/85 font-body">
                    <Award className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{data.certification}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-white/60 font-mono text-[9px] uppercase tracking-wider block">
                    Experience Context
                  </span>
                  <div className="flex items-center gap-1.5 text-white/85 font-body">
                    <Briefcase className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                    <span>{data.experience}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default SkillsMatrix;
