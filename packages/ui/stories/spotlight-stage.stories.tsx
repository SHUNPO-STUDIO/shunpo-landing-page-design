import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { ButtonLink } from "../src/components/button-link.tsx";
import { SpotlightStage } from "../src/motion/spotlight-stage.tsx";
import { VideoScrub } from "../src/motion/video-scrub.tsx";
import { Heading } from "../src/typography/heading.tsx";
import mp4 from "./support/rising-sun.mp4?url";
import webm from "./support/rising-sun.webm?url";

const STUDIO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%23474747'/%3E%3Crect x='9' y='2' width='1.6' height='5.5' fill='%23b05f60'/%3E%3C/svg%3E";

const meta = {
  title: "Motion/SpotlightStage",
  component: SpotlightStage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A Fuji Night stage: the call (title and action) at the start side, a filmed figure (`figure`, usually a `VideoScrub`) in a pool of light at the end side from xl, below the call on smaller screens. It rises like a curtain over its still content; the title's words rise once the stage is well into the screen.",
      },
    },
  },
  args: {
    figure: (
      <VideoScrub
        sources={{ mp4, webm }}
        poster={<img src={STUDIO} alt="" />}
        start="top 60%"
        end="bottom bottom"
      />
    ),
    title: (
      <Heading level={2} size="headline">
        Construisons le dernier logiciel dont vous aurez besoin.
      </Heading>
    ),
    action: (
      <ButtonLink href="#contact" size="lg" corner="cut" arrow>
        Parlons de votre projet
      </ButtonLink>
    ),
  },
} satisfies Meta<typeof SpotlightStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Samurai: Story = {
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole("heading", { level: 2 })).toBeInTheDocument();
    await expect(canvas.getByRole("link", { name: "Parlons de votre projet" })).toBeInTheDocument();
  },
};
