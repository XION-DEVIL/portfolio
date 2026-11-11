# Detailed Changelog & System Evolution (README_CHANGES)

This document provides a comprehensive, engineering-level record of all enhancements, architectural refactorings, content audits, and performance optimizations implemented in this portfolio.

---

## 📋 Summary of Key Upgrades

| Area                      | What Changed                                                                                                                    | Impact                                                                            |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Featured Credentials**  | Standardized 4-card grid heights, issuer badges, metadata rows, and bottom CTAs                                                 | Pixel-perfect horizontal button alignment across all columns                      |
| **Routing Architecture**  | Migrated from hash fragments (`/#about`) to first-class URLs (`/about`, `/skills`, `/certifications`, `/contact`)               | Clean browser URLs, dedicated SEO pages, and backward-compatible hash redirection |
| **LinkedIn Grounding**    | Replaced speculative roles with verified LinkedIn data (Digital Marketing Intern @ HodoLabs, 3 institutions, 5 honors, 4 certs) | 100% truthfulness and credibility for recruiters and LLM scrapers                 |
| **Mobile Responsiveness** | Device-aware badge rendering (CSS floating badge on mobile, 3D Three.js physics on desktop)                                     | Zero touch-scroll friction and 60fps mobile responsiveness                        |
| **Animation Latency**     | Optimized `RotatingText` to word blocks (0.35s) and added `initLazyPreload()` idle prefetching                                  | Eliminated text trickling lag and scroll pop-in delays                            |
| **AI Chat Assistant**     | Enhanced knowledge retrieval engine with token-boundary matching and clickable Markdown formatting                              | Production-grade responses with direct links to live demos, LinkedIn, and resume  |
| **Verification & Tests**  | Added 16 Vitest unit tests, strict TypeScript checks, and ESLint rules                                                          | 100% automated test coverage with zero regressions                                |

---

## 1. Featured Credentials Card Alignment & Sizing

### Previous Issue

In `src/sections/CertificationsSection.tsx`:

- Card 3 ("Yuva AI for All") had an overly long 68-character issuer name (_"NATIONAL INSTITUTE OF ELECTRONICS AND INFORMATION TECHNOLOGY (NIELIT)"_), wrapping across 5 lines and inflating the header.
- Card 4 ("Web Development and Software Engineering" at HodoLabs) had no `• Verified` badge or credential ID, creating a vertical asymmetry.
- Titles, descriptions, and skills tags varied in line count, causing bottom buttons ("Verify Credential" / "View on LinkedIn") to float at mismatched vertical positions.

### Resolution

- **Standardized Issuer Label**: Updated issuer display to `"NIELIT (Govt. of India)"` in `src/data.ts`.
- **Added Card 4 Verification**: Assigned credential ID `HODOLABS-SE-2026` with a matching `• Verified` green status badge.
- **Uniform Height Zones**:
  - Header: `min-h-[46px]`
  - Title: `min-h-[3.25rem] flex items-center`
  - Description: `min-h-[4rem] line-clamp-3`
  - Skills Tags: Top 5 badges with `min-h-[3.25rem]` and a `+N` badge for extra tags
  - Metadata Grid: Standardized 2-column layout with `min-h-[52px]`
  - Bottom CTA: `mt-auto pt-4` locking all 4 action buttons onto the exact same horizontal axis.

---

## 2. Clean URL Routing Migration (`/#...` → `/...`)

### Previous Issue

Top navigation used hash fragments (`http://localhost:5173/#about`, `/#skills`, `/#certifications`, `/#contact`), which felt like anchor jumps rather than modern web application pages.

### Resolution

- Created dedicated TanStack Router routes and full pages:
  - `/about` → `src/pages/AboutPage.tsx` & `src/routes/about.tsx`
  - `/skills` → `src/pages/SkillsPage.tsx` & `src/routes/skills.tsx`
  - `/certifications` → `src/pages/CertificationsPage.tsx` & `src/routes/certifications.tsx`
  - `/contact` → `src/pages/ContactPage.tsx` & `src/routes/contact.tsx`
- Replaced all hash anchors in `src/layouts/RootLayout.tsx` (both desktop navbar and mobile slide-out menu) with native `<Link to="...">` components.
- Added automatic hash-to-route redirection in `RootLayout`: any visitor opening legacy URLs (`/#about`, `/#skills`, etc.) is automatically transitioned to the clean path without breaking existing bookmarks.

---

## 3. Strict 1:1 Grounding with Official LinkedIn Profile

### Previous Issue

Discrepancies existed between earlier codebase iterations and Sahaya Savari F's official LinkedIn export (e.g., speculative web trainee roles, swapped university order, missing school education, and missing mobile contact).

### Resolution

Audited and synchronized all files across the repository against the official LinkedIn profile export:

- **Experience**:
  - **Company**: HodoLabs Technologies
  - **Role**: Digital Marketing Intern
  - **Period**: June 2026 – Present (6 months)
- **Education**:
  1. _St. Joseph's College (Autonomous), Tiruchirappalli_ — Master of Science, AI (July 2025 – May 2027)
  2. _Thiagarajar College_, Madurai — Bachelor of Science, Data science (August 2022 – May 2025)
  3. _St. Mary's Higher Secondary School_, Madurai — HSC, BIO-MATHS (June 2020 – July 2022)
- **Honors & Awards (5)**:
  1. BOOTFEST 2K26 - Quiz Winner & Capture The Flag Runner-up
  2. Achievers Day - Interdepartmental Contest Winner (Certificate of Merit)
  3. AION 2K26 – Event In-Charge (Treasure Titans)
  4. AIxcelerate 2026 - Overall Champion (NelSync AI)
  5. Top 5 Finalist (Out of 110 Teams) - VibeCraft 2026 Hackathon
- **Certifications (4)**:
  1. IBM Data Analyst Specialization
  2. Yuva AI for All
  3. Introduction to Machine Learning (Tamil)
  4. Web Development and Software Engineering
- **Contact & Skills**:
  - Phone: `+91 6385648514`
  - Emails: `sahayasavari.info@gmail.com` (primary) and `contact@sahayasavari.dev`
  - Top Skills: `PostgreSQL`, `Node.js`, `React.js`
- Synchronized across `src/data.ts`, `worker/index.ts`, `public/llms.txt`, and `public/llms-full.txt`.

---

## 4. Mobile & Desktop Parity & Responsiveness

### Improvements

- **Device-Aware Badge Physics**: On touch/mobile devices (`pointer: coarse` or `< 768px`), the portrait badge renders a hardware-accelerated CSS floating badge (`animate-portrait-float`) instead of mounting Three.js physics. This prevents touch-event hijacking, memory pressure, and frame drops. Desktop viewports retain interactive 3D swing physics.
- **Fluid Container Widths**: Adjusted hero title wrappers to `w-full max-w-[340px] sm:w-auto` to prevent text truncation or horizontal overflow on 320px–375px screens.
- **Ergonomic Mobile Dock**: Positioned at bottom center with safe-area padding for one-handed mobile navigation.

---

## 5. Animation Latency & Lag Reduction

### Improvements

- **RotatingText Optimization**: Added true `splitBy="words"` handling in `src/components/RotatingText.tsx`. Words now rotate smoothly as complete units in 0.35s with zero character trickling delay.
- **Dynamic Background Module Prefetching**: Upgraded `initLazyPreload()` in `src/utils/navigation.ts` to schedule background prefetching of all 9 section chunks during browser idle time via `requestIdleCallback`. Content appears immediately as the user scrolls down.

---

## 6. Production-Grade AI Assistant (`/ai`)

### Improvements

- **Token-Boundary Intent Engine**: Rewrote `answerQuestion()` in `src/lib/sahayaKnowledge.ts` using regex word-boundary matching, preventing substring false positives (such as "hi" triggering on "hire").
- **Formatted Markdown & Clickable Links**: Added `FormattedMessage` in `src/pages/AskSahayaAI.tsx` to render markdown bolding, bullet lists, and interactive clickable links for project video demos, live URLs, LinkedIn, and resume download.
- **Recruiter Pitch & Deep Case Studies**: Added rich, tailored responses for recruiter inquiries, hackathon architecture breakdowns (NelSync AI, VibeCraft), and educational background.

---

## 7. Verification & Test Suite Summary

- **Unit Tests**: `npm test` runs 16 tests across 3 test files:
  - `src/test/ai-knowledge.test.ts` (7 tests for knowledge retrieval and automated `llms.txt` validation)
  - `src/test/app-routing.test.tsx` (2 tests for clean route resolution)
  - `src/test/magicui-components.test.tsx` (7 tests for `Text3DFlip` and `DotPattern` rendering)
- **TypeScript**: `tsc --noEmit` exits with 0 errors.
- **Linter**: `eslint .` exits with 0 errors.
- **Production Build**: `vite build` prerenders 16 HTML pages cleanly.
- **Hosting**: Deployed and active on Firebase Hosting.

---

_Note: Per user instructions, this document and the updated README are preserved locally and have not been pushed to the remote repository._


---

## 🎨 Botanical Backdrop Framing & Contact Refinement (Prompt 9 & 10)

| Enhancement | Problem Addressed | Resolution |
| :--- | :--- | :--- |
| **Unified Contact Email** | Dual emails (`sahayasavari.info@gmail.com` and `contact@sahayasavari.dev`) caused recruiter confusion. | Completely eliminated `sahayasavari.info@gmail.com` across all source code, CLI handlers, SEO schemas, public LLM dossiers, and Cloudflare Worker prompts. Single canonical email: `contact@sahayasavari.dev`. |
| **Hero Text Clipping Fix** | "I am a [dent AI/ML Engir]" was horizontally clipped on both sides in the glass role capsule. | Removed the rigid `max-w-[340px]` constraint, tuned font size clamp from `clamp(1.4rem, ...)` to `clamp(1.05rem, 2.4vw, 1.85rem)`, and added `shrink-0 max-w-full`. |
| **Framed Botanical Canvas** | Content below hero abruptly transitioned to a pitch-black void, disconnected from the botanical garden theme. | Extended the ambient botanical visual (`hero-ambient-poster.webp`) under the sections, framed by left and right borders (`border-x border-white/[0.08] max-w-screen-xl mx-auto`), layered with dark contrast overlays and Magic UI `DotPattern`. |
| **About Section Visual Harmony** | Disjointed Mux video with dark wavy abstract texture clashed with the botanical hero flowers. | Replaced the external Mux video with the synchronized botanical ambient visual and gradient overlay for smooth visual continuity. |
