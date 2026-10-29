import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Rating } from "../src/components/rating.tsx";

const meta = {
  title: "Components/Rating",
  component: Rating,
  args: { value: 4.6, starsLabel: "Note de 4,6 sur 5", children: "4,6/5 sur Trustpilot" },
} satisfies Meta<typeof Rating>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Centred: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("4,6/5 sur Trustpilot")).toBeVisible();
    await expect(canvas.getByText("Note de 4,6 sur 5")).toBeInTheDocument();
  },
};

export const Start: Story = {
  args: { align: "start", value: 4, starsLabel: "Note de 4 sur 5", children: "4/5" },
};
