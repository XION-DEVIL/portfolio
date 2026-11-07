import {
  PROJECTS,
  FEATURED_CREDENTIALS,
  CERTIFICATIONS,
  EXPERIENCES,
  HONORS_AND_AWARDS,
  EDUCATION_HISTORY,
} from "../data";
import { CASE_STUDIES } from "../data/caseStudies";

const hasWord = (q: string, word: string) => new RegExp(`(?:^|\\W)${word}(?:$|\\W)`, "i").test(q);

const hasAny = (q: string, items: string[]) =>
  items.some((item) => (item.includes(" ") ? q.includes(item) : hasWord(q, item)));

export function answerQuestion(query: string): string {
  const raw = query.trim();
  const q = raw.toLowerCase();

  // 1. Greetings & Persona Check
  if (
    hasAny(q, [
      "hi",
      "hello",
      "hey",
      "who are you",
      "what can you do",
      "help",
      "start",
      "good morning",
      "good evening",
      "good afternoon",
    ]) &&
    !hasAny(q, [
      "project",
      "experience",
      "skill",
      "job",
      "hackathon",
      "hire",
      "recruiter",
      "nelsync",
    ])
  ) {
    return (
      `👋 **Hello! I'm Sahaya Savari F's AI Portfolio Assistant.**\n\n` +
      `I have verified, real-time knowledge about Sahaya's software engineering background, artificial intelligence research, hackathon championships, and professional credentials.\n\n` +
      `**Here are popular questions you can ask me:**\n` +
      `• **Hackathons**: *"Tell me about NelSync AI and your championship win."*\n` +
      `• **Experience**: *"What did you do during your software engineering internship at HodoLabs?"*\n` +
      `• **Projects**: *"What campus problem does VibeCraft solve?"*\n` +
      `• **Skills**: *"What is your machine learning and web tech stack?"*\n` +
      `• **Recruiter**: *"Why should we hire Sahaya for an AI or Full Stack role?"*\n` +
      `• **Contact**: *"How can I get in touch with Sahaya?"*`
    );
  }

  // 2. Specific Project Queries
  if (hasAny(q, ["nelsync", "paddy", "procurement", "aixcelerate"])) {
    const p = PROJECTS.find((proj) => proj.id === "nelsync-ai")!;
    return (
      `🌾 **NelSync AI — Overall Champion (AIxcelerate 2026 Hackathon)**\n\n` +
      `NelSync AI won **1st Place Overall Champion out of 66 competing teams** at the Multidisciplinary AI Innovation Hackathon hosted by Dhanalakshmi Srinivasan University.\n\n` +
      `**Problem & Impact:** Direct paddy procurement centers in Tamil Nadu suffer from severe queue bottlenecking and farmer wait times.\n\n` +
      `**4-Stage Architecture:**\n` +
      `1. **Predict**: Regional volume forecasting based on harvest cycles.\n` +
      `2. **Optimize**: Real-time procurement capacity load balancing across centers.\n` +
      `3. **Schedule**: Dynamic slot distribution for farmers to prevent center crowding.\n` +
      `4. **Monitor**: Live center flow tracking & bottleneck alerts.\n\n` +
      `**Sahaya's Direct Contribution:** Crafted the initial pitch deck, spearheaded empirical research, coordinated multi-discipline team tasks, and led live defense prep during judges' Q&A.\n\n` +
      `**Stack:** Python, Machine Learning, Data Analytics, Logistics Optimization.\n` +
      `🔗 [View Video Demo](${p.link})`
    );
  }

  if (hasAny(q, ["vibecraft", "neuragenzers", "attendance", "free class", "yuva'26", "srm"])) {
    return (
      `🏆 **VibeCraft 2026 (NeuraGenZers) — Winner (5th of 110 Teams)**\n\n` +
      `Built under pressure at SRM IST Trichy during YUVA'26, this solution integrated two full campus utilities into a single production deployment:\n\n` +
      `• **Round 1 — Student Attendance Predictor & Planner:**\n` +
      `  Subject-wise projection models, 75% statutory detention warnings, smart OD duty simulation, and margin-of-error planning across 13 student sections.\n\n` +
      `• **Round 2 — Free Class Locator & Smart Search Floor Manager:**\n` +
      `  Floor-wise room vacancy heatmaps, schedule filters, and natural language query parsing backed by the **Google Gemini API**.\n\n` +
      `**Tech Stack:** Next.js 16, React 19, TypeScript 5, Tailwind CSS v4, Recharts 3, Gemini API, Vercel.\n` +
      `🔗 [Live Application](https://neuragenzers.vercel.app/)`
    );
  }

  if (hasAny(q, ["prepmind", "exam", "quiz"])) {
    const p = PROJECTS.find((proj) => proj.id === "prepmind-ai");
    return (
      `🧠 **PrepMind AI — Adaptive Exam Practice & Learning Platform**\n\n` +
      `An interactive preparation suite designed to help students master core computer science and AI subjects.\n\n` +
      `• Real-time question generation and topic-wise mock tests.\n` +
      `• Instant feedback loops with detailed step-by-step explanations.\n` +
      `• Performance diagnostics showing accuracy, speed, and knowledge gaps.\n\n` +
      `**Tech Stack:** React, TypeScript, Tailwind CSS, Local Persistence.\n` +
      `🔗 [Live Platform](${p?.link || "https://sahayasavari.dev/projects/prepmind-ai"})`
    );
  }

  if (hasAny(q, ["daily spark", "habit"])) {
    const p = PROJECTS.find((proj) => proj.id === "daily-spark");
    return (
      `⚡ **Daily Spark — Minimalist Offline-First Habit Tracker**\n\n` +
      `Designed around atomic habit psychology to remove friction from daily routine building.\n\n` +
      `• Local-first architecture using IndexedDB for zero-latency, private offline logging.\n` +
      `• Native mobile wrapper compatibility via Capacitor.\n` +
      `• Streak visualization, completion velocity heatmaps, and customizable routine triggers.\n\n` +
      `**Tech Stack:** React, TypeScript, IndexedDB, Tailwind CSS, Capacitor.\n` +
      `🔗 [Live Platform](${p?.link || "https://sahayasavari.dev/projects/daily-spark"})`
    );
  }

  // Generic Project Query
  const matchedProject = PROJECTS.find(
    (p) =>
      q.includes(p.title.toLowerCase()) || q.includes(p.id.replace(/-/g, " ")) || q.includes(p.id),
  );
  if (matchedProject) {
    const cs = CASE_STUDIES[matchedProject.id];
    return (
      `🚀 **${matchedProject.title}** (${matchedProject.tag} · ${matchedProject.status})\n\n` +
      `${matchedProject.desc}\n\n` +
      `• **Problem:** ${matchedProject.problem}\n` +
      `• **Architecture:** ${cs ? cs.solution : matchedProject.architecture}\n` +
      `• **Tech Stack:** ${matchedProject.techStack?.join(", ") || matchedProject.stack}\n` +
      `• **Key Features:** ${matchedProject.features.join(", ")}\n\n` +
      `🔗 [Live Link](${matchedProject.link})${matchedProject.github ? ` · [GitHub Repository](${matchedProject.github})` : ""}`
    );
  }

  // 3. Hackathons & Honors
  if (
    hasAny(q, [
      "hackathon",
      "award",
      "honor",
      "winner",
      "achievement",
      "trophy",
      "competition",
      "bootfest",
      "ctf",
      "quiz",
      "championship",
    ])
  ) {
    return (
      `🏆 **Hackathon & Technical Honors Won by Sahaya Savari F:**\n\n` +
      HONORS_AND_AWARDS.map(
        (a) =>
          `• **${a.badge} ${a.title}** — *${a.event}*\n` +
          `  Organized by **${a.organizer}** (${a.date})\n` +
          `  ${a.desc}`,
      ).join("\n\n") +
      `\n\n💡 *Ask me specifically about NelSync AI or VibeCraft to see the full architectural breakdown!*`
    );
  }

  // 4. Work Experience & Internships
  if (
    hasAny(q, [
      "experience",
      "work",
      "job",
      "internship",
      "hodolabs",
      "career",
      "employment",
      "company",
    ])
  ) {
    return (
      `💼 **Work & Industry Experience:**\n\n` +
      EXPERIENCES.map(
        (e) =>
          `• **${e.role}** @ **${e.company}** (${e.period} · ${e.location})\n` +
          `  ${e.highlights.join(" ")}\n` +
          `  *Core Skills:* ${e.skills.join(", ")}`,
      ).join("\n\n") +
      `\n\n🤝 **Academic Leadership:**\n` +
      `• **Event In-Charge, AION 2K26 (Treasure Titans)** — Department of Artificial Intelligence, St. Joseph's College (Autonomous), Tiruchirappalli.`
    );
  }

  // 5. Why Hire / Recruiter Pitch
  if (
    hasAny(q, [
      "why hire",
      "recruiter",
      "hire sahaya",
      "fit",
      "strengths",
      "value",
      "full time",
      "role",
      "opportunity",
      "candidate",
    ])
  ) {
    return (
      `🎯 **Why Hire Sahaya Savari F:**\n\n` +
      `1. **Proven Hackathon Champion:** Won 1st Place Overall Champion (66 teams) at AIxcelerate 2026 and Top 5 Winner (110 teams) at VibeCraft 2026 under intense 24-hour sprints.\n` +
      `2. **Rigorous Academic Base:** Pursuing M.Sc in Artificial Intelligence at St. Joseph's College with B.Sc Computer Science from Thiagarajar College.\n` +
      `3. **Full-Stack ML Execution:** Bridges the gap between predictive ML models (Python, Scikit-learn) and high-performance interactive interfaces (React 19, TypeScript, Next.js 16, Tailwind).\n` +
      `4. **Industry-Grade Engineering Discipline:** Hands-on internship experience at HodoLabs Technologies, technical SEO leadership, and rigorous automated testing/WCAG accessibility standards.\n\n` +
      `*Sahaya is actively available for AI Engineering, Machine Learning, and Full Stack Developer positions.*`
    );
  }

  // 6. Education
  if (
    hasAny(q, [
      "education",
      "study",
      "college",
      "degree",
      "university",
      "academic",
      "qualification",
      "thiagarajar",
      "joseph",
      "m.sc",
      "b.sc",
      "cgpa",
    ])
  ) {
    return (
      `🎓 **Academic Background:**\n\n` +
      EDUCATION_HISTORY.map(
        (ed) =>
          `• **${ed.degree}**\n` +
          `  ${ed.institution} (${ed.period}) — **${ed.grade}**\n` +
          `  *Focus:* ${ed.focus}`,
      ).join("\n\n")
    );
  }

  // 7. Certifications & Credentials
  if (
    hasAny(q, [
      "cert",
      "credential",
      "course",
      "ibm",
      "nptel",
      "nielit",
      "iit",
      "specialization",
      "coursera",
    ])
  ) {
    return (
      `📜 **Featured Credentials & Professional Certifications:**\n\n` +
      FEATURED_CREDENTIALS.map(
        (c) =>
          `• **${c.title}** — ${c.issuer}\n` +
          `  *Issued:* ${c.issueDate || "2026"} ${c.credentialId ? `| *ID:* ${c.credentialId}` : ""}\n` +
          `  ${c.desc}`,
      ).join("\n\n") +
      `\n\n*All credentials are fully verified and backed by official issuing authority registries.*`
    );
  }

  // 8. Technical Skills & Stack
  if (
    hasAny(q, [
      "skill",
      "tech",
      "stack",
      "language",
      "tools",
      "framework",
      "python",
      "react",
      "typescript",
      "machine learning",
    ])
  ) {
    return (
      `⚡ **Technical Competencies & Toolchain:**\n\n` +
      `• **AI & Machine Learning:** Python, Scikit-learn, Regression, Classification, Model Evaluation, Prompt Engineering, Gemini API, Data Wrangling, Pandas, NumPy.\n` +
      `• **Frontend Engineering:** React 19, Next.js 16, TypeScript, Vite, Tailwind CSS v4, Framer Motion, TanStack Router, Responsive UI, Core Web Vitals optimization.\n` +
      `• **Backend & Storage:** Node.js, REST APIs, SQL, PostgreSQL, Firebase, IndexedDB, Supabase.\n` +
      `• **DevOps & Standards:** Git, GitHub Actions, Vercel, Vitest, Lighthouse CI, WCAG AA Accessibility, Linux.`
    );
  }

  // 9. Contact, Resume & Links
  if (
    hasAny(q, [
      "contact",
      "hire",
      "email",
      "reach",
      "linkedin",
      "github",
      "resume",
      "cv",
      "phone",
      "location",
      "talk",
    ])
  ) {
    return (
      `📫 **Get in Touch with Sahaya Savari F:**\n\n` +
      `• **Email:** [contact@sahayasavari.dev](mailto:contact@sahayasavari.dev)\n` +
      `• **LinkedIn:** [linkedin.com/in/sahaya-savari](https://www.linkedin.com/in/sahaya-savari)\n` +
      `• **GitHub:** [github.com/sahaya-savari](https://github.com/sahaya-savari)\n` +
      `• **Portfolio:** [https://sahayasavari.dev](https://sahayasavari.dev)\n` +
      `• **Resume:** [Download PDF Resume](/resume.pdf)\n\n` +
      `*Based in Tamil Nadu, India — open to remote, hybrid, and onsite opportunities worldwide.*`
    );
  }

  // 10. Fallback with smart recommendations
  return (
    `🤔 I want to give you the most accurate answer regarding Sahaya's work!\n\n` +
    `You can ask me directly about:\n` +
    `• **Hackathons:** *"What hackathons has Sahaya won?"* (AIxcelerate, VibeCraft)\n` +
    `• **Experience:** *"Tell me about his work at HodoLabs."*\n` +
    `• **Projects:** *"Explain NelSync AI or PrepMind."*\n` +
    `• **Skills:** *"What are his strongest languages and AI frameworks?"*\n` +
    `• **Education:** *"Where did he complete his M.Sc and B.Sc degrees?"*\n` +
    `• **Contact:** *"How can I reach him for job opportunities?"*`
  );
}

export const SUGGESTIONS: [string, string][] = [
  ["Championship", "Tell me about NelSync AI and your 1st place championship win."],
  ["Experience", "What was your role and work at HodoLabs Technologies?"],
  ["Campus App", "How does VibeCraft solve student attendance and classroom allocation?"],
  ["Skills", "What are your core technical skills in AI and Full-Stack development?"],
  ["Why Hire", "Why should we hire Sahaya for an AI or Software Engineering role?"],
  ["Contact", "How can I contact Sahaya or download his resume?"],
];
