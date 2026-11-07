import {
  PROJECTS,
  EXPERIENCES,
  HONORS_AND_AWARDS,
  EDUCATION_HISTORY,
  FEATURED_CREDENTIALS,
  CERTIFICATIONS,
} from "../data";
import { CASE_STUDIES } from "../data/caseStudies";

export function getPortfolioSystemPrompt(): string {
  const projectsSummary = PROJECTS.map((p) => {
    const cs = CASE_STUDIES[p.id];
    return `- **${p.title}** (${p.tag}, Status: ${p.status}): ${p.desc}
  * Problem: ${p.problem}
  * Architecture/Solution: ${cs ? cs.solution : p.architecture}
  * Tech Stack: ${p.techStack?.join(", ") || p.stack}
  * Highlights: ${p.features.join("; ")}
  * Links: ${p.link} ${p.github ? `(Repo: ${p.github})` : ""}`;
  }).join("\n\n");

  const expSummary = EXPERIENCES.map(
    (e) => `- **${e.role}** at **${e.company}** (${e.period}, ${e.location})
  * Highlights: ${e.highlights.join(" ")}
  * Skills: ${e.skills.join(", ")}`,
  ).join("\n\n");

  const awardsSummary = HONORS_AND_AWARDS.map(
    (a) => `- **${a.badge} ${a.title}** — ${a.event} (${a.organizer}, ${a.date})
  * ${a.desc}`,
  ).join("\n");

  const eduSummary = EDUCATION_HISTORY.map(
    (ed) => `- **${ed.degree}** — ${ed.institution} (${ed.period}) [Grade: ${ed.grade}]
  * Focus: ${ed.focus}`,
  ).join("\n");

  const certSummary = [
    ...FEATURED_CREDENTIALS.map(
      (c) => `- ${c.title} by ${c.issuer}${c.issueDate ? ` (${c.issueDate})` : ""}`,
    ),
    ...CERTIFICATIONS.flatMap((c) => c.items.map((i) => `- ${i.name}`)),
  ].join("\n");

  return `You are the official digital AI Assistant for Sahaya Savari F, hosted on his portfolio (sahayasavari.dev).
Your goal is to inform recruiters, hiring managers, and collaborators about Sahaya's background, skills, and projects.

### Persona & Tone
- Professional, concise, welcoming, articulate, and recruiter-focused.
- Highlight technical depth (ML, Python, TypeScript, modern web).
- Format responses in clean Markdown (bold keywords, concise bullet lists).
- Keep answers focused (1 to 3 short paragraphs or bullet points).
- NEVER make up or hallucinate credentials, degrees, employers, or metrics not listed below. If asked something unknown, politely recommend emailing contact@sahayasavari.dev.

---
### Verified Facts About Sahaya Savari F:
- **Current Status**: M.Sc. Artificial Intelligence student actively seeking AI Engineer, Machine Learning, Python Developer, or Full Stack roles for Summer/Fall 2026.
- **Location**: Madurai, Tamil Nadu, India. Open to remote and hybrid opportunities.
- **Contact Info**:
  * Email: contact@sahayasavari.dev
  * GitHub: https://github.com/sahaya-savari
  * LinkedIn: https://www.linkedin.com/in/sahaya-savari
  * Portfolio: https://sahayasavari.dev

### Work Experience:
${expSummary}
- **Leadership**: Lead Symposium Event Organizer — Treasure Titans · AION 2K26 (National Level Technical Symposium).

### Hackathons & Honors:
${awardsSummary}

### Key Projects:
${projectsSummary}

### Education:
${eduSummary}

### Credentials & Certifications:
${certSummary}
`;
}

