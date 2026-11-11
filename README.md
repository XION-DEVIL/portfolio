# Sahaya Savari F — AI/ML & Full Stack Portfolio

Production-grade personal portfolio and interactive engineering showcase of **Sahaya Savari F** (M.Sc. Artificial Intelligence @ SJC, Digital Marketing Intern @ HodoLabs, 2x Hackathon Champion).

🌐 **Live URL**: [https://sahayasavari-portfolio.web.app](https://sahayasavari-portfolio.web.app)  
📄 **Repository**: [https://github.com/XION-DEVIL/portfolio](https://github.com/XION-DEVIL/portfolio)

---

## 🚀 Key Highlights & Architecture

- **Clean URL Routing**: Powered by **TanStack Router** with full SSR/prerendering support across `/`, `/about`, `/skills`, `/certifications`, `/contact`, `/experience`, `/projects`, `/blog`, `/resume`, and `/ai`.
- **Verified LinkedIn Grounding**: 100% verified alignment with official LinkedIn credentials, honors, education, and internship history.
- **Production AI Assistant (`/ai`)**: In-browser dual-mode AI interface (Interactive Chat & Developer CLI) with natural language intent recognition, rich Markdown rendering, and direct resource links.
- **Micro-Interactions & Visual Polish**: Magic UI `Text3DFlip` spring-physics hero typography, subtle `DotPattern` ambient background, and device-aware 3D badge interactions.
- **Zero-Latency Navigation**: Intelligent background prefetching via `requestIdleCallback` (`initLazyPreload`) eliminating scroll pop-in delays.
- **Performance & Accessibility**: Built with sub-second TTI, zero layout shift (CLS 0), WCAG AA contrast compliance, and full keyboard focus management.

---

## 🛠 Tech Stack

- **Framework**: React 19, TanStack Router, Vite 8, TypeScript 5
- **Styling**: Tailwind CSS v4, Lucide Icons, Plus Jakarta Sans, JetBrains Mono
- **Motion & 3D**: Framer Motion, Three.js (desktop-only hardware acceleration)
- **State & Data**: TanStack React Query, LocalStorage / IndexedDB persistence
- **Testing & Quality**: Vitest (16 unit tests passing), ESLint, Prettier, TypeScript strict mode
- **Deployment**: Firebase Hosting (Static Edge SPA) & Cloudflare Worker API proxy

---

## 💻 Local Development

### Prerequisites

- Node.js >= 20.x
- npm >= 10.x

### Quick Start

```bash
# 1. Clone repository
git clone https://github.com/XION-DEVIL/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 🧪 Testing & Verification

```bash
# Run automated Vitest suite
npm test

# Run TypeScript typecheck
npm run typecheck

# Run ESLint validation
npm run lint

# Format code with Prettier
npm run format

# Production build & prerender
npm run build
```

---

## 📁 Routes & Directory Structure

```
src/
├── components/          # Reusable UI components, Magic UI, and simulators
│   ├── magicui/         # Text3DFlip, DotPattern, RainbowButton, etc.
│   └── ui/              # Radix UI primitives & styled widgets
├── layouts/             # RootLayout with persistent desktop navbar & mobile dock
├── pages/               # Top-level route pages (About, Skills, Contact, AI, etc.)
├── routes/              # TanStack Router file-based route definitions
├── sections/            # Core home-stream sections (Hero, Experience, Certs, etc.)
├── lib/                 # AI service, knowledge engine, error telemetry, and utilities
└── test/                # Automated Vitest test suites
```

---

## 🌐 Deployments & Backups

- **Primary Production**: [https://sahaya-savari-portfolio.web.app](https://sahaya-savari-portfolio.web.app) (Firebase Hosting)
- **GitHub Pages**: Automated via `.github/workflows/deploy-pages.yml`
- **GitLab Pages Backup**: Automated via `.gitlab-ci.yml` (builds with Bun, publishes to `https://<namespace>.gitlab.io/<project>`)

---

## 📜 Detailed Change History

For historical release notes and documentation, see [docs/portfolio/CHANGELOG.md](./docs/portfolio/CHANGELOG.md).
