import { 
  PROJECTS, 
  FEATURED_CREDENTIALS, 
  CERTIFICATIONS, 
  EXPERIENCES, 
  HONORS_AND_AWARDS, 
  EDUCATION_HISTORY 
} from '../data';
import { CASE_STUDIES } from '../data/caseStudies';

const has = (q: string, words: string[]) => words.some((w) => q.includes(w));

export function answerQuestion(query: string): string {
  const q = query.toLowerCase();

  const project = PROJECTS.find(
    (p) => q.includes(p.title.toLowerCase()) || q.includes(p.id.replace(/-/g, ' ')) || q.includes(p.id),
  );
  if (project) {
    const cs = CASE_STUDIES[project.id];
    return [
      `${project.title} (${project.tag}, ${project.status}): ${project.desc}`,
      `Problem: ${project.problem}`,
      cs ? `Solution: ${cs.solution}` : `Architecture: ${project.architecture}`,
      `Stack: ${project.techStack?.join(', ') || project.stack}.`,
      `Key features: ${project.features.join(', ')}.`,
      `Live: ${project.link}${project.github ? ` · Code: ${project.github}` : ''}`,
    ].join('\n\n');
  }

  if (has(q, ['hackathon', 'award', 'honor', 'winner', 'nelsync', 'achievement', 'trophy', 'bootfest', 'ctf', 'quiz'])) {
    return `🏆 Hackathon & Technical Honors:\n\n` +
      HONORS_AND_AWARDS.map(
        (a) => `• ${a.badge} ${a.title} — ${a.event} (${a.organizer}, ${a.date})\n  ${a.desc}`
      ).join('\n\n');
  }

  if (has(q, ['experience', 'work', 'job', 'internship', 'hodolabs', 'career', 'employment'])) {
    return `Industry Experience:\n\n` +
      EXPERIENCES.map(
        (e) => `• ${e.role} @ ${e.company} (${e.period}) · ${e.location}\n  ${e.highlights.join(' ')}\n  Skills: ${e.skills.join(', ')}`
      ).join('\n\n');
  }

  if (has(q, ['education', 'study', 'college', 'degree', 'university', 'academic', 'qualification', 'thiagarajar', 'joseph'])) {
    return `Education:\n\n` +
      EDUCATION_HISTORY.map(
        (ed) => `• ${ed.degree} — ${ed.institution} (${ed.period}) [${ed.grade}]\n  Focus: ${ed.focus}`
      ).join('\n\n');
  }

  if (has(q, ['project', 'built', 'portfolio work', 'apps'])) {
    return `Sahaya has built ${PROJECTS.length} major projects:\n\n${PROJECTS.map(
      (p) => `• ${p.title} — ${p.tag}: ${p.stack}`,
    ).join('\n')}\n\nAsk about any one by name (e.g. "NelSync AI", "PrepMind AI", "SLI Vault") for full details.`;
  }

  if (has(q, ['cert', 'credential', 'course', 'ibm'])) {
    const featured = FEATURED_CREDENTIALS.map(
      (c) => `• ${c.title} — ${c.issuer}${c.issueDate ? ` (${c.issueDate})` : ''}`,
    );
    const other = CERTIFICATIONS.flatMap((c) => c.items.map((i) => `• ${i.name}`));
    return `Certifications:\n\n${[...featured, ...other].join('\n')}`;
  }

  if (has(q, ['skill', 'tech', 'stack', 'language', 'tools', 'know'])) {
    const stack = Array.from(new Set(PROJECTS.flatMap((p) => p.techStack ?? p.stack.split(' · '))));
    return `Sahaya is an AI Engineer, Python Developer, and Full Stack Developer.\n\nCore Competencies: Machine Learning, Computer Vision, Python (FastAPI/Flask), React, TypeScript, SEO & Web Performance.\n\nTechnologies used across his work: ${stack.join(', ')}.`;
  }

  if (has(q, ['contact', 'hire', 'email', 'reach', 'linkedin', 'available'])) {
    return "Email: contact@sahayasavari.dev\nLinkedIn: linkedin.com/in/sahaya-savari\nGitHub: github.com/sahaya-savari\n\nHe is open to AI/ML, Python Developer, and Full Stack opportunities.";
  }

  if (has(q, ['hi', 'hello', 'hey'])) {
    return 'Hello! Ask me about Sahaya’s work experience, hackathons, projects, skills, education, or how to contact him.';
  }

  return `I couldn't find that in Sahaya's portfolio. Try asking about: experience (HodoLabs), hackathons (AIxcelerate winner), projects (NelSync AI, PrepMind AI), skills, education, or contact details.`;
}

export const SUGGESTIONS: [string, string][] = [
  ['Experience', 'Tell me about your work experience at HodoLabs.'],
  ['Hackathons', 'What hackathons or awards have you won?'],
  ['Projects', 'Tell me about NelSync AI and PrepMind AI.'],
  ['Skills', 'What are your core technical skills?'],
  ['Education', 'Where did you study?'],
  ['Contact', 'How can I contact Sahaya?'],
];
