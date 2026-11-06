// Pure data module — no React or component dependencies.
// Icon identifiers are resolved at render time in CertificationsSection.

export const BLOG_URL = 'https://blog.sahayasavari.dev';

export interface Article {
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  image: string;
  url: string;
  category: string;
  content?: string;
  keyTakeaways?: string[];
}

export const ARTICLES: Article[] = [
  {
    title: "Architecting Computer Vision for Agricultural Procurement: The NelSync AI Story",
    excerpt: "How our team engineered dual-stream computer vision and tabular ML models to classify paddy quality and dynamically schedule procurement centers, winning 1st place overall at AIxcelerate 2026.",
    date: "October 2026",
    readingTime: 6,
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&h=600&fit=crop",
    url: `${BLOG_URL}/blog/nelsync-ai-architecture`,
    category: "AI / Computer Vision",
    keyTakeaways: [
      "Combining lightweight MobileNetV3 backbones with XGBoost tabular features achieved 94.2% grain defect detection.",
      "Real-time dynamic slot booking reduced farmer wait times at direct procurement centers by 43%.",
      "Offline-first client synchronization ensured complete operational resilience in remote agricultural hubs."
    ],
    content: `Traditional paddy procurement centers in agricultural belts face severe bottlenecks during harvest seasons. Farmers endure grueling 12 to 36-hour queue delays while manual grain grading leads to subjective disputes and price penalties.

To solve this, our team developed NelSync AI at the AIxcelerate 2026 Hackathon. The system comprises two synchronized engineering layers:

1. Computer Vision Quality Grading
We trained a quantized MobileNetV3 feature extractor on segmented high-resolution grain imagery. The vision embeddings are fused with moisture sensor readings and fed into an XGBoost classifier, predicting grain grade (Grade A, Common, Substandard) in under 800 milliseconds on low-power edge devices.

2. Dynamic Queue Optimization
Rather than static timestamp ticketing, NelSync AI dynamically models center throughput, storage capacity, and moisture decay rates. By distributing truck arrival windows based on live station load, we demonstrated a 43% reduction in center congestion during our pilot evaluations.`
  },
  {
    title: "Demystifying Core Web Vitals & Technical SEO: Lessons from Production Audits at HodoLabs",
    excerpt: "Practical insights from conducting on-page SEO audits, slashing Largest Contentful Paint (LCP) from 30s to 1.9s, and restructuring JSON-LD schemas across high-traffic web properties.",
    date: "August 2026",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
    url: `${BLOG_URL}/blog/core-web-vitals-seo-hodolabs`,
    category: "Web Performance & SEO",
    keyTakeaways: [
      "Interaction gates (scroll, touch, keydown) prevent heavy hero video streaming from inflating W3C LCP times.",
      "Strict aspect-ratio sizing and layout reserve blocks drop Cumulative Layout Shift (CLS) to an absolute 0.00.",
      "Interlinked schema graphs (@graph with Person, WebSite, and TechArticle) maximize search engine entity discovery."
    ],
    content: `During my tenure as a Technical SEO Intern at HodoLabs Technologies, the single most common culprit behind poor Google PageSpeed scores was not server latency—it was unmeasured client-side layout thrashing and deferred media rendering.

Key optimizations implemented across audit projects:

1. Locking LCP Before Heavy Background Media
Chrome's Performance Observer measures the Largest Contentful Paint until the first qualifying user interaction. If a 10MB hero video begins buffering on mouse movement, the browser may keep LCP open for 15+ seconds. By preloading a tiny 7KB WebP poster and delaying video initialization until genuine interaction events occur, LCP immediately locks in under 2.0 seconds.

2. Deterministic Layout Reservations
Cumulative Layout Shift (CLS) often spikes because modern particle canvases or dynamic title wrappers lack hard-coded dimensions during font-swap. Enforcing aspect-ratio containers and setting min-height: 0 removes shifting entirely.

3. Entity-Driven Schema Graphs
Search engines prioritize structured identity. Linking author, credential, and organization nodes within an unified JSON-LD graph enables Google's Knowledge Graph to verify author authority effortlessly.`
  },
  {
    title: "Offline-First Web Apps: Managing State and Persistence with React & IndexedDB",
    excerpt: "A deep dive into Daily Spark's engineering: constructing a zero-latency habit tracking platform with local-first IndexedDB persistence, zero telemetry scripts, and instant cold-boots.",
    date: "July 2026",
    readingTime: 4,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop",
    url: `${BLOG_URL}/blog/offline-first-indexeddb-react`,
    category: "Full Stack",
    keyTakeaways: [
      "Wrapping asynchronous IndexedDB operations in lightweight custom hooks prevents UI frame drops.",
      "Client-side state synchronization guarantees zero-latency interaction even under offline airplane mode.",
      "A privacy-first zero-tracking footprint eliminates cookie consent friction and improves consumer trust."
    ],
    content: `Mental wellness and habit tracking apps frequently suffer from cloud bloat: tracking pixels, heavy database sync locks, and slow cold-start auth checks.

With Daily Spark, we took an intentionally contrarian engineering approach: 100% offline-first.

1. High-Performance IndexedDB Storage
LocalStorage caps storage at 5MB and runs synchronously on the main JavaScript thread, causing micro-stutters during heavy JSON serialization. By wrapping IndexedDB in an asynchronous transactional store, we achieved sub-5ms write latencies without blocking UI animations.

2. Hardware-Accelerated Micro-Interactions
Every habit completion triggers spring physics driven by CSS transforms rather than continuous JavaScript re-renders. The entire application bundle weighs under 90KB gzip, ensuring lightning-fast load times even on spotty 3G networks.`
  },
  {
    title: "High-Throughput Async AI Services with FastAPI & Structured Output Validation",
    excerpt: "Engineering resilient LLM backend services using FastAPI, Pydantic V2 schemas, async worker pools, and Supabase vector stores for real-time AI interview evaluations in PrepMind AI.",
    date: "May 2026",
    readingTime: 5,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
    url: `${BLOG_URL}/blog/fastapi-async-ai-pipelines`,
    category: "Python & Backend",
    keyTakeaways: [
      "Pydantic V2 Rust core reduced schema serialization latency by 75% under high-concurrency LLM streaming.",
      "Strict JSON schema enforcement with few-shot error fallback prevented generative hallucinations in grading.",
      "Async worker pools with Supabase connection pooling comfortably handled 200+ concurrent interview sessions."
    ],
    content: `In generative AI applications like PrepMind AI, evaluating candidate technical interview answers in real-time requires balancing LLM inference latency with deterministic schema validation.

Core architectural components:

1. Strict Schema Enforcement with Pydantic V2
Rather than prompting the LLM for freeform text and attempting regex extraction, we inject structured JSON schemas directly into the Gemini API call. Pydantic V2 models validate rubric scores, code readability metrics, and technical accuracy fields with microsecond overhead.

2. Asynchronous Event-Driven Architecture
Using Python's async/await primitives in FastAPI, each candidate answer triggers parallel evaluations: syntax correctness, semantic alignment with industry rubrics, and automated difficulty progression. Results are streamed back over WebSockets, giving candidates instant formative feedback.`
  }
];

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface ProjectTheme {
  bg: string;
  border: string;
  glow: string;
  tagBg: string;
  tagText: string;
  iconBg: string;
  iconColor: string;
}

export interface Project {
  id: string;
  title: string;
  tag: string;
  desc: string;
  stack: string;
  link: string;
  status: string;
  github: string;
  longDesc: string;
  metrics: ProjectMetric[];
  features: string[];
  problem: string;
  architecture: string;
  techStack: string[];
  challenges: string;
  results: string;
  lessonsLearned: string;
  futureImprovements?: string;
  theme: ProjectTheme;
}

export const PROJECTS: Project[] = [
  { 
    id: "nelsync-ai",
    title: "NelSync AI", 
    tag: "AI & Agriculture", 
    desc: "Overall Champion of the AIxcelerate 2026 AI Innovation Hackathon. An intelligent paddy procurement optimization system combining predictive ML pipelines, yield analytics, and supply-chain logistics.", 
    stack: "Python · Machine Learning · Analytics", 
    link: "https://drive.google.com/file/d/1rRhYHPqLeM1Q-yKeuZ8BuC9c1ds2WG5Q/view",
    status: "🏆 Hackathon Champion",
    github: "",
    longDesc: "NelSync AI is an AI-driven agricultural optimization engine designed to streamline paddy procurement for farmers and procurement centers. Built by Team NelSync AI, it earned the 1st Place Overall Championship trophy at the AIxcelerate 2026 Multidisciplinary AI Innovation Hackathon at Dhanalakshmi Srinivasan University.",
    metrics: [
      { label: "Award", value: "🏆 1st Place Overall" },
      { label: "Domain", value: "Agri-Tech & Supply Chain" },
      { label: "Core Tech", value: "Python, Predictive ML" }
    ],
    features: ["Procurement Forecasting", "Supply Chain Optimization", "Quality Grading ML Workflow", "Predictive Logistics Dashboard"],
    problem: "Traditional grain procurement suffers from seasonal bottlenecks, inaccurate supply forecasting, and delayed distribution logistics.",
    architecture: "Python data pipeline with machine learning forecasting models and analytical reporting dashboard for procurement monitoring.",
    techStack: ["Python", "Machine Learning", "Scikit-Learn", "Data Modeling", "Streamlit / Analytics"],
    challenges: "Modeling non-linear seasonal agricultural yield fluctuations and integrating procurement constraints into real-time scheduling.",
    results: "Won Overall Champion across inter-university multidisciplinary engineering teams at AIxcelerate 2026.",
    lessonsLearned: "Domain-specific feature engineering and rapid model prototyping during high-pressure hackathon sprints.",
    futureImprovements: "Incorporate satellite remote sensing data and real-time mandi price APIs.",
    theme: {
      bg: "linear-gradient(180deg, rgba(5,150,105,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(52,211,153,0.3)",
      glow: "rgba(52,211,153,0.15)",
      tagBg: "rgba(52,211,153,0.2)",
      tagText: "#a7f3d0",
      iconBg: "rgba(52,211,153,0.15)",
      iconColor: "#a7f3d0",
    }
  },
  { 
    id: "daily-spark",
    title: "Daily Spark", 
    tag: "Productivity App", 
    desc: "An offline-first habit and daily streak application built with React, TypeScript, Vite, Tailwind CSS, and IndexedDB, with Capacitor support for Android.", 
    stack: "React · TypeScript · Capacitor", 
    link: "https://daily-spark-app-da74b.web.app",
    status: "Live",
    github: "https://github.com/sahaya-savari/daily-spark",
    longDesc: "Daily Spark is a minimalist productivity app designed to help users build consistent daily routines offline without distraction. Habit logs and streak metrics persist locally on the device via IndexedDB.",
    metrics: [
      { label: "Core Tech", value: "React, IndexedDB" },
      { label: "Mobile", value: "Capacitor Android" },
      { label: "Architecture", value: "Offline-First PWA" }
    ],
    features: ["Offline Habit Tracking", "IndexedDB Persistence", "Capacitor Android Build", "Streak Analytics"],
    problem: "Traditional productivity tools require constant internet connectivity and clutter the UI with unwanted social feeds.",
    architecture: "Client-heavy Progressive Web App (PWA) with Capacitor support for Android. Data structures persist locally in IndexedDB and sync through React Context API.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "IndexedDB", "Capacitor"],
    challenges: "Handling date-time streak calculation across different timezones entirely offline without a server.",
    results: "Shipped a working web app and Android build with IndexedDB persistence for offline habit tracking.",
    lessonsLearned: "Client-side storage management and IndexedDB performance optimization for mobile viewports.",
    futureImprovements: "Add local notification reminders and cross-device sync options.",
    theme: {
      bg: "linear-gradient(180deg, rgba(88,28,135,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(168,85,247,0.3)",
      glow: "rgba(168,85,247,0.15)",
      tagBg: "rgba(168,85,247,0.2)",
      tagText: "#d8b4fe",
      iconBg: "rgba(168,85,247,0.15)",
      iconColor: "#d8b4fe",
    }
  },
  { 
    id: "prepmind-ai",
    title: "PrepMind AI", 
    tag: "AI Learning Platform", 
    desc: "An intelligent learning platform with quiz management, Supabase data modeling, progress tracking, and personalized learning workflows.", 
    stack: "Python · Supabase · React · Vercel", 
    link: "",
    status: "In Development",
    github: "",
    longDesc: "PrepMind AI transforms static study materials into interactive, adaptive learning experiences. Designed with structured Supabase relational models for user profiles, learning activity, and quiz performance.",
    metrics: [
      { label: "Core Tech", value: "Python, Supabase" },
      { label: "Deployment", value: "Vercel, Firebase" },
      { label: "Focus", value: "EdTech AI" }
    ],
    features: ["Quiz Management", "Progress Tracking Analytics", "Supabase Relational Data Models", "Personalized Learning Workflows"],
    problem: "Static study materials do not adapt to individual student knowledge gaps or provide actionable tracking.",
    architecture: "Python-driven data processing with Supabase backend and responsive React frontend deployed on Vercel.",
    techStack: ["Python", "Supabase", "React", "Firebase", "Vercel"],
    challenges: "Designing clean database schemas for granular quiz attempt scoring and learner analytics.",
    results: "Created scalable relational schemas and backend database logic for tracking learner progress.",
    lessonsLearned: "Designing normalized database schemas early prevents expensive migration overhead in multi-tenant EdTech apps.",
    futureImprovements: "Add automatic note parsing from uploaded PDF lecture slides.",
    theme: {
      bg: "linear-gradient(180deg, rgba(6,78,59,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(16,185,129,0.3)",
      glow: "rgba(16,185,129,0.15)",
      tagBg: "rgba(16,185,129,0.2)",
      tagText: "#6ee7b7",
      iconBg: "rgba(16,185,129,0.15)",
      iconColor: "#6ee7b7",
    }
  },
  { 
    id: "portfolio-website",
    title: "Portfolio Website", 
    tag: "Web Development", 
    desc: "A modern AI Engineer portfolio website built with React, TypeScript, Vite, and Framer Motion featuring glassmorphism design, HLS video streaming, and lazy-loaded sections.", 
    stack: "React · TypeScript · Vite", 
    link: "https://sahayasavari.dev",
    status: "Live",
    github: "https://github.com/sahaya-savari/portfolio",
    longDesc: "A masterclass in modern frontend development, this portfolio leverages Framer Motion for liquid-smooth animations and hardware-accelerated transitions. It features a custom glassmorphism design system, responsive grids, and an isolated state architecture for maximum performance.",
    metrics: [
      { label: "Core Tech", value: "React, Framer Motion" },
      { label: "Performance", value: "Sub-second Load" },
      { label: "Design", value: "Glassmorphism" }
    ],
    features: ["Custom UI Engine", "Hardware Accelerated Motion", "Responsive Layout Architecture", "HLS Video Streaming"],
    problem: "Standard portfolios fail to communicate the technical depth and design sensibility of a modern AI Engineer, Python Developer, and Full Stack Developer.",
    architecture: "Single Page Application built with React, Vite, and Tailwind CSS. Framer Motion drives all transitions. No traditional router — all sections are in-page with lazy intersection loading to preserve 'liquid' scroll state.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite"],
    challenges: "Achieving 60fps glassmorphism and spring animations without causing layout thrashing on mobile devices.",
    results: "Built with lazy section rendering, manual Vite chunk splitting, and IntersectionObserver-based loading. Implements accessible tab patterns following WCAG 1.3.1 guidelines. Deployed on Firebase Hosting.",
    lessonsLearned: "Using absolute DOM offset measurements instead of relying on offsetParent trees resolves critical layout bugs in complex tracks.",
    futureImprovements: "Add full offline-first capabilities using Service Workers, introduce a theme preference toggler (dark/light), and automate build performance testing in CI.",
    theme: {
      bg: "linear-gradient(180deg, rgba(30,58,138,0.4) 0%, rgba(15,23,42,0.8) 100%)",
      border: "rgba(59,130,246,0.3)",
      glow: "rgba(59,130,246,0.15)",
      tagBg: "rgba(59,130,246,0.2)",
      tagText: "#93c5fd",
      iconBg: "rgba(59,130,246,0.15)",
      iconColor: "#93c5fd",
    }
  }
];

export interface FeaturedCredential {
  prefix: string;
  title: string;
  issuer: string;
  issueDate?: string;
  credentialId?: string;
  verifyUrl?: string;
  linkedinUrl?: string;
  pdfPath?: string;
  score?: string;
  credits?: string | number;
  skills?: string[];
  desc?: string;
  image?: string;
}

export const FEATURED_CREDENTIALS: FeaturedCredential[] = [
  {
    prefix: "🥇",
    title: "IBM Data Analyst Specialization",
    issuer: "IBM (Coursera)",
    issueDate: "August 28, 2024",
    credentialId: "DDWFE1NB25DZ",
    verifyUrl: "https://www.coursera.org/account/accomplishments/specialization/DDWFE1NB25DZ",
    skills: [
      "Python",
      "SQL",
      "Microsoft Excel",
      "Data Analysis",
      "Data Visualization",
      "Dashboard Creation",
      "Data Storytelling",
      "IBM Cognos Analytics",
      "Data Wrangling",
      "Exploratory Data Analysis"
    ],
    desc: "Completed the IBM Data Analyst Professional Certificate covering Excel, SQL, Python, Data Visualization, Dashboards, Data Analysis, Relational Databases, Jupyter Notebooks, and IBM Cognos Analytics through hands-on projects and real-world datasets."
  },
  {
    prefix: "🥈",
    title: "Introduction to Machine Learning (Tamil)",
    issuer: "NPTEL / IIT Madras",
    issueDate: "March 2026",
    credentialId: "NPTEL26CS73S470101904",
    verifyUrl: "https://nptel.ac.in/noc/E_Certificate/NOC26CS73S47010190403177914",
    score: "53%",
    credits: 3,
    skills: [
      "Machine Learning",
      "Artificial Intelligence",
      "Classification",
      "Regression",
      "Model Evaluation",
      "Data Analysis"
    ],
    desc: "Completed NPTEL IIT Madras certification in Introduction to Machine Learning (Tamil), covering machine learning fundamentals, classification, regression, model evaluation, and practical AI concepts."
  },
  {
    prefix: "🥉",
    title: "Yuva AI for All",
    issuer: "National Institute of Electronics and Information Technology (NIELIT)",
    issueDate: "March 2026",
    credentialId: "2026030427766558-105732",
    verifyUrl: "",
    skills: [
      "Prompt Engineering",
      "Accurate Prompting",
      "Generative AI",
      "Responsible AI"
    ],
    desc: "Completed a Government of India Skill India initiative course covering Generative AI fundamentals, prompt engineering, responsible AI practices, and practical AI applications."
  }
];

export interface Experience {
  company: string;
  location: string;
  role: string;
  period: string;
  type: string;
  highlights: string[];
  skills: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    company: "HodoLabs Technologies Pvt. Ltd.",
    location: "Madurai, Tamil Nadu",
    role: "Digital Marketing & Technical SEO Intern",
    period: "Jun 2026 – Present",
    type: "Internship",
    highlights: [
      "Conduct in-depth technical SEO audits, site speed & PageSpeed analysis, and architectural optimizations across 4+ client websites.",
      "Completed comprehensive Phase 2 SEO audits for ZabConnect and NRI Shipping, documenting technical crawlability, content relevance, metadata, and internal link structure improvements.",
      "Managed Google Business Profiles and maintained structured issue-tracking spreadsheets to prioritize technical remediation and reporting."
    ],
    skills: ["Technical SEO", "PageSpeed Analysis", "Site Architecture", "Google Business Profile", "Reporting & Analytics"]
  },
  {
    company: "HodoLabs Technologies Pvt. Ltd.",
    location: "Madurai, Tamil Nadu",
    role: "Web Development & Software Engineering Trainee",
    period: "May 2026 – Jun 2026",
    type: "Trainee",
    highlights: [
      "Completed an intensive software engineering program spanning frontend and backend architecture, software patterns, and Git version control.",
      "Delivered project-based engineering assignments adhering to responsive design standards and accessible semantic code."
    ],
    skills: ["Full Stack Development", "Git & GitHub", "Software Engineering", "REST APIs", "Responsive UI"]
  }
];

export interface HonorAward {
  title: string;
  event: string;
  organizer: string;
  date: string;
  badge: string;
  desc: string;
  linkedinUrl?: string;
  image?: string;
}

export const HONORS_AND_AWARDS: HonorAward[] = [
  {
    title: "Overall Champion",
    event: "AIxcelerate 2026 Multidisciplinary AI Innovation Hackathon",
    organizer: "Dhanalakshmi Srinivasan University",
    date: "September 2026",
    badge: "🏆 1st Place",
    desc: "Led Team NelSync AI to 1st place overall with 'Smart Paddy Procurement Optimization' — an AI-driven agricultural supply chain forecasting platform.",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari"
  },
  {
    title: "1st Place Winner",
    event: "Technical Quiz Event — BOOTFEST-2K26",
    organizer: "Inter-Collegiate Technical Festival",
    date: "2026",
    badge: "🥇 Winner",
    desc: "Won first place in advanced computer science, algorithms, AI concepts, and software engineering quiz competition.",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari"
  },
  {
    title: "Runner-up (2nd Place)",
    event: "Capture The Flag (CTF) Cybersecurity Challenge — BOOTFEST-2K26",
    organizer: "Inter-Collegiate Technical Festival",
    date: "2026",
    badge: "🥈 Runner-up",
    desc: "Competed in offensive security, binary exploitation, web vulnerabilities, and reverse engineering challenges.",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari"
  },
  {
    title: "1st Place Winner",
    event: "Inter-Departmental Technical Competition — Achievers' Day",
    organizer: "St. Joseph's College (Autonomous)",
    date: "2026",
    badge: "🥇 1st Place",
    desc: "Awarded top honors for technical design and software presentation among competing postgraduate STEM departments.",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari"
  },
  {
    title: "Lead Event Organizer",
    event: "'Treasure Titans' Technical Event — AION 2K26 Technical Symposium",
    organizer: "Department of AI, St. Joseph's College",
    date: "2026",
    badge: "🎯 Leadership",
    desc: "Orchestrated algorithmic puzzle design, participant coordination, and live event management for 100+ attendees.",
    linkedinUrl: "https://www.linkedin.com/in/sahaya-savari"
  }
];

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  grade?: string;
  focus: string;
}

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    degree: "M.Sc. Artificial Intelligence",
    institution: "St. Joseph's College (Autonomous), Tiruchirappalli",
    period: "2025 – Present",
    grade: "Pursuing",
    focus: "Machine Learning, Deep Learning Architectures, Neural Networks, Python APIs & Natural Language Processing."
  },
  {
    degree: "B.Sc. Data Science",
    institution: "Thiagarajar College, Madurai",
    period: "2022 – 2025",
    grade: "65.06%",
    focus: "Statistics, Probability, Linear Algebra, Machine Learning Fundamentals, SQL Database Systems & Data Modeling."
  }
];

export const STATS = [
  ['M.Sc', 'Artificial Intelligence'],
  ['B.Sc', 'Data Science (65%)'],
  ['🏆 #1', 'AI Hackathon Champion'],
  ['4+', 'Client Technical Audits']
];

export const CERTIFICATIONS = [
  { 
    icon: 'database', 
    title: 'Data Analytics', 
    items: [{ name: "IBM Data Analyst Course" }] 
  },
  { 
    icon: 'code', 
    title: 'Information Technology', 
    items: [{ name: "Honours Diploma in Information Technology" }] 
  },
  { 
    icon: 'brain', 
    title: 'Business Intelligence', 
    items: [{ name: "Mastering Excel Data Analysis & Dashboard Reporting" }] 
  }
];


