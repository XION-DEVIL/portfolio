/**
 * Lighthouse CI configuration — Core Web Vitals budgets for the marketing surface.
 *
 * Enforces Google's mobile "good" CWV thresholds:
 *   - Largest Contentful Paint (LCP) ≤ 2500 ms
 *   - Cumulative Layout Shift (CLS)  ≤ 0.1
 *   - Interaction to Next Paint (INP) ≤ 200 ms
 *
 * INP is a *field* metric with no direct lab audit, so in the lab we gate on
 * Total Blocking Time (TBT) — Lighthouse's recommended lab proxy — at the same
 * budget, and assert the experimental INP audit directly as a warning where the
 * build exposes it.
 *
 * Collection runs against the *production* static output on Lighthouse's
 * default mobile (Moto G4 / slow 4G) emulation.
 */

/** Pages whose budgets are enforced in CI. */
const MARKETING_URLS = ["/"];

/**
 * Core Web Vitals budgets on mobile — Google's "good" thresholds.
 * These are the values that earn the best Lighthouse scores.
 */
const LCP_BUDGET_MS = 2500; // good
const INP_BUDGET_MS = 200; // good (TBT lab proxy)
const CLS_BUDGET = 0.1; // good

module.exports = {
  ci: {
    collect: {
      // Gate the real, optimized production build directly from the static output directory
      staticDistDir: "./dist/client",
      url: MARKETING_URLS,
      // Median of multiple runs keeps the gate stable against per-run jitter.
      numberOfRuns: 3,
      settings: {
        // Default mobile emulation; opt into desktop via env for a second run.
        preset:
          process.env.LHCI_FORM_FACTOR === "desktop" ? "desktop" : undefined,
        // Only gate the categories we care about; skip PWA category noise.
        onlyCategories: [
          "performance",
          "seo",
          "accessibility",
          "best-practices",
        ],
      },
    },
    assert: {
      // Median across runs is the value compared against each budget.
      aggregationMethod: "median-run",
      assertions: {
        // --- Core Web Vitals budgets (the contract) ---------------------
        "largest-contentful-paint": [
          "error",
          { maxNumericValue: LCP_BUDGET_MS },
        ],
        "cumulative-layout-shift": ["error", { maxNumericValue: CLS_BUDGET }],
        "total-blocking-time": ["error", { maxNumericValue: INP_BUDGET_MS }],
        // Direct INP audit where the Lighthouse build exposes it (else ignored).
        "interaction-to-next-paint": [
          "warn",
          { maxNumericValue: INP_BUDGET_MS },
        ],

        // --- Category floors (target top Lighthouse scores) -------------
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.95 }],
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
      },
    },
    upload: {
      // Keep reports in the CI run's filesystem; no external LHCI server.
      target: "filesystem",
      outputDir: "./.lighthouseci",
    },
  },
};

