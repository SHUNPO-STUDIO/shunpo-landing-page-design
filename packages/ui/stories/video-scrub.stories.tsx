import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { Container } from "../src/layout/container.tsx";
import { Section } from "../src/layout/section.tsx";
import { VideoScrub } from "../src/motion/video-scrub.tsx";
import { Text } from "../src/typography/text.tsx";
import mp4 from "./support/rising-sun.mp4?url";
import webm from "./support/rising-sun.webm?url";

const NIGHT =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%231e2629'/%3E%3Crect x='6.5' y='7' width='3' height='1.3' fill='%23b94532'/%3E%3C/svg%3E";
const DAWN =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%231e2629'/%3E%3Crect x='6.5' y='2' width='3' height='3' fill='%23b94532'/%3E%3C/svg%3E";

const meta = {
  title: "Motion/VideoScrub",
  component: VideoScrub,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          'A film whose frame follows the scroll (ADR-0025). It fills its positioned parent and measures its range on the section that holds it. The poster (the app\'s `<Image fill />`) paints first; the film (MP4 then WebM, `preload="none"`) downloads once the page is idle. Reduced motion shows `still`, or the poster.',
      },
    },
  },
  args: {
    sources: { mp4, webm },
    poster: <img src={NIGHT} alt="" />,
    still: <img src={DAWN} alt="" />,
    start: "top top",
    end: "bottom top",
    hold: 0.3,
  },
  render: (args) => (
    <>
      <Section scheme="dark" spacing="xl" className="relative h-svh">
        <VideoScrub {...args} />
      </Section>
      <Section spacing="xl">
        <Container>
          <Text tone="muted">After the film</Text>
        </Container>
      </Section>
    </>
  ),
} satisfies Meta<typeof VideoScrub>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Sunrise: Story = {
  play: async ({ canvasElement }) => {
    const film = canvasElement.querySelector("video");
    await expect(film).not.toBeNull();
    await waitFor(async () => {
      await expect(
        [...(film?.querySelectorAll("source") ?? [])].map((source) => source.type),
      ).toEqual(["video/mp4", "video/webm"]);
    });
  },
};
