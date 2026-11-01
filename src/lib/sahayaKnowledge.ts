import { PROJECTS, FEATURED_CREDENTIALS, CERTIFICATIONS } from '../data';
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

  if (has(q, ['project', 'built', 'portfolio work', 'apps'])) {
    return `Sahaya has built ${PROJECTS.length} major projects:\n\n${PROJECTS.map(
      (p) => `• ${p.title} — ${p.tag}: ${p.stack}`,
    ).join('\n')}\n\nAsk about any one by name for full details.`;
  }

  if (has(q, ['cert', 'credential', 'course', 'ibm', 'qualification'])) {
    const featured = FEATURED_CREDENTIALS.map(
      (c) => `• ${c.title} — ${c.issuer}${c.issueDate ? ` (${c.issueDate})` : ''}`,
    );
    const other = CERTIFICATIONS.flatMap((c) => c.items.map((i) => `• ${i.name}`));
    return `Certifications:\n\n${[...featured, ...other].join('\n')}`;
  }

  if (has(q, ['skill', 'tech', 'stack', 'language', 'tools', 'know'])) {
    const stack = Array.from(new Set(PROJECTS.flatMap((p) => p.techStack ?? p.stack.split(' · '))));
    return `Sahaya is an AI Engineer & Full Stack Developer. Core areas: Artificial Intelligence, Machine Learning, Python, FastAPI.\n\nTechnologies used across his projects: ${stack.join(', ')}.`;
  }

  if (has(q, ['experience', 'work', 'job', 'education', 'study', 'college', 'background'])) {
    return `Sahaya is an M.Sc. Artificial Intelligence student at St. Joseph's College (Autonomous), Trichy. He has shipped ${PROJECTS.length} production-style projects (${PROJECTS.map((p) => p.title).join(', ')}) and earned ${FEATURED_CREDENTIALS.length} featured certifications.`;
  }

  if (has(q, ['contact', 'hire', 'email', 'reach', 'linkedin', 'available'])) {
    return "Email: contact@sahayasavari.dev\nLinkedIn: linkedin.com/in/sahaya-savari\n\nHe's open to internships and entry-level AI / full-stack roles.";
  }

  if (has(q, ['hi', 'hello', 'hey'])) {
    return 'Hello! Ask me about Sahaya’s skills, projects, certifications, experience, or how to contact him.';
  }

  return `I couldn't find that in Sahaya's portfolio. Try asking about: skills, experience, certifications, contact, or a project (${PROJECTS.map((p) => p.title).join(', ')}).`;
}

export const SUGGESTIONS: [string, string][] = [
  ['Skills', 'What are your core technical skills?'],
  ['Projects', 'What projects have you built?'],
  ...PROJECTS.slice(0, 3).map((p) => [p.title, `Tell me about ${p.title}`] as [string, string]),
  ['Certifications', 'What certifications do you have?'],
  ['Experience', 'Tell me about your experience.'],
  ['Contact', 'How can I contact Sahaya?'],
];
