import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { CasePanel } from "../src/components/case-panel.tsx";
import { PanelReveal } from "../src/motion/panel-reveal.tsx";

const backdrop = (
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 9'%3E%3Crect width='16' height='9' fill='%232b718c'/%3E%3C/svg%3E"
    alt=""
  />
);

const meta = {
  title: "Components/CasePanel",
  component: CasePanel,
  parameters: { layout: "fullscreen" },
  args: {
    as: "li",
    backdrop,
    logo: <span>Ops Clean</span>,
    client: "Ops Clean",
    sector: "Industrie",
    figure: "1 M€+",
    figureLabel: "De chiffre d’affaires annuel",
    children: "Nous avons migré la boutique de Wix vers Shopify en deux mois.",
  },
  render: (args) => (
    <PanelReveal>
      <CasePanel {...args} />
    </PanelReveal>
  ),
} satisfies Meta<typeof CasePanel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Case: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 3 })).toHaveTextContent(/Shopify/u);
    const terms = canvas.getAllByRole("term");
    await expect(terms.map((term) => term.textContent)).toEqual([
      "Client",
      "Secteur",
      "De chiffre d’affaires annuel",
    ]);
    await expect(canvas.getByText("1 M€+")).toBeInTheDocument();
    await expect(canvas.getByText("Industrie")).toBeInTheDocument();
  },
};
