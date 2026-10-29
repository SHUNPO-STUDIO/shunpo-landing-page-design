# @repo/ui — design system

The only place where visual decisions live. Read the `design-system` skill before changing anything here.

Figma library (mirror of this package, code wins): https://www.figma.com/design/0WtO809qZsF4yAmfPoIPGW/Boilerplate---Alex. It still shows the boilerplate's previous theme: re-sync it with the `figma-sync` skill after the SHUNPO retheme; Code Connect templates live in `figma/`.

## Rules

- Tokens: `src/styles/theme.css` only. The theme is locked (`--*: initial`); a utility exists only if its token exists.
- Classes inside this package still obey the lint: no arbitrary values, no margins (except `*-auto`), no single-side padding, no `space-*`, on-scale z-index, durations and border widths.
- Every component: `cva` variants, `cn()` to merge `className`, `data-slot` on the root, named export, one component per file.
- Layout and typography components are Server-Component-safe (no hooks, typed `as` prop). Interactive components wrap Base UI, or a native element when the browser already provides the behaviour; links use `useRender` with a `render` prop.
- Every component has a story in `stories/` (stories are tests: `play` + accessibility check). Logic has unit tests in `tests/`.
- Import paths: `@repo/ui/<folder>/<file>` (no barrel files).
- A new or changed component updates its Code Connect template in `figma/<component>.figma.ts`.

## Inventory

| Import                                    | Props (defaults in bold)                                                                                                                                                                                                                                  |
| ----------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `layout/section` `Section`                | `spacing` xs, sm, **md**, lg, xl · `tone` **default** (Kome paper), muted (Shiro), surface (light paper) · `scheme` **inherit**, light, dark (Fuji Night island) · `as` section, header, footer, aside                                                    |
| `layout/container` `Container`            | `size` prose, narrow, **default**, wide · `as`                                                                                                                                                                                                            |
| `layout/stack` `Stack` (column)           | `gap` none, 2xs, xs, sm, **md**, lg, xl, 2xl, 3xl · `align` start, center, end, **stretch** · `justify` **start**, center, end, between · `as`                                                                                                            |
| `layout/inline` `Inline` (row, wraps)     | `gap` (**sm**) · `align` start, **center**, end, baseline · `justify` · `wrap` **true**, false · `as`                                                                                                                                                     |
| `layout/grid` `Grid` (responsive)         | `columns` 1, 2, **3**, 4 (one column on mobile) · `from` **md**, lg (breakpoint where columns start) · `gap` (**lg**) · `align` start, center, **stretch** · `as` div, ul, ol, dl, section                                                                |
| `typography/heading` `Heading`            | Piazzolla, regular weight, tight tracking · `level` 1–6 (required) · `size` display-xl, display, title-lg, title, title-sm, subtitle (default from level) · `tone` **default**, muted · `align`                                                           |
| `typography/highlight` `Highlight`        | Accent-painted emphasis inside a heading or text                                                                                                                                                                                                          |
| `typography/stat` `Stat`                  | A figure (display serif, `text-6xl`) and its label as `dt`/`dd`; place inside `Grid as="dl"` · `value`, `label`                                                                                                                                           |
| `typography/text` `Text`                  | `size` lg, **md**, sm, xs · `tone` **default**, muted, accent, destructive · `weight` **regular**, medium, semibold · `align` · `measure` **full**, prose (caps line length) · `as` p, span, div, li, strong, em, small, figcaption, blockquote           |
| `components/button` `Button`              | `variant` **primary** (Fuji Night, Kome on dark islands), secondary, accent (Fushimi Glow), outline, ghost · `size` sm, **md**, lg, icon · `corner` **none**, cut · `arrow` (label cell + arrow cell split by a hairline) · Base UI Button props          |
| `components/button-link` `ButtonLink`     | Same variants as `Button` (incl. `corner`, `arrow`), renders a link · `render={<Link href="…" />}` for Next.js links                                                                                                                                      |
| `components/text-link` `TextLink`         | Inline link · `render` for Next.js links                                                                                                                                                                                                                  |
| `components/media` `Media`                | Frames an image with an optional `caption` · `image={<Image src={…} alt="…" sizes="…" />}` from next/image (ADR-0022)                                                                                                                                     |
| `components/badge` `Badge`                | Square chip · `variant` **neutral**, accent, outline                                                                                                                                                                                                      |
| `components/card` `Card`                  | `variant` **surface**, muted, outline · `padding` **md**, lg · `corner` **none**, cut (folded top-right chamfer) · `as` div, article, li                                                                                                                  |
| `components/separator` `Separator`        | `orientation` **horizontal**, vertical                                                                                                                                                                                                                    |
| `components/icon` `Icon`                  | `icon` (lucide icon, required) · `size` sm, **md**, lg · `label` (omit for decorative icons)                                                                                                                                                              |
| `motion/motion-provider` `MotionProvider` | Lenis smooth scroll synced with GSAP; off with reduced motion. Already mounted in the web app                                                                                                                                                             |
| `motion/scroll-scene` `ScrollScene`       | `choreography(timeline)` · `length` short, **medium**, long · `minWidth` **all**, md (pin only from the tablet breakpoint) · `still` (shown instead of the scene under reduced motion: every stage as a still plate). See the `scroll-storytelling` skill |
| `motion/tokens`                           | `duration`, `ease`, `stagger`, `sceneLength`, `scrub` for GSAP                                                                                                                                                                                            |
| `components/brand-logo` `BrandLogo`       | The `[瞬歩] SHUNPO` wordmark in the text colour, with an accessible name · `size` sm, **md**, lg                                                                                                                                                          |
| `components/shuriken` `Shuriken`          | The brand symbol, decorative · `size` sm, **md**, lg, xl · `tone` **seal** (Fushimi on paper), night (Kome on Fuji Night), line (current colour)                                                                                                          |
| `components/stamp` `Stamp`                | A hanko impression (shuriken + one word) in seal ink with an irregular print · `tone` **seal**, ink · `size` sm, **md**. Paper grounds only                                                                                                               |
| `typography/kanji` `Kanji`                | Japanese accent word (`lang="ja"`, Shippori Mincho) · `size` sm, **md**, lg, xl · `tone` **default**, muted, watermark (Shiro), accent                                                                                                                    |
| `motion/press-stamp` `pressStamp`         | `pressStamp(timeline, target, position?)`: adds the hanko press (drop, squash, printed) to a GSAP timeline                                                                                                                                                |

## Commands

- `pnpm --filter @repo/ui dev` — Storybook on `:6006`.
- `pnpm --filter @repo/ui test -- <file>` — one test file; `test:coverage` enforces 90 %.
