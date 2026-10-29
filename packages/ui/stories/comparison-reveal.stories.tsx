import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { ComparisonCard } from "../src/components/comparison-card.tsx";
import { ComparisonReveal } from "../src/motion/comparison-reveal.tsx";
import { Text } from "../src/typography/text.tsx";

const meta = {
  title: "Motion/ComparisonReveal",
  component: ComparisonReveal,
  parameters: { layout: "padded" },
  args: {
    standard: (
      <ComparisonCard
        tone="standard"
        title="ERP ou SaaS standard"
        claim="Vous vous adaptez à l’outil."
        items={["Un outil de plus, qui s’ajoute aux autres."]}
      />
    ),
    custom: (
      <ComparisonCard
        tone="custom"
        title="Système sur mesure"
        claim="L’outil s’adapte à vous."
        items={["Vos outils réunis dans une seule interface."]}
      />
    ),
    note: (
      <Text size="xs" tone="muted">
        Sources : Pendo, 2026 ; Panorama Consulting, 2026
      </Text>
    ),
  },
} satisfies Meta<typeof ComparisonReveal>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StandardThenCustom: Story = {
  play: async ({ canvas }) => {
    const sides = canvas.getAllByRole("article");
    await expect(sides).toHaveLength(2);
    await expect(sides[0]).toHaveTextContent("ERP ou SaaS standard");
    await expect(canvas.getByText(/Sources/u)).toBeInTheDocument();
  },
};
