import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Statement } from "../src/components/statement.tsx";
import { Container } from "../src/layout/container.tsx";
import { Section } from "../src/layout/section.tsx";

const meta = {
  title: "Components/Statement",
  component: Statement,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A centred two-sentence statement under the shuriken: `lead` in regular weight, `emphasis` in semibold. On entering, the shuriken turns a quarter into place and each sentence rises out of its mask, once.",
      },
    },
  },
  args: {
    lead: "On ne vend pas de la tech.",
    emphasis: "On construit ce qui fait croître votre business.",
  },
  render: (args) => (
    <Section tone="surface" spacing="xl">
      <Container size="narrow">
        <Statement {...args} />
      </Container>
    </Section>
  ),
} satisfies Meta<typeof Statement>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 2 })).toHaveTextContent(
      "On ne vend pas de la tech. On construit ce qui fait croître votre business.",
    );
  },
};
