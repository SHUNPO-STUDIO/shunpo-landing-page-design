import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Container } from "../src/layout/container.tsx";
import { Section } from "../src/layout/section.tsx";
import { PhotoStage } from "../src/motion/photo-stage.tsx";
import { Text } from "../src/typography/text.tsx";

const PHOTO =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%231e2629'/%3E%3Cpath d='M9 0h3L8 9H5z' fill='%23e5dfd3' opacity='.35'/%3E%3C/svg%3E";

const meta = {
  title: "Motion/PhotoStage",
  component: PhotoStage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A full-screen sheet of Kome paper framing one 16:9 photograph, as large as the stage allows and never cropped. It covers the pinned scene before it (`z-10`, opaque), then holds for half a screen from md before the page moves on.",
      },
    },
  },
  args: {
    image: (
      <img
        src={PHOTO}
        alt="Une personne de dos face à un mur de schémas"
        className="absolute inset-0 size-full"
      />
    ),
  },
  render: (args) => (
    <>
      <PhotoStage {...args} />
      <Section spacing="xl">
        <Container>
          <Text tone="muted">After the photograph</Text>
        </Container>
      </Section>
    </>
  ),
} satisfies Meta<typeof PhotoStage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Film: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("img", { name: "Une personne de dos face à un mur de schémas" }),
    ).toBeVisible();
  },
};
