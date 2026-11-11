import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches dedicated pages for clean route URLs /about, /skills, /certifications, /contact", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/about").at(-1)?.routeId).toBe("/about");
    expect(router.matchRoutes("/skills").at(-1)?.routeId).toBe("/skills");
    expect(router.matchRoutes("/certifications").at(-1)?.routeId).toBe("/certifications");
    expect(router.matchRoutes("/contact").at(-1)?.routeId).toBe("/contact");
    expect(router.matchRoutes("/experience").at(-1)?.routeId).toBe("/experience");
    expect(router.matchRoutes("/projects").at(-1)?.routeId).toBe("/projects/");
  });
});
