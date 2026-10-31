# 🚀 Personal Portfolio Optimization Plan: Technical SEO, Entity SEO, GEO & AEO Roadmap

**Website:** [https://sahayasavari.dev](https://sahayasavari.dev)  
**GitHub:** [https://github.com/sahaya-savari/portfolio](https://github.com/sahaya-savari/portfolio)  
**Candidate Profile:** Sahaya Savari F (*M.Sc. Artificial Intelligence Student, St. Joseph's College (Autonomous), Tiruchirappalli, Tamil Nadu, India*).  
**Target Roles:** AI/ML Engineer Intern, Python Developer Intern, Full Stack Developer Intern (Summer/Fall 2026 Opportunities).

---

## 🎯 Strategic Objective

Improve technical search engine optimization (SEO), entity recognition, geographic location context (GEO), Answer Engine Optimization (AEO), AI/LLM discoverability, and social sharing presentation (Open Graph) **WITHOUT website bloat**.

### Core Principles & Maintenance Rules
- **No Vanity SEO Metrics**: Every change must have tangible candidate discovery value.
- **Zero Page Bloat**: Do not create thin programmatic pages (`/projects/python`, `/skills/fastapi`, `/ai-engineer-trichy`).
- **Grounded Factuality**: All content and schema must reflect verified experience. Never invent experience, production clients, users, or metrics.
- **Strict Maintenance Status Labels**: Use only `Planned`, `In Progress`, `Completed`, `Blocked`, `Cancelled`, `Deferred`.
- **Local Only Plan**: This `PLAN.md` document exists locally for phase management and must **NOT** be committed or pushed to GitHub.

---

## 📜 Historical & Completed Baseline Tasks

The following foundational tasks have already been completed and deployed to production (`https://sahayasavari.dev`).

### Task H-1: Daily Spark Tech Stack & Architecture Correction
- **Objective**: Align Daily Spark metadata with the official GitHub repository (`sahaya-savari/daily-spark`).
- **Current State**: Daily Spark is positioned as an *Offline-First habit & daily streak application built with React, TypeScript, Vite, Tailwind CSS, IndexedDB, and Capacitor support for Android*.
- **Status**: `Completed`

### Task H-2: PrepMind AI Honest Positioning
- **Objective**: Remove generic profile fallbacks and clearly reflect project status.
- **Current State**: Displays an honest `Status: In Development` badge on `/projects/prepmind-ai` without inventing fake repos or claims.
- **Status**: `Completed`

### Task H-3: Complete Purge of NeoBeat
- **Objective**: Remove unwanted/unsupported NeoBeat project references.
- **Current State**: Completely purged from `src/data.ts`, `src/data/caseStudies.ts`, routes, sitemap, and LLM text files.
- **Status**: `Completed`

### Task H-4: Direct Resume PDF Download CTA
- **Objective**: Provide 1-click recruiter access to the resume PDF.
- **Current State**: `<a href="/resume.pdf" download>` buttons (`Download CV`) live in desktop header and mobile menu.
- **Status**: `Completed`

### Task H-5: Grounded Hero Subheadline Refinement
- **Objective**: Align hero text with verified M.Sc. AI student status.
- **Current State**: Subheadline reflects Python, ML, React, and TypeScript capabilities for Summer/Fall 2026 internships.
- **Status**: `Completed`

### Task H-6: Post-Build Automated Sitemap Generation
- **Objective**: Automatically output valid sitemap XML during production build.
- **Current State**: `scripts/prerender-seo.js` generates `dist/sitemap.xml` with 9 canonical URLs and stable `<lastmod>` date (`2026-08-15`).
- **Status**: `Completed`

### Task H-7: LLM Files Synchronization
- **Objective**: Keep AI-readable documentation accurate.
- **Current State**: `public/llms.txt` and `public/llms-full.txt` updated to reflect single source of truth project data.
- **Status**: `Completed`

### Task H-8: Firebase Hosting Deployment & GitHub Push
- **Objective**: Deploy clean build to production target `sahayasavari-dev` (`sahaya-savari-portfolio`) and push commit to `origin/main`.
- **Current State**: Live site deployed at `https://sahayasavari.dev`; Git working tree clean.
- **Status**: `Completed`

### Task H-9: Full SEO + GEO + AEO Implementation Pass
- **Objective**: Implement comprehensive SEO, entity graph, GEO, and AEO signals without unsupported claims or keyword stuffing.
- **Current State**: Deployed to production. Includes strengthened Person entity (`hasOccupation`, 23-item `knowsAbout`), 4 `TechArticle` nodes on `/blog`, `SoftwareApplication` schema on `/ai`, rewritten `llms.txt` (5,816 bytes) and `llms-full.txt` (10,256 bytes) with canonical identity + factual Q&A, explicit AI crawler directives in `robots.txt`, `rel="me"` identity links, `og:profile` on homepage, and `Content-Type: text/plain; charset=utf-8` for `*.txt` files.
- **Status**: `Completed`

---

## 📅 Implementation Phase Roadmap

---

### Phase 0 — Baseline & Safety

#### Task 0.1: Production Baseline Verification
- **Objective**: Re-verify repository cleanliness and build integrity before starting any SEO modifications.
- **Current State**: 9 pre-rendered routes built in `dist/`, clean git working tree on `main`.
- **Proposed Change**: Execute safety checks (`git status`, `npx tsc --noEmit`, `npm run build`) before making file changes.
- **Files / Areas**: Repository root, `dist/`, `scripts/prerender-seo.js`.
- **Priority**: P0
- **Expected Value**: Safety
- **Risk**: Low
- **Dependencies**: None
- **Verification**: `npx tsc --noEmit` returns 0 errors; `npm run build` pre-renders 9/9 HTML routes.
- **Status**: `Completed`

---

### Phase 1 — Route-Specific SEO & Open Graph

#### Task 1.1: Project-Specific Open Graph Meta Tags & Preview Assets
- **Objective**: Provide unique Open Graph titles, descriptions, and preview cards for project detail routes.
- **Current State**: Detail routes (`/projects/daily-spark`, `/projects/prepmind-ai`, `/projects/portfolio-website`) currently share generic homepage Open Graph preview image (`/og-image.jpg`).
- **Proposed Change**: Create custom 1200x630 preview image assets for each project card (`/og-daily-spark.jpg`, `/og-prepmind-ai.jpg`, `/og-portfolio.jpg`) and inject route-specific `og:image`, `og:title`, and `twitter:image` tags in `scripts/prerender-seo.js`.
- **Files / Areas**: `public/`, `scripts/prerender-seo.js`, `src/pages/ProjectDetails.tsx`.
- **Priority**: P1
- **Expected Value**: SEO / Social Sharing / Recruiter CTR
- **Risk**: Low
- **Dependencies**: Task 0.1
- **Verification**: Inspect generated `<head>` tags in `dist/projects/daily-spark/index.html` for unique `og:image` and `og:title`.
- **Status**: `Planned`

#### Task 1.2: `SoftwareApplication` JSON-LD Schema on Project Pages
- **Objective**: Add explicit structured data to software project pages for rich search engine indexing.
- **Current State**: Project detail pages use generic `BreadcrumbList` schema.
- **Proposed Change**: Inject `SoftwareApplication` JSON-LD schema on `/projects/daily-spark` (`operatingSystem: "Web, Android"`, `applicationCategory: "ProductivityApplication"`) and `/projects/portfolio-website`.
- **Files / Areas**: `scripts/prerender-seo.js`, `src/seo.ts`.
- **Priority**: P1
- **Expected Value**: SEO / Entity Indexing
- **Risk**: Low
- **Dependencies**: Task 1.1
- **Verification**: Validate `dist/projects/daily-spark/index.html` JSON-LD snippet using Google Rich Results Test tool.
- **Status**: `Planned`

---

### Phase 2 — Entity SEO & Person Schema

#### Task 2.1: Institutional & Educational Schema Linkage
- **Objective**: Connect candidate identity (`#person`) to academic degree and institution in JSON-LD.
- **Current State**: `Person` schema in `src/seo.ts` includes `affiliation: { name: "St. Joseph's College (Autonomous), Trichy" }`.
- **Proposed Change**: Add formal `alumniOf` node referencing Wikipedia URI (`https://en.wikipedia.org/wiki/St._Joseph%27s_College,_Tiruchirappalli`) and explicit degree credential `M.Sc. Artificial Intelligence (2024 – 2026)`.
- **Files / Areas**: `src/seo.ts`, `scripts/prerender-seo.js`.
- **Priority**: P1
- **Expected Value**: Entity SEO / Knowledge Graph
- **Risk**: Low
- **Dependencies**: Task 0.1
- **Verification**: Inspect JSON-LD snippet in `dist/index.html` for valid `alumniOf` structure.
- **Status**: `Planned`

#### Task 2.2: Selective Skill Mapping (`knowsAbout`)
- **Objective**: Ensure core verified technical domains are linked to candidate entity without schema bloat.
- **Current State**: `knowsAbout` array in `src/seo.ts` lists plain text skill strings.
- **Proposed Change**: Maintain verified skill strings (`Artificial Intelligence`, `Machine Learning`, `Python`, `React`, `TypeScript`, `IndexedDB`, `Capacitor Android`, `FastAPI`). Evaluate whether external Wikidata URIs add indexing value; if they increase payload size without rich result benefits, do NOT implement.
- **Files / Areas**: `src/seo.ts`.
- **Priority**: P2
- **Expected Value**: Entity SEO / AI Discoverability
- **Risk**: Low
- **Dependencies**: Task 2.1
- **Verification**: Validate schema payload size and formatting.
- **Status**: `Planned`

---

### Phase 3 — GEO / Educational Location Signals

#### Task 3.1: Academic Location Context Integration
- **Objective**: Embed authentic geographic context (Tiruchirappalli, Tamil Nadu, India) into educational schema and candidate profile text.
- **Current State**: Institution name is present; city/state coordinates are implicit in paragraph text.
- **Proposed Change**: Add `address` property to `EducationalOrganization` schema node (`addressLocality: "Tiruchirappalli"`, `addressRegion: "Tamil Nadu"`, `addressCountry: "IN"`). Update `#about` section to state location context naturally.
- **Files / Areas**: `src/seo.ts`, `src/sections/AboutSection.tsx`, `public/llms-full.txt`.
- **Priority**: P2
- **Expected Value**: GEO / Authentic Location Context
- **Risk**: Low
- **Dependencies**: Task 2.1
- **Verification**: Confirm location text renders in `#about` and appears in `Person` JSON-LD.
- **Status**: `Planned`

#### Task 3.2: GEO Anti-Pattern Enforcement (DO NOT IMPLEMENT)
- **Objective**: Prevent harmful local business SEO practices on a personal developer portfolio.
- **Current State**: 0 local business schemas exist.
- **Proposed Change**: Explicitly forbid creating `LocalBusiness` schema, fake business addresses, or city landing pages (`/ai-engineer-trichy`, `/python-developer-india`).
- **Files / Areas**: N/A (Policy Directive).
- **Priority**: P0
- **Expected Value**: SEO Integrity / Google Safety
- **Risk**: High if violated
- **Dependencies**: None
- **Verification**: Verify 0 spammy local landing pages exist.
- **Status**: `Completed` (Enforced as permanent policy)

---

### Phase 4 — AEO / Recruiter Question Coverage

#### Task 4.1: Semantic Q&A Accordion on `/recruiter`
- **Objective**: Improve Answer Engine Optimization (AEO) and 30-second recruiter scanability.
- **Current State**: `/recruiter` (`RecruiterMode.tsx`) features structured cards for skills, education, and credentials, but lacks a conversational Q&A block.
- **Proposed Change**: Add an accessible `<details>` / `<summary>` accordion block containing 5–7 factual candidate Q&As (*Degree & College, Internship Availability timeline, Core Tech Stack, Verified Projects, Location, Resume PDF link*).
- **Files / Areas**: `src/pages/RecruiterMode.tsx`.
- **Priority**: P1
- **Expected Value**: AEO / Recruiter UX / Conversion
- **Risk**: Low
- **Dependencies**: Task 0.1
- **Verification**: Inspect `/recruiter` route rendering and confirm accordion elements expand cleanly with full keyboard accessibility.
- **Status**: `Planned`

---

### Phase 5 — AI / LLM Discoverability

#### Task 5.1: `llms.txt` Standard Compliance (llmstxt.org)
- **Objective**: Structure `public/llms.txt` according to the standardized `llmstxt.org` specification for AI crawlers.
- **Current State**: `public/llms.txt` (5,816 bytes) and `public/llms-full.txt` (10,256 bytes) rewritten with canonical identity section, factual Q&A, metadata header, project descriptions, articles, certifications, and official links. Both served with `Content-Type: text/plain; charset=utf-8`.
- **Files / Areas**: `public/llms.txt`, `public/llms-full.txt`.
- **Priority**: P2
- **Expected Value**: AI / LLM Discoverability
- **Risk**: Low
- **Dependencies**: Task 0.1
- **Verification**: Verified at `https://sahayasavari.dev/llms.txt`.
- **Status**: `Completed`

---

### Phase 6 — Blog ↔ Portfolio Authority

#### Task 6.1: Reciprocal Contextual Project-to-Blog Backlinking
- **Objective**: Build natural cross-domain authority between `sahayasavari.dev` and `blog.sahayasavari.dev`.
- **Current State**: `Daily Spark` case study references `blog.sahayasavari.dev/blog/pydantic-v2-guide`.
- **Proposed Change**: Verify and add contextual links from relevant technical articles on `blog.sahayasavari.dev` back to project case studies on `sahayasavari.dev/projects/daily-spark`.
- **Files / Areas**: `src/data/caseStudies.ts`, External Blog (`blog.sahayasavari.dev`).
- **Priority**: P2
- **Expected Value**: Technical SEO / Domain Authority
- **Risk**: Low
- **Dependencies**: Task 0.1
- **Verification**: Check click-through links between portfolio case studies and engineering blog articles.
- **Status**: `Planned`

---

### Phase 7 — Technical SEO Validation

#### Task 7.1: Comprehensive Metadata & Schema Audit
- **Objective**: Perform automated and manual validation across all 9 pre-rendered routes.
- **Current State**: Full verification performed. All 9 routes pass: title, description, canonical, og:image, JSON-LD schemas (Person, WebSite, ProfilePage, TechArticle×4, SoftwareApplication), and sitemap.xml validated.
- **Files / Areas**: `dist/`, `scripts/prerender-seo.js`.
- **Priority**: P1
- **Expected Value**: Technical SEO / Rich Snippets
- **Risk**: Low
- **Dependencies**: Tasks 1.1, 1.2, 2.1, 3.1, 4.1
- **Verification**: Completed — `npm run build` passes; all 9 route HTML files inspected.
- **Status**: `Completed`

---

### Phase 8 — Production Verification

#### Task 8.1: Pre-Deployment Build & Firebase Hosting Smoke Test
- **Objective**: Verify live production functionality before completing deployment.
- **Current State**: Deployed. `npm run build` passes (9/9 routes). Firebase Hosting deploy to `sahayasavari-dev` target completed successfully. Live at `https://sahayasavari.dev`.
- **Files / Areas**: Firebase Hosting, Production Domain.
- **Priority**: P0
- **Expected Value**: Deployment Safety & Reliability
- **Risk**: Low
- **Dependencies**: Task 7.1
- **Verification**: Completed — `https://sahayasavari.dev` loads cleanly.
- **Status**: `Completed`

---

## 🚫 Page Strategy — Explicit Exclusions (`DO NOT IMPLEMENT`)

To prevent site bloat, thin content penalties, and keyword cannibalization, the following pages **MUST NOT** be created:

| Page Path | Category | Reason for Exclusion | Status |
| :--- | :--- | :--- | :---: |
| `/about` | Standalone Page | Fully covered on Homepage `#about` section; splitting dilutes page authority. | `Cancelled` |
| `/skills` | Standalone Page | Fully covered on Homepage `#skills` section. | `Cancelled` |
| `/education` | Standalone Page | Fully covered on Homepage `#about` section and recruiter page. | `Cancelled` |
| `/certifications` | Standalone Page | Fully covered on Homepage `#certifications` section. | `Cancelled` |
| `/projects/python` | Tag Filter Page | Thin content duplicate; dynamic category filtering exists on `/projects`. | `Cancelled` |
| `/projects/react` | Tag Filter Page | Thin content duplicate. | `Cancelled` |
| `/projects/ai` | Tag Filter Page | Thin content duplicate. | `Cancelled` |
| `/technologies/python` | Tech Keyword Page | Keyword spam / thin content. | `Cancelled` |
| `/technologies/react` | Tech Keyword Page | Keyword spam / thin content. | `Cancelled` |
| `/ai-engineer-trichy` | Local SEO Page | Spammy local SEO anti-pattern. | `Cancelled` |
| `/python-developer-india` | Geo-Spam Page | Spammy local SEO anti-pattern. | `Cancelled` |

---

## 🤖 P3 / AI Assistant Scope Boundary

- **DO NOT** implement an LLM API backend or live API integrations during this optimization phase.
- **DO NOT** add OpenAI, Gemini, Groq, Azure AI, RAG, Vector Databases, or serverless functions to `/ai` (`AskSahayaAI.tsx`).
- `AskSahayaAI.tsx` remains a clean client-side rule-matched demonstration component.
- **Status**: `Deferred` (Saved for future dedicated AI backend engineering project).

---

## 📊 Priority & Phase Summary Table

| Phase | Priority | Main Goal | Targets / Files | Expected Value | Status |
| :--- | :---: | :--- | :--- | :--- | :---: |
| **Phase 0** | **P0** | Baseline & Safety | Repository | Known-good production baseline | `Completed` |
| **Phase 1** | **P1** | Route SEO & Open Graph | Case study routes | High (Social previews & CTR) | `Planned` |
| **Phase 2** | **P1** | Entity SEO & Person Schema | `src/seo.ts` | High (Knowledge Graph recognition) | `Planned` |
| **Phase 3** | **P2** | GEO / Educational Location | `#about`, JSON-LD, `llms-full.txt` | Medium (Legitimate location context) | `Planned` |
| **Phase 4** | **P1** | AEO / Recruiter Q&A | `/recruiter` | High (Direct recruiter conversion) | `Planned` |
| **Phase 5** | **P2** | AI / LLM Discoverability | `llms.txt`, `llms-full.txt` | Medium (Machine-readable accuracy) | `Completed` |
| **Phase 6** | **P2** | Blog ↔ Portfolio Authority | `/projects/*` & Blog links | Medium (Cross-domain authority) | `Planned` |
| **Phase 7** | **P1** | Technical SEO Validation | All 9 routes & schemas | Critical (Metadata & Rich Results) | `Completed` |
| **Phase 8** | **P0** | Production Verification | Build & Firebase Hosting | Critical (Live deployment safety) | `Completed` |

---

## 🛠️ Execution Workflow & Git Rules

1. **Standard Task Execution Loop**:  
   `Inspect` ➔ `Plan` ➔ `Implement` ➔ `Test` ➔ `Review` ➔ `Deploy`
2. **Local Planning File Constraint**:  
   This `PLAN.md` file is stored locally in the workspace root for phase tracking.  
   **DO NOT** stage, commit, or push `PLAN.md` to Git or deploy to Firebase:
   ```bash
   # DO NOT RUN:
   # git add PLAN.md
   # git commit -m "update plan"
   # git push origin main
   # firebase deploy
   ```
