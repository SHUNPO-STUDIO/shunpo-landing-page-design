import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent } from "storybook/test";

import { Container } from "../src/layout/container.tsx";
import { Section } from "../src/layout/section.tsx";
import { Marquee } from "../src/motion/marquee.tsx";
import { Text } from "../src/typography/text.tsx";

const names = ["lemlist", "Carte Noire", "Ops Clean", "HETIC", "Revoltrain", "Y-Brush"];

const meta = {
  title: "Motion/Marquee",
  component: Marquee,
  parameters: { layout: "fullscreen" },
  args: {
    pauseLabel: "Mettre en pause le défilement des logos",
    children: names.map((name) => (
      <Text key={name} as="span" size="lg" weight="semibold">
        {name}
      </Text>
    )),
  },
  render: (args) => (
    <Section spacing="sm" aria-label="Ils nous confient leurs outils">
      <Container>
        <Marquee {...args} />
      </Container>
    </Section>
  ),
} satisfies Meta<typeof Marquee>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Drifting: Story = {
  play: async ({ canvas }) => {
    const toggle = canvas.getByRole("button", { name: "Mettre en pause le défilement des logos" });
    await userEvent.hover(canvas.getByRole("list"));
    await userEvent.unhover(canvas.getByRole("list"));
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(toggle);
    await expect(toggle).toHaveAttribute("aria-pressed", "false");
  },
};
