# Portfolio Project Documentation

## 1. Project Overview

- **Project Purpose**: Personal portfolio, ATS recruiter hub, interactive case study showcase, technical blog portal, and search/AI discoverability engine for **Sahaya Savari F** (AI Engineer, Python Developer, Full Stack Developer, M.Sc. Artificial Intelligence Student).
- **Current Production Status**: Completed and live in production. Static pre-rendering pipeline is fully functional across 9 public routes.
- **Main Technologies**: React 19 (`19.2.3`), TypeScript (`5.9.3`), Vite (`7.2.4`), React Router v7 (`7.18.1`), Tailwind CSS v4 (`4.1.17`), Framer Motion (`12.38.0`), GSAP (`3.15.0`), HLS.js (`1.6.15`), OGL (`1.0.11`), React-PDF (`10.4.1`), Firebase Hosting CDN, GitHub Pages.
- **Repository**: [https://github.com/sahaya-savari/portfolio](https://github.com/sahaya-savari/portfolio)
- **Production URL**: [https://sahayasavari.dev](https://sahayasavari.dev)

---

## 2. Technology Stack

### Frontend Framework & Language

- **React 19** (`19.2.3`): UI component hierarchy with concurrent rendering features.
- **TypeScript** (`5.9.3`): Static typing and schema interfaces.
- **React Router v7** (`^7.18.1`): `BrowserRouter` for client-side navigation; `MemoryRouter` for server-side static pre-rendering.

### Build Tools & Pre-rendering Pipeline

- **Vite 7** (`7.2.4`): Next-generation HMR dev server and ES module bundler.
- **Node ES Modules** (`"type": "module"` in `package.json`).
- **Static Pre-renderer** (`scripts/prerender-seo.js`): Node.js post-build script leveraging `react-dom/server` to pre-render route components into 9 static HTML files.

### Styling & Design System

- **Tailwind CSS v4** (`4.1.17`): Utility-first CSS framework integrated via `@tailwindcss/vite` plugin.
- **Custom Glassmorphism Utilities**: Defined in `src/index.css` (`.glass-card`, `.liquid-glass`, `.liquid-glass-strong`).
- **Self-hosted Fonts**: Custom WOFF2 fonts stored in `/fonts/` to eliminate third-party render-blocking font requests.

### Libraries & Utilities

- **Framer Motion** (`^12.38.0`): Motion animations loaded asynchronously via `LazyMotion` and `domAnimation`.
- **GSAP** (`^3.15.0`): Micro-interactions and high-performance timeline animations.
- **Lucide React** (`^0.577.0`): Tree-shakeable SVG icon library.
- **HLS.js** (`^1.6.15`): HTTP Live Streaming for hero section video playback with lazy initialization.
- **OGL** (`^1.0.11`): High-performance WebGL library for interactive background effects.
- **React-PDF / PDF.js** (`^10.4.1`): In-app resume viewing modal.
- **React Helmet Async** (`^3.0.0`): Dynamic `<head>` tag management during client rendering and static pre-rendering.

### Hosting & Infrastructure

- **Firebase Hosting**: Edge CDN hosting with strict security headers, cache policies, and clean URL rewrites.
- **GitHub Pages**: Secondary automated static hosting target via GitHub Actions workflow (`.github/workflows/deploy.yml`).

---

## 3. Project Structure

```text
portfolio/
├── public/                 # Static public assets
│   ├── favicon.png         # Site favicon
│   ├── fonts/              # Self-hosted WOFF2 fonts (LH-4 optimization)
│   ├── llms.txt            # Structured markdown overview for LLM crawlers (2.8 KB)
│   ├── llms-full.txt       # Extended technical reference for LLMs (4.7 KB)
│   ├── manifest.json       # Web application manifest
│   ├── og-image.jpg        # Open Graph / Social preview card image
│   ├── resume.pdf          # Downloadable CV document
│   ├── robots.txt          # Search engine crawler permissions & sitemap reference
│   └── sitemap.xml         # XML Sitemap covering all 9 pre-rendered routes
├── scripts/
│   └── prerender-seo.js    # SSR static HTML pre-rendering build script
├── src/
│   ├── components/         # Reusable UI components & performance wrappers
│   │   ├── BlurText.tsx            # Animated blur text (CLS-2 fix)
│   │   ├── ClickSpark.tsx          # Interactive cursor click sparks (CLS-5 fix)
│   │   ├── CommandPalette.tsx      # Keyboard shortcut command search modal (Cmd+K / Ctrl+K)
│   │   ├── DevDashboard.tsx        # Developer metrics dashboard widget
│   │   ├── ErrorBoundary.tsx       # Fallback UI for runtime errors
│   │   ├── FocusText.tsx           # Interactive text focus component (CLS-4 & INP-1 fix)
│   │   ├── HlsVideo.tsx            # Lazily loaded HLS video player (CLS-6 & INP-6 fix)
│   │   ├── IntersectionLazy.tsx    # IntersectionObserver viewport lazy wrapper (CLS-1 fix)
│   │   ├── ResumeViewer.tsx        # In-app PDF resume modal with zoom & download
│   │   ├── RotatingText.tsx        # Hero role rotator (CLS-3 & INP-2 fix)
│   │   ├── SEOHead.tsx             # React Helmet metadata injection wrapper
│   │   └── SkillsMatrix.tsx        # Filterable skills matrix grid
│   ├── data/               # Pure static data modules
│   │   └── data.ts         # Centralized project case studies, metrics, articles, skills
│   ├── layouts/
│   │   └── RootLayout.tsx  # Global layout with navigation bar, footer, search, resume modal
│   ├── pages/              # Top-level route components
│   │   ├── AskSahayaAI.tsx         # Interactive AI assistant showcase page (/ai)
│   │   ├── BlogPage.tsx            # Engineering articles directory (/blog)
│   │   ├── HomePage.tsx            # Main portfolio homepage (/)
│   │   ├── NotFound.tsx            # Custom 404 page (*)
│   │   ├── ProjectDetails.tsx      # Case study detail template (/projects/:projectId)
│   │   ├── ProjectsPage.tsx         # Full project directory (/projects)
│   │   ├── RecruiterMode.tsx       # ATS-friendly recruiter summary (/recruiter)
│   │   └── ResumePage.tsx          # Dedicated resume page (/resume)
│   ├── sections/           # Homepage modular sections
│   │   ├── AboutSection.tsx        # Personal overview & education background
│   │   ├── BlogSection.tsx         # Featured technical writings grid
│   │   ├── CareerGoalsSection.tsx  # Professional path & timeline
│   │   ├── CertificationsSection.tsx # Interactive credentials tab grid (INP-3 fix)
│   │   ├── ContactSection.tsx      # Direct contact form & social channels
│   │   ├── HeroSection.tsx         # Animated hero with video & position badges
│   │   ├── OpenSourceSection.tsx   # Open-source contributions & repositories
│   │   ├── ProjectsSection.tsx     # Featured project showcase cards
│   │   ├── SkillsSection.tsx       # Interactive technology skills categories
│   │   ├── StatsSection.tsx        # High-level engineering statistics counters
│   │   └── WhatIDoSection.tsx      # Core competencies summary
│   ├── App.tsx             # Client route definitions with React.lazy and Suspense
│   ├── entry-server.tsx    # React DOM server entry point for pre-rendering
│   ├── index.css           # Global Tailwind directives & glass UI utility rules
│   ├── main.tsx            # React client hydration entry point
│   └── seo.ts              # Schema.org JSON-LD definitions & metadata constants
├── .firebaserc             # Firebase target mapping (`my-portfolio-fss`)
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions deployment workflow for GitHub Pages
├── firebase.json           # Firebase Hosting configuration & security/caching headers
├── index.html              # HTML shell template with resource preloading & hero skeleton
├── package.json            # Project dependencies & build scripts
├── PROJECT.md              # Core repository source-of-truth reference document
├── README.md               # Quick-start documentation & stack overview
├── tsconfig.json           # TypeScript compilation configuration
└── vite.config.ts          # Vite build config, esbuild minification & manual chunking
```

---

## 4. Application Architecture

### Main Application Flow

1. **Initial Edge Response**: When a user or crawler requests any of the 9 public paths, Firebase Hosting CDN serves the corresponding pre-rendered static HTML file (`dist/<route>/index.html` or `dist/index.html`).
2. **Instant First Paint (FCP/LCP)**: The browser immediately renders semantic HTML body content and static inline CSS skeleton poster while downloading JavaScript bundles asynchronously.
3. **Hydration**: `src/main.tsx` initializes React 19 hydration onto `<div id="root">` using `createRoot`, `BrowserRouter`, `HelmetProvider`, and `LazyMotion`.
4. **Client-side Navigation**: Once hydrated, React Router v7 intercept links and performs client-side transitions without triggering full page reloads.

### Routing Strategy

- **Client Router**: `BrowserRouter` defined in `src/main.tsx` wrapping `<App />`.
- **Server Pre-render Router**: `MemoryRouter` inside `src/entry-server.tsx` enabling static server HTML rendering per URL path.
- **Routes Matrix**:
  - `/` — Homepage (`HomePage.tsx`)
  - `/projects` — Projects Directory (`ProjectsPage.tsx`)
  - `/projects/:projectId` — Project Case Studies (`ProjectDetails.tsx`) for `prepmind-ai`, `daily-spark`, `portfolio-website`
  - `/blog` — Technical Writings (`BlogPage.tsx`)
  - `/resume` — Interactive Resume (`ResumePage.tsx`)
  - `/recruiter` — ATS Recruiter Mode (`RecruiterMode.tsx`)
  - `/ai` — Interactive Ask Sahaya AI Showcase (`AskSahayaAI.tsx`)
  - `*` — Fallback 404 (`NotFound.tsx`)

### Data Flow

- **Decoupled Pure Data**: All project case studies, certifications, skills, and article definitions reside in `src/data.ts` as pure TypeScript objects without React or DOM dependencies.
- **Component State**: Component-level state (`useState`, `useRef`) handles UI interactions (e.g. active tabs, command palette toggle, filter selectors).

---

## 5. Production & Deployment

### Hosting Platform

- **Primary Target**: Firebase Hosting Edge CDN (Project ID: `my-portfolio-fss`, Target: `sahayasavari`).
- **Secondary Target**: GitHub Pages (via GitHub Actions workflow).

### Domain & Canonical Configuration

- **Production Domain**: `https://sahayasavari.dev`
- **Canonical Host Guard**: Inline script in `index.html` redirects non-local and non-canonical hosts automatically to `https://sahayasavari.dev`.

### Build & Pre-rendering Command

Executing `npm run build` performs a two-stage build:

1. **Client Build**: `vite build` bundles client assets into `dist/`.
2. **Pre-rendering Step**: `node scripts/prerender-seo.js` compiles `src/entry-server.tsx` to `.tmp-server/`, iterates through all 9 public routes, renders component trees via `renderToString`, strips duplicate Helmet tags from the body HTML, updates `<head>` metadata and JSON-LD schemas, writes static HTML files to `dist/<route>/index.html`, and removes `.tmp-server/`.

### Hosting Configuration (`firebase.json`)

- `public`: `dist`
- `cleanUrls`: `true`
- `trailingSlash`: `false`
- `rewrites`: Serves `/index.html` for single-page client routing fallback.

---

## 6. SEO & AI Discoverability

### Metadata Management

- **`<title>` & Description**: Dynamically configured per page via `SEOHead.tsx` and statically embedded into `<head>` during pre-rendering.
- **Canonical Tag**: Statically injected for each route (e.g. `<link rel="canonical" href="https://sahayasavari.dev/projects" />`).
- **Social Sharing Cards**: Complete Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) and Twitter Card (`twitter:card`, `twitter:title`, `twitter:image`) tags.

### Structured Data (Schema.org JSON-LD Graph)

Defined in `src/seo.ts` and pre-injected into `<head>` per route:

- **Person Entity Node**: `@id: "https://sahayasavari.dev/#person"`
  - `name`: Sahaya Savari
  - `alternateName`: Sahaya Savari F
  - `jobTitle`: AI/ML & Full Stack Developer
  - `email`: `contact@sahayasavari.dev`
  - `affiliation`: St. Joseph's College (Autonomous), Tiruchirappalli (Current M.Sc. AI student; `affiliation` used, not `alumniOf` as degree is ongoing)
  - `hasOccupation`: `Occupation` node — AI Engineer & Full Stack Developer, India
  - `knowsAbout`: 23 verified expertise terms including Artificial Intelligence, Machine Learning, Deep Learning, LLM Applications, AI Agent Architecture, Python, FastAPI, React, TypeScript, Pydantic, GitHub Actions CI/CD
  - `sameAs`: LinkedIn (`https://www.linkedin.com/in/sahaya-savari`), GitHub (`https://github.com/sahaya-savari`), Technical Blog (`https://blog.sahayasavari.dev`)
- **WebSite Entity Node**: `@id: "https://sahayasavari.dev/#website"` (links author to `#person`).
- **ProfilePage Entity Node**: `@id: "https://sahayasavari.dev/#profilepage"` (links mainEntity to `#person`).
- **Secondary Route Schemas**: `@graph` objects on `/projects`, `/blog`, `/resume`, `/recruiter`, and `/ai` referencing author/mainEntity `@id: "https://sahayasavari.dev/#person"`.
- **TechArticle Nodes** (on `/blog`): 4 `TechArticle` schema nodes for published engineering articles with `datePublished` values from `src/data.ts` and `author` referencing `#person`.
- **SoftwareApplication Node** (on `/ai`): Describes Ask Sahaya AI — `applicationCategory: "DeveloperApplication"`, `operatingSystem: "Web Browser"`, `author` referencing `#person`. No ratings, reviews, or user counts.
- **BreadcrumbList & Case Studies**: `SoftwareSourceCode` and `BreadcrumbList` schemas with contextual cross-links to published technical writing on `blog.sahayasavari.dev`.
- **Identity Links**: `<link rel="me">` tags in `index.html` and via `SEOHead.tsx` connecting `sahayasavari.dev` to GitHub and LinkedIn profiles.

### Indexing & Search Console

- **Sitemap**: `public/sitemap.xml` listing all 9 pre-rendered paths.
- **Robots File**: `public/robots.txt` granting full crawler access with explicit `Allow: /` directives for major AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, Bytespider, cohere-ai, Diffbot, YouBot, Meta-ExternalAgent). Sitemap URL reference included.
- **Google Site Verification**: Tag present in `index.html` (`google-site-verification="40dmjhvZ5HG8_rYlLkardDTyX1fC0Ux2UPGyko6eHgQ"`).

### AI Discoverability (GEO & Machine-Readable)

- `public/llms.txt` (5,816 bytes): Machine-readable markdown with canonical identity, projects, technical skills, published articles, factual Q&A, and official links for LLM indexing agents.
- `public/llms-full.txt` (10,256 bytes): Extended technical reference with metadata header, project architecture details, verifiable certification credential IDs, and factual Q&A for deep LLM retrieval.

---

## 7. Performance Optimizations

### Bundle Optimization & Manual Chunking (`vite.config.ts`)

- **Chunk Splitting**:
  - `react-pdf`: `react-pdf` / `pdfjs-dist` isolated chunk (loaded only when resume viewer modal opens).
  - `framer-motion`: Motion library chunk (loaded asynchronously via `LazyMotion`).
  - `hls`: `hls.js` video streaming chunk.
  - `ogl`: WebGL graphics shader library chunk.
  - `lucide`: SVG icon library chunk.
  - `react-vendor`: Core `react` and `react-dom` framework chunk.
- **Compiler Target**: Targeted at modern ES syntax (`['es2022', 'chrome105', 'firefox104', 'safari16']`) for smaller output.
- **Sourcemaps**: Disabled (`sourcemap: false`) to reduce overall build size by ~30%.
- **Minification**: Fast esbuild minification enabled.

### Runtime & Media Optimization

- **Lazy Module Imports**: `framer-motion` features (`domAnimation`) imported dynamically in `main.tsx`.
- **Viewport Lazy Rendering** (`IntersectionLazy.tsx`): Defers off-screen heavy sections until scrolled into view.
- **Static Poster Skeleton**: `index.html` includes an inline high-priority poster image and light static HTML skeleton to eliminate hero FCP/LCP delay before hydration.

### Edge Caching Policies (`firebase.json`)

- `index.html`: `no-cache, no-store, must-revalidate` (guarantees immediate deployment updates).
- `*.js`, `*.css`, `*.woff2`, images: `public,max-age=31536000,immutable` (1-year edge caching).
- `sitemap.xml`, `robots.txt`, `*.txt` files: `public,max-age=3600,s-maxage=3600`.
- `*.txt` plain-text files (llms.txt, llms-full.txt): served with `Content-Type: text/plain; charset=utf-8` for correct parsing by LLM crawlers.

---

## 8. Accessibility & Security

### Accessibility (a11y)

- **Semantic HTML**: Use of native `<nav>`, `<header>`, `<main>`, `<section>`, `<footer>`, `<article>`, and `<aside>` landmark elements.
- **ARIA Support**: Attributes including `aria-label`, `aria-hidden`, `aria-selected`, `aria-controls`, `role="status"`, `role="img"`, and `role="region"`.
- **Keyboard Navigation**: Skip-to-content focus link (`sr-only focus:not-sr-only`), keyboard accessibility for command palette (`Cmd+K` / `Ctrl+K`), and `Esc` key handlers for modals.
- **Screen Reader Utilities**: Loading fallback text wrapped in `sr-only` containers.

### Security Configurations (`firebase.json`)

- **Strict-Transport-Security**: `max-age=31536000; includeSubDomains`
- **X-Content-Type-Options**: `nosniff`
- **X-Frame-Options**: `DENY`
- **Referrer-Policy**: `strict-origin-when-cross-origin`
- **Permissions-Policy**: `geolocation=(), microphone=(), camera=()`
- **Content Security Policy**: Restrictive CSP allowing self-hosted fonts, Cloudflare Insights, Mux CDN, Unsplash imagery, and AWS CloudFront media endpoints.

---

## 9. Important Fixes & Bug History

The codebase contains specific documented engineering fixes for performance and layout stability:

1. **CLS-1 Fix** (`src/components/IntersectionLazy.tsx`): Prevents Cumulative Layout Shift by preserving a fixed placeholder height before viewport intersection and releasing it after layout measurement.
2. **CLS-2 Fix** (`src/components/BlurText.tsx`): Removed Y-axis translation from initial/final animation states; pure opacity and blur fade prevents vertical layout shifts during scrolling.
3. **CLS-3 Fix** (`src/components/RotatingText.tsx`): Removed `layout` animation prop from outer `motion.span` to prevent sibling text jumps when text length changes.
4. **CLS-4 Fix** (`src/components/FocusText.tsx`): Enforced fixed container height (`h-[100px] md:h-[140px]`) preventing sibling layout shifts when blur filter sizes change.
5. **CLS-5 Fix** (`src/components/ClickSpark.tsx`): Rendered children directly in a React fragment with `position: fixed` canvas overlay so click interactions never alter document flow.
6. **CLS-6 Fix** (`src/components/HlsVideo.tsx`): Added `poster` thumbnail image prop to reserve video layout dimensions while HLS video stream initializes.
7. **INP-1 Fix** (`src/components/FocusText.tsx`): Debounced window scroll/resize event listeners to 100ms with `{ passive: true }` flag to keep main thread unblocked.
8. **INP-2 Fix** (`src/components/RotatingText.tsx`): Added `IntersectionObserver` visibility tracking to pause text rotation intervals when the hero is off-screen.
9. **INP-3 Fix** (`src/sections/CertificationsSection.tsx`): Rendered only the active tab's DOM content instead of keeping all hidden tabs in the DOM tree, eliminating input delay when switching tabs.
10. **INP-6 Fix** (`src/components/HlsVideo.tsx`): Cached dynamic `hls.js` import at module level to prevent re-fetching the module on component re-renders.
11. **LH-4 Fix** (`index.html`): Replaced external Google Font requests with self-hosted WOFF2 files in `/fonts/` to eliminate render-blocking network requests.
12. **Metadata Duplication Fix** (`scripts/prerender-seo.js`): Regex replacement in pre-rendering script strips duplicate meta/title tags inside React body `#root` so metadata exists exclusively in `<head>`.
13. **Vite Compression Plugin Windows Path Bug** (`vite.config.ts`): Removed `vite-plugin-compression` due to a Windows path bug outputting malformed `dist/D:/...` directory structures, offloading compression to Firebase CDN edge.
14. **LCP Hero Skeleton Poster** (`index.html`): Static HTML hero skeleton with high-priority poster image achieving sub-second FCP/LCP before React hydration.
15. **SkillAccordion Forced Reflow Fix** (`src/components/ui/SkillAccordion.tsx`): Removed Framer Motion `layout` animations inside accordion items to prevent forced layout reflows.

---

## 10. Git & GitHub Workflow

- **Main Branch**: `main` is the primary production branch.
- **Commit Guidelines**: Atomic, descriptive commit messages documenting changes (e.g. `feat: ...`, `fix: ...`, `docs: ...`).
- **Automated CI/CD Workflow**:
  - Workflow File: `.github/workflows/deploy.yml`
  - Trigger: Push to `main` branch.
  - Steps: Checks out repository on `ubuntu-latest`, sets up Node 22, installs dependencies via `npm install`, runs production build (`npm run build`), uploads `dist/` artifact, and deploys to GitHub Pages.
- **Manual Firebase Deploy**: Executed via CLI command `npx firebase deploy --only hosting`.

---

## 11. Current Production Baseline

### Completed & Stable

- [x] SEO + AEO + GEO Entity Architecture Optimization (Commit `fc07811`).
- [x] Firebase Hosting Production Deployment (`my-portfolio-fss`).
- [x] Static SSR Pre-rendering pipeline for all 9 public routes.
- [x] Schema.org JSON-LD entity graph (`Person` with `hasOccupation` + 23-item `knowsAbout`, `WebSite`, `ProfilePage`, `BreadcrumbList`, `TechArticle` ×4, `SoftwareApplication`).
- [x] Metadata deduplication (meta tags solely in `<head>`).
- [x] Performance optimizations (CLS fixes 1–6, INP fixes 1–3 & 6, LH-4 self-hosted fonts).
- [x] Firebase Hosting CDN edge caching and security headers.
- [x] AI discoverability documentation (`/llms.txt`, `/llms-full.txt`) — rewritten with canonical identity, factual Q&A, and metadata header.
- [x] Explicit AI crawler policy in `robots.txt` (GPTBot, ClaudeBot, PerplexityBot, and 11 others).
- [x] `rel="me"` identity links in `index.html` and `SEOHead.tsx` (GitHub, LinkedIn).
- [x] `og:type="profile"` and `og:profile:*` on homepage via `isProfilePage` prop.
- [x] `Content-Type: text/plain; charset=utf-8` header for `*.txt` files in `firebase.json`.
- [x] Resume PDF viewer modal (`react-pdf`).
- [x] Recruiter Mode ATS candidate summary page (`/recruiter`).
- [x] Interactive AI assistant showcase page (`/ai`).

### In Progress

- **PrepMind AI**: AI interview prep platform (Status: In Development).

### Known Limitations

- **PDF Viewer Chunk**: Requires `pdfjs-dist` worker loading, isolated in separate `react-pdf` chunk.

---

## 12. Future Improvements

1. **Automated Firebase Deploy CI/CD**: Integrate Firebase Hosting deployment into GitHub Actions workflow alongside GitHub Pages.
2. **Live AI Model API**: Connect `AskSahayaAI` interactive page to a live backend AI model edge worker.
3. **Automated Visual Regression Tests**: Implement Playwright/Cypress end-to-end tests verifying static pre-rendered routes during CI.

---

## 13. Important Commands

```bash
# Install dependencies
npm install

# Start local development server (Vite dev server)
npm run dev

# Run production build and static HTML pre-renderer
npm run build

# Preview production build locally
npm run preview

# Deploy pre-rendered build to Firebase Hosting
npx firebase deploy --only hosting
```

---

## 14. Maintenance Notes

- **SSR Window Safety**: Any code executing inside React component render paths must check `typeof window !== 'undefined'` before accessing browser globals (`window`, `document`, `navigator`, `localStorage`).
- **Single Source of Truth**: All page content must originate from React components in `src/`. Never hardcode duplicate content strings in `scripts/prerender-seo.js`.
- **Metadata & Canonical URLs**: Maintain canonical domain `https://sahayasavari.dev` in `src/seo.ts` and `scripts/prerender-seo.js`.
- **Do Not Add Compression Plugin**: Keep `vite-plugin-compression` disabled; compression is handled by Firebase Hosting CDN edge and avoids Windows path bugs.

---

## 15. AI Agent Instructions

1. **Inspect Codebase First**: Read `portfolio.md` and `PROJECT.md` before making architectural recommendations or modifying code.
2. **Preserve Pre-rendering Pipeline**: Do not alter `src/entry-server.tsx` or `scripts/prerender-seo.js` in ways that break static pre-rendering.
3. **Ensure SSR Hydration Safety**: Test all component edits to verify they do not crash during server pre-rendering (`npm run build`).
4. **Verify Build Output**: Always run `npm run build` after making changes to verify client compilation and static HTML generation across all 9 routes.
5. **Protect Production Information**: Do not expose private keys, credentials, or personal secrets in code or configuration files.
6. **Prefer Minimal Changes**: Keep changes targeted, maintainable, and aligned with existing code conventions.
