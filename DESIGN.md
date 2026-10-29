# Design direction

Values live in `packages/ui/src/styles/theme.css`; this file holds the direction only. The brand guide (Magenta, 2025) is the authority on logo, palette, colour pairs and voice.

## Point of view

A day rises over misty Japanese mountains. Night is how the company runs today (re-typing, scattered information, one key person, flying blind); dawn is SHUNPO's Immersion; daylight is the system at work. Everything else is white washi paper and ink: paper-sculpture figures under soft studio light, brush strokes, a red hanko seal that approves finished work. Japanese rigour, French franchise, no costume.

## The world

- **Ground:** Kome paper for the page, Shiro for quiet sections, Fuji Night islands for the hero, the film and the close.
- **Imagery:** the client's own filmed sunrise and paper samurai, white washi paper sculptures on grey studio backdrops (generated in that one style), real case screenshots and real client faces only in testimonials.
- **Type:** an old-style serif (Piazzolla) for headings, a neutral grotesque (Hanken Grotesk) for text, a Mincho face (Shippori Mincho) for the rare kanji (見 築 進, 瞬歩). The brand guide names Calibre; the approved prototype uses Piazzolla, so the display face is a one-line token change once a Calibre web licence exists.
- **Shapes:** square paper with a cut top-right corner, hairlines, calls to action split into a label cell and an arrow cell.
- **Accent:** Fushimi Glow red, rationed to the seal, the primary call to action and stamps; it never touches Fuji Night or Blue Tenku.
- **Motion:** the scroll is the clock. Videos are scrubbed (sunrise, bow), scenes are pinned on desktop and stacked on mobile, stamps press with weight, badges swing on their lanyards, brushes paint. Nothing bounces for decoration.

## Do

- One focal point and one primary action per viewport; content centred in the container on every width.
- Let the hanko approve something real (a pain solved, a brick delivered); never stamp decoration.
- Keep illustrative data labelled « données fictives ».

## Don't

- Brand-guide forbidden pairs: Blue Tenku next to Fushimi Glow, Fushimi Glow on Fuji Night, Kurenai Blush next to Fushimi Glow.
- Long Japanese text, red body text, uppercase body text.
- Rising Sun rays, cherry-blossom wallpaper, generated faces presented as real people.

## References

| Reference                               | Principle taken                                         | Not taken                 |
| --------------------------------------- | ------------------------------------------------------- | ------------------------- |
| The client's Claude artifact (Oct 2026) | Its structure, copy, sunrise, samurai and paper figures | Its developer variant bar |
| Proposal B « Le bureau » (round 1)      | The stamped sorting of the pains, folders, badges       | The desk clutter          |
| Proposal D « Le trait » (round 2)       | The brush-painted grid of four bricks                   | The procedural ensō       |
| SHUNPO brand guide (Magenta, 2025)      | Palette, logo rules, shuriken, voice                    | Bento as a default layout |
| Japanese hanko (seal) practice          | A red seal approves finished work                       | Calligraphy fonts         |

The direction was chosen across four rounds of live prototypes (`.context/proposals/`, proposal G), on the decision of the project owner.
