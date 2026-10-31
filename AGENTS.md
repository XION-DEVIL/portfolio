<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Imported portfolio components keep react-router-style imports via `src/lib/router-compat.tsx` (backed by TanStack Router); use it instead of adding react-router-dom — keeps the original source untouched.
- Page titles/OG/canonical tags live in each route's `head()` via `buildSeoHead` in `src/seo.ts`; `SEOHead` only emits JSON-LD — avoids duplicate head tags.
- Keep portfolio enhancements local and lightweight: viewport-triggered tickers, CSS marquees, and card-local spotlights respect reduced motion without adding page-wide effects.
- Lazy section wrappers must render identical initial markup on the server and client; defer browser-only visuals behind ClientOnly to prevent hydration recovery.
