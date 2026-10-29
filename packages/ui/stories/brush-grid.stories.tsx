import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { BrushGrid } from "../src/components/brush-grid.tsx";
import { bricks } from "./support/folder-samples.tsx";

const meta = {
  title: "Components/BrushGrid",
  component: BrushGrid,
  args: { bricks, stamp: "Livré", caption: "Exemple · données fictives" },
} satisfies Meta<typeof BrushGrid>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Painted: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("figure")).toBeVisible();
    await expect(canvas.getByText("Exemple · données fictives")).toBeVisible();
    await expect(canvas.getByText("Pièces comptables")).toBeVisible();
    await expect(canvas.getAllByText("Livré")).toHaveLength(4);
  },
};

export const TwoBricks: Story = {
  args: { bricks: bricks.slice(0, 2) },
  play: async ({ canvas }) => {
    await expect(canvas.queryByText("Planning")).toBeNull();
  },
};
