import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { BrandLogo } from "../src/components/brand-logo.tsx";
import { ComparisonCard } from "../src/components/comparison-card.tsx";

const meta = {
  title: "Components/ComparisonCard",
  component: ComparisonCard,
  args: {
    title: "ERP ou SaaS standard",
    claim: "Vous vous adaptez à l’outil.",
    items: [
      "Vos équipes peinent à adopter le logiciel de l’éditeur.",
      "Un outil de plus, qui s’ajoute aux autres.",
      "Vous subissez le rythme de l’éditeur.",
    ],
  },
} satisfies Meta<typeof ComparisonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Standard: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 3 })).toHaveTextContent(
      "ERP ou SaaS standard",
    );
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
  },
};

export const Custom: Story = {
  args: {
    tone: "custom",
    title: <BrandLogo size="sm" />,
    label: "Système sur mesure",
    claim: "L’outil s’adapte à vous.",
    items: [
      "Le système suit votre façon de travailler.",
      "Vos outils réunis dans une seule interface.",
      "Vous donnez le tempo, on suit votre rythme.",
    ],
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 3 })).toHaveTextContent(
      "SHUNPO Système sur mesure",
    );
    await expect(canvas.getByRole("article")).toHaveAttribute("data-slot", "comparison-card");
  },
};
