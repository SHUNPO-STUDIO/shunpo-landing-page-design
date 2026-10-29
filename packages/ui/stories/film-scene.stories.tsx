import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { ButtonLink } from "../src/components/button-link.tsx";
import { FilmScene } from "../src/motion/film-scene.tsx";
import { PhotoStage } from "../src/motion/photo-stage.tsx";
import { Heading } from "../src/typography/heading.tsx";
import mp4 from "./support/rising-sun.mp4?url";
import webm from "./support/rising-sun.webm?url";

const NIGHT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%231e2629'/%3E%3C/svg%3E";
const PAPER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23474747'/%3E%3C/svg%3E";

const meta = {
  title: "Motion/FilmScene",
  component: FilmScene,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A full-screen film behind a centred headline, scrubbed by the scroll. The stage stays pinned for `length` screens of scroll (`h-scroll-screen`: the screen height, or 62.5 % of its width when narrower, so a phone runs the prototype's course in proportion); the film plays over 1 450 of every 1 800 px, then holds, and the stage recedes under a veil while the next section covers it. `minWidth=\"md\"` pins from the tablet breakpoint only (below, the film plays while the stage scrolls by). The headline's lines rise on load; from `lightAt` (film progress) title and action switch to the light scheme, from `leaveAt` they leave the image to the film.",
      },
    },
  },
  args: {
    sources: { mp4, webm },
    poster: <img src={NIGHT} alt="" />,
    title: (
      <Heading level={1} size="headline" align="center">
        On construit le système qui fait tourner votre entreprise, boosté à l’IA.
      </Heading>
    ),
    action: (
      <ButtonLink href="#contact" size="lg" corner="cut" arrow>
        Réserver une Immersion
      </ButtonLink>
    ),
    lightAt: 0.6,
    leaveAt: 0.75,
  },
  render: (args) => (
    <>
      <FilmScene {...args} />
      <PhotoStage
        image={<img src={PAPER} alt="Une photographie" className="absolute inset-0 size-full" />}
      />
    </>
  ),
} satisfies Meta<typeof FilmScene>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sunrise: Story = {
  play: async ({ canvas }) => {
    const heading = await canvas.findByRole("heading", { level: 1 });
    await waitFor(async () => {
      await expect(heading).toBeVisible();
    });
    await expect(canvas.getByRole("link", { name: "Réserver une Immersion" })).toBeVisible();
  },
};
