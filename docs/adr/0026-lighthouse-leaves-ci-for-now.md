---
status: accepted
date: 2026-10-29
decision-makers: [project owner]
---

# 0026. Lighthouse budgets leave CI for now

## Context and problem statement

ADR-0016 makes CI fail when Lighthouse performance falls under 0.95. The SHUNPO home page scores 1 in accessibility, best practices and SEO, but 0.86–0.87 in performance on the mobile preset: its observed LCP is about 0.1 s, while Lighthouse's simulation counts every byte requested in the first 100 ms (React, Next.js, GSAP and the scenes' code) and estimates 4 s. Should the performance budget keep blocking every pull request while the page is reworked?

## Decision drivers

- The project owner wants the page reviewed and merged before the performance work.
- Accessibility and the design audit must stay enforced in CI.
- The budget stays the target; it moves from a gate to a measured goal.

## Considered options

- Remove the Lighthouse step from CI and keep the command for local runs
- Lower the performance threshold
- Keep the gate and block the pull request

## Decision outcome

Chosen option: "Remove the Lighthouse step from CI and keep the command for local runs". Mandated by the project owner.

- `.github/workflows/ci.yml` no longer runs `pnpm --filter @repo/web lighthouse` nor uploads its reports; the browser job keeps the build, the WCAG 2.2 AA audit and the design audit.
- `apps/web/lighthouserc.json` and its budgets are unchanged; `pnpm --filter @repo/web lighthouse` runs them locally.
- Supersedes the Lighthouse row of ADR-0016.

### Consequences

- Good, because pull requests are no longer blocked by a simulated metric while the page is being finished.
- Bad, because a performance regression can now be merged unnoticed; the command must be run by hand before each release.

## More information

- Related: ADR-0012, ADR-0016.
- Revisit when the home page reaches performance ≥ 0.95 locally: put the step back in CI.
