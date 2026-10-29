---
status: accepted
date: 2026-10-29
decision-makers: [project owner]
---

# 0024. The SHUNPO site replaces the boilerplate showcase

## Context and problem statement

The repository now builds SHUNPO's landing page. The boilerplate's own showcase brought a three.js block stage (ADR-0019), runtime token presets and repository facts (ADR-0020) and technology logos from Simple Icons (ADR-0021). None of them serves the SHUNPO page, and the repository forbids dead code. What happens to them?

## Decision drivers

- No dead code, no speculative code (`knip`, golden rule 6).
- Lighthouse performance budget: no 3D runtime or unused dependency in the bundle.
- The design system must express the SHUNPO brand guide, not the Fröbel showcase.

## Considered options

- Remove the showcase pieces and their dependencies
- Keep them unused in `@repo/ui` for later projects

## Decision outcome

Chosen option: "Remove the showcase pieces and their dependencies", because unused components would rot and keep `three`, `@react-three/fiber` and `simple-icons` in the dependency graph.

- Removed from `@repo/ui`: `IsoBlocks`, `BlockStage`, the `scene/` folder, `TokenTray` and the presets, `Part`, `PairedLayers`, `GrainPatterns`, `BrandMark`, `CodeBlock`, `CodeLine`, with their stories, tests and Code Connect templates.
- Removed from `apps/web`: the showcase feature, `repository-facts.ts` and its test. Unit tests in the web app (the other half of ADR-0020) stay.
- Dependencies dropped: `three`, `@react-three/fiber`, `@types/three`, `simple-icons`.
- Supersedes ADR-0019 and ADR-0021, and the token-presets and repository-facts part of ADR-0020.

### Consequences

- Good, because the bundle and the dependency graph shrink.
- Good, because the design system only holds what the SHUNPO page composes.
- Bad, because a future 3D or logo need starts again from these ADRs' git history.

## More information

- Related: ADR-0019, ADR-0020, ADR-0021.
- Revisit when a page needs a 3D scene or third-party technology logos.
