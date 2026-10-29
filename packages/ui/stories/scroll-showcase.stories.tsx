import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { ScrollShowcase } from "../src/motion/scroll-showcase.tsx";
import { Heading } from "../src/typography/heading.tsx";
import { Text } from "../src/typography/text.tsx";

function swatch(fill: string): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Crect width='4' height='5' fill='%23${fill}'/%3E%3C/svg%3E`;
}

const meta = {
  title: "Motion/ScrollShowcase",
  component: ScrollShowcase,
  parameters: { layout: "fullscreen" },
  args: {
    intro: (
      <Heading level={2} size="display">
        Ce que ça change dans votre quotidien.
      </Heading>
    ),
    outro: <Text size="lg">Quel que soit votre secteur, on peut vous accompagner.</Text>,
    items: [
      {
        title: "Cabinets comptables",
        body: "Les relances partent seules.",
        photo: <img key="a" src={swatch("e5dfd3")} alt="Shiro paper" />,
      },
      {
        title: "BTP",
        body: "Heures et matériel remontent sans ressaisie.",
        photo: <img key="b" src={swatch("2b718c")} alt="Blue Tenku paper" />,
      },
    ],
  },
} satisfies Meta<typeof ScrollShowcase>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstItemOpen: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 2 })).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Cabinets comptables" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    await expect(canvas.getByRole("img", { name: "Shiro paper" })).toBeVisible();
  },
};
