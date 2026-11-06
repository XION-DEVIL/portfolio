import { useEffect, useMemo } from 'react';
import { Link } from '@/lib/router-compat';
import { ArrowLeft, Download, Mail, ExternalLink } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { SITE_URL, createBreadcrumbSchema } from '../seo';
import { EXPERIENCES, HONORS_AND_AWARDS, EDUCATION_HISTORY, PROJECTS } from '../data';

export default function RecruiterMode() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const recruiterSchema = useMemo(() => {
    const breadcrumb = createBreadcrumbSchema([
      { name: 'Home', url: SITE_URL },
      { name: 'Recruiter Summary', url: `${SITE_URL}/recruiter` },
    ]);
    return {
      '@context': 'https://schema.org',
      '@graph': [
        breadcrumb,
        {
          '@type': 'AboutPage',
          '@id': `${SITE_URL}/recruiter/#webpage`,
          url: `${SITE_URL}/recruiter`,
          name: 'Recruiter Summary | Sahaya Savari',
          mainEntity: { '@id': `${SITE_URL}/#person` },
        },
      ],
    };
  }, []);

  return (
    <>
      <SEOHead 
        title="Recruiter Summary & Technical Profile | Sahaya Savari"
        description="ATS-friendly recruiter summary for Sahaya Savari F, an AI Engineer, Python Developer, Full Stack Developer, and M.Sc. Artificial Intelligence student."
        url={`${SITE_URL}/recruiter`}
        schema={recruiterSchema}
      />
      <div className="pt-32 pb-24 px-6 max-w-screen-md mx-auto min-h-screen bg-black text-white selection:bg-white selection:text-black">
        <Link to="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors font-body text-sm no-print">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        
        <header className="mb-12 border-b border-white/10 pb-8 flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-heading italic tracking-tight mb-2">Sahaya Savari F</h1>
            <p className="text-xl font-body text-white/70 mb-4">AI Engineer / Full Stack Developer</p>
            <div className="flex flex-wrap gap-4 text-sm font-body text-white/50">
              <a href="mailto:contact@sahayasavari.dev" className="flex items-center gap-1.5 hover:text-white transition-colors"><Mail className="w-4 h-4" /> contact@sahayasavari.dev</a>
              <a href="https://github.com/sahaya-savari" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors"><ExternalLink className="w-4 h-4" /> github.com/sahaya-savari</a>
              <a href="https://www.linkedin.com/in/sahaya-savari" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors"><ExternalLink className="w-4 h-4" /> linkedin.com/in/sahaya-savari</a>
            </div>
          </div>
          <button 
            onClick={() => window.print()}
            className="no-print hidden sm:flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full font-medium text-sm hover:scale-105 transition-transform"
          >
            <Download className="w-4 h-4" />
            Save as PDF
          </button>
        </header>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">Professional Summary</h2>
          <p className="text-base font-body leading-relaxed text-white/80">
            M.Sc. Artificial Intelligence student & B.Sc. Data Science graduate with hands-on industry internship experience in Web Development and Technical SEO at HodoLabs Technologies. Hackathon champion (AIxcelerate 2026 Overall Winner) experienced in developing end-to-end AI applications, Python systems, and scalable React/TypeScript web apps. Actively seeking AI/ML Engineer, Python Developer, or Full Stack Developer roles.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">Work Experience</h2>
          <div className="space-y-6">
            {EXPERIENCES.map((exp) => (
              <div key={exp.company + exp.role} className="border-l-2 border-white/20 pl-4">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-1">
                  <h3 className="text-lg font-heading italic text-white">{exp.role}</h3>
                  <span className="text-xs font-mono text-white/50">{exp.period}</span>
                </div>
                <p className="text-sm font-body text-cyan-400 mb-2">{exp.company} · {exp.location}</p>
                <ul className="text-sm font-body text-white/70 space-y-1 list-disc list-inside">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">Core Competencies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-body text-sm text-white/80">
            <div>
              <strong className="block text-white mb-2">Languages & AI</strong>
              <ul className="space-y-1 text-white/80">
                <li>Python</li>
                <li>TypeScript / JavaScript</li>
                <li>Machine Learning / NLP</li>
                <li>SQL</li>
              </ul>
            </div>
            <div>
              <strong className="block text-white mb-2">Frontend</strong>
              <ul className="space-y-1 text-white/80">
                <li>React / Vite</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
                <li>Semantic HTML / SEO</li>
              </ul>
            </div>
            <div>
              <strong className="block text-white mb-2">Backend & Cloud</strong>
              <ul className="space-y-1 text-white/80">
                <li>FastAPI / Flask</li>
                <li>Supabase / Firebase</li>
                <li>Git / GitHub</li>
                <li>RESTful APIs / Docker</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">Top Projects</h2>
          <div className="space-y-8">
            {PROJECTS.map((project) => (
              <div key={project.id}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-heading italic text-white">{project.title}</h3>
                    {project.status.includes('Champion') || project.tag.includes('Champion') || project.tag.includes('1st Place') ? (
                      <span className="text-[10px] font-mono uppercase bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded-full">🏆 1st Place Champion</span>
                    ) : (
                      <span className="text-[10px] font-mono uppercase bg-white/10 text-white/70 border border-white/20 px-2 py-0.5 rounded-full">{project.status}</span>
                    )}
                  </div>
                  <span className="text-xs font-body text-white/50 border border-white/10 px-2 py-1 rounded-full mt-1 sm:mt-0">{project.stack}</span>
                </div>
                <p className="text-sm font-body text-white/70 leading-relaxed">
                  {project.longDesc || project.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">Honors &amp; Awards</h2>
          <div className="space-y-3 font-body text-sm">
            {HONORS_AND_AWARDS.map((award) => (
              <div key={award.title + award.event} className="flex justify-between items-baseline border-b border-white/10 pb-2">
                <div>
                  <span className="font-semibold text-white">{award.badge} {award.title}</span> — {award.event} ({award.organizer})
                </div>
                <span className="text-xs text-white/50">{award.date}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-sm font-body font-bold text-white/70 uppercase tracking-widest mb-4">Education</h2>
          <div className="space-y-4">
            {EDUCATION_HISTORY.map((edu) => (
              <div key={edu.degree}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold font-body text-white">{edu.degree}</h3>
                  <span className="text-sm font-body text-white/50">{edu.period} {edu.grade ? `(${edu.grade})` : ''}</span>
                </div>
                <p className="text-sm font-body text-white/70">{edu.institution}</p>
                <p className="text-xs font-mono text-white/50 mt-0.5">{edu.focus}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </>
  );
}
