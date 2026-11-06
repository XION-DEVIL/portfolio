export interface RelatedArticle {
  title: string;
  url: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  seoTitle?: string;
  tagline: string;
  overview: string;
  problem: string;
  goals: string[];
  solution: string;
  architecture: string;
  techStack: string[];
  challenges: string[];
  lessons: string[];
  demoUrl?: string;
  githubUrl?: string;
  statusBadge?: string;
  image?: string;
  relatedArticle?: RelatedArticle;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "nelsync-ai": {
    id: "nelsync-ai",
    title: "NelSync AI",
    seoTitle: "NelSync AI | AIxcelerate 2026 Champion Project | Sahaya Savari",
    tagline: "Overall Champion at AIxcelerate 2026 Hackathon",
    image:
      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=1000&auto=format&fit=crop&q=80",
    overview:
      "NelSync AI is an AI-driven agricultural supply-chain optimization system built by Team NelSync AI, winning 1st Place Overall Champion at the AIxcelerate 2026 Multidisciplinary AI Innovation Hackathon at Dhanalakshmi Srinivasan University.",
    problem:
      "Paddy grain procurement in agricultural belts suffers from unpredictable seasonal supply, procurement center congestion, and lack of real-time predictive scheduling.",
    goals: [
      "Build a predictive ML model for regional grain yield and procurement volume forecasting.",
      "Optimize delivery queues and procurement station scheduling.",
      "Provide intuitive visual dashboards for farmers and procurement officers.",
    ],
    solution:
      "Designed an integrated Python data science pipeline that analyzes seasonal weather, historical yield, and transit times to forecast arrivals and balance procurement workloads dynamically.",
    architecture:
      "Python-based analytics engine with scikit-learn predictive models and interactive dashboard interface for monitoring procurement trends.",
    techStack: [
      "Python",
      "Machine Learning",
      "Scikit-Learn",
      "Pandas",
      "Data Modeling",
      "Streamlit / Analytics",
    ],
    challenges: [
      "Training accurate regression and forecasting models under strict 36-hour hackathon time limits.",
      "Balancing multi-stakeholder priorities between ground farmers and regional storage facilities.",
    ],
    lessons: [
      "Rapid prototype validation and domain-specific feature engineering drive hackathon success.",
      "Communicating technical AI models clearly to interdisciplinary judging panels is critical.",
    ],
    demoUrl: "https://drive.google.com/file/d/1rRhYHPqLeM1Q-yKeuZ8BuC9c1ds2WG5Q/view",
    statusBadge: "🏆 1st Place Overall Champion — AIxcelerate 2026",
  },
  "prepmind-ai": {
    id: "prepmind-ai",
    title: "PrepMind AI",
    statusBadge: "Status: In Development",
    seoTitle: "PrepMind AI | AI Interview Prep Platform Concept | Sahaya Savari",
    tagline: "AI-Powered Interview Preparation Platform (In Development)",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&auto=format&fit=crop&q=80",
    overview:
      "PrepMind AI is an in-development architectural concept for an interview preparation platform designed to leverage LLM pipelines to simulate realistic technical interviews and provide structured evaluation.",
    problem:
      "Candidates often lack accessible environments to practice technical interviews with structured rubric-based feedback.",
    goals: [
      "Design a low-latency AI interviewer pipeline.",
      "Support dynamic questioning based on candidate responses.",
      "Provide actionable, structured feedback using rubrics.",
    ],
    solution:
      "Designing a React frontend interfacing with a Python/FastAPI backend to orchestrate LLM pipelines with context injection and rubric-based evaluation.",
    architecture:
      "Conceptual architecture: Frontend interfaces with API endpoints. Backend manages interview state, injects interview context into LLM prompt pipelines, and formats structured rubric evaluations.",
    techStack: ["Python", "FastAPI", "LLMs", "React", "TypeScript", "Tailwind CSS"],
    challenges: [
      "Managing LLM hallucination and keeping responses grounded via strict system prompts.",
      "Designing low-latency streaming pipelines for interactive multi-turn interview sessions.",
    ],
    lessons: [
      "Structuring LLM output schemas into predictable JSON formats for frontend consumption.",
      "Designing clean state management for multi-turn conversational AI workflows.",
    ],
    relatedArticle: {
      title: "Building Autonomous AI Agents from Scratch in Async Python",
      url: "https://blog.sahayasavari.dev/blog/ai-agents-from-scratch",
    },
  },
  "daily-spark": {
    id: "daily-spark",
    title: "Daily Spark",
    tagline: "Minimalist Offline Habit Tracker",
    image:
      "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1000&auto=format&fit=crop&q=80",
    overview:
      "A privacy-first, local-storage based habit tracking application designed to help users build consistent routines without the clutter of traditional productivity tools.",
    problem:
      "Existing habit trackers are often bloated with social features, notifications, and require constant internet connectivity.",
    goals: [
      "Design a beautiful, distraction-free UI.",
      "Ensure 100% offline functionality.",
      "Provide insightful data visualization for habit streaks.",
    ],
    solution:
      "Developed an offline-first habit tracking Progressive Web App (PWA) using React, Vite, and Tailwind CSS with Capacitor support for native Android builds. Implemented client-side state management for offline data persistence using IndexedDB and Context API.",
    architecture:
      "A client-heavy, offline-first architecture where all habit logs and streak logic run locally on the device. Capacitor provides native Android bridge integration.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "IndexedDB", "Capacitor Android"],
    challenges: [
      "Handling date-time logic across different timezones without a backend.",
      "Creating smooth micro-animations that don't degrade performance on mobile devices.",
    ],
    lessons: [
      "Deepened understanding of client-side storage limitations and optimization.",
      "Improved accessible design practices, ensuring full keyboard navigability.",
    ],
    githubUrl: "https://github.com/sahaya-savari/daily-spark",
    demoUrl: "https://daily-spark-app-da74b.web.app",
    relatedArticle: {
      title: "Pydantic V2 Deep Dive: Validation, Custom Serialization & Core Architecture",
      url: "https://blog.sahayasavari.dev/blog/pydantic-v2-guide",
    },
  },
  "portfolio-website": {
    id: "portfolio-website",
    title: "Portfolio Website",
    seoTitle: "Portfolio Architecture & Engineering | Sahaya Savari",
    tagline: "High-Performance SPA Portfolio",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1000&auto=format&fit=crop&q=80",
    overview:
      "A masterclass in modern frontend development, this portfolio leverages Framer Motion for liquid-smooth animations and hardware-accelerated transitions. It features a custom glassmorphism design system, responsive grids, and an isolated state architecture for maximum performance.",
    problem:
      "Standard portfolios fail to communicate the technical depth and design sensibility of a modern AI Engineer and Full Stack Developer.",
    goals: [
      "Achieve sub-second load times despite heavy animations.",
      "Implement an accessible, keyboard-navigable SPA architecture.",
      "Showcase modern React features and Vite optimizations.",
    ],
    solution:
      "Built a Single Page Application using React and Vite, optimizing chunk size and asset loading. Replaced traditional routing with lazy-loaded section components for immediate perceived performance.",
    architecture:
      "Framer Motion orchestrates page-level transitions and micro-interactions. A custom pixel-canvas engine powers the background effects. HLS is used for optimized video streaming.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vite", "Firebase Hosting"],
    challenges: [
      "Achieving 60fps glassmorphism and spring animations without causing layout thrashing on mobile devices.",
      "Configuring Vite and Firebase for perfect SEO and canonical routing in a pure SPA.",
    ],
    lessons: [
      "Using absolute DOM offset measurements resolves critical layout bugs in complex Framer Motion tracks.",
      "Manual Vite chunk splitting and IntersectionObserver-based lazy loading are essential for modern media-heavy web apps.",
    ],
    githubUrl: "https://github.com/sahaya-savari/portfolio",
    demoUrl: "https://sahayasavari.dev",
    relatedArticle: {
      title: "Tailwind CSS v4 Guide: Oxide Engine, @theme Directive & Dynamic Utilities",
      url: "https://blog.sahayasavari.dev/blog/tailwind-css-v4-guide",
    },
  },
};
