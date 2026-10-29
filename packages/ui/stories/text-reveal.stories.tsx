import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { Container } from "../src/layout/container.tsx";
import { Section } from "../src/layout/section.tsx";
import { TextReveal } from "../src/motion/text-reveal.tsx";
import { Heading } from "../src/typography/heading.tsx";

const meta = {
  title: "Motion/TextReveal",
  component: TextReveal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Splits one heading into masked lines (or words) that rise into place, on page load or once its section is well into the screen. Lines carry `data-reveal-line`, so a scene can send them out the same way. Reduced motion: plain text.",
      },
    },
  },
  args: {
    play: "load",
    by: "lines",
    children: (
      <Heading level={1} size="headline">
        On construit le système qui fait tourner votre entreprise, boosté à l’IA.
      </Heading>
    ),
  },
  render: (args) => (
    <Section spacing="xl">
      <Container>
        <TextReveal {...args} />
      </Container>
    </Section>
  ),
} satisfies Meta<typeof TextReveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LinesOnLoad: Story = {
  play: async ({ canvas }) => {
    const heading = await canvas.findByRole("heading", {
      name: "On construit le système qui fait tourner votre entreprise, boosté à l’IA.",
    });
    await waitFor(async () => {
      await expect(heading).toBeVisible();
    });
  },
};

export const WordsOnEnter: Story = {
  args: {
    play: "enter",
    by: "words",
    children: (
      <Heading level={2} size="headline">
        Construisons le dernier logiciel dont vous aurez besoin.
      </Heading>
    ),
  },
  play: async ({ canvas }) => {
    await expect(await canvas.findByRole("heading", { level: 2 })).toBeInTheDocument();
  },
};
