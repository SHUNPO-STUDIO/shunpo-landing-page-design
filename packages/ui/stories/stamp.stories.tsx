import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Stamp } from "../src/components/stamp.tsx";
import { Inline } from "../src/layout/inline.tsx";

const meta = {
  title: "Components/Stamp",
  component: Stamp,
  args: { children: "Livré" },
} satisfies Meta<typeof Stamp>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Seal: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Livré")).toBeVisible();
  },
};

export const Words: Story = {
  render: () => (
    <Inline gap="md">
      <Stamp>Saisi une fois</Stamp>
      <Stamp>Classé</Stamp>
      <Stamp size="sm">Partagé</Stamp>
      <Stamp tone="ink">À jour</Stamp>
    </Inline>
  ),
};
