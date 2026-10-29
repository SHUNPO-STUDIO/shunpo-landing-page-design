import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Inline } from "../src/layout/inline.tsx";
import { Kanji } from "../src/typography/kanji.tsx";

const meta = {
  title: "Typography/Kanji",
  component: Kanji,
  args: { children: "瞬歩" },
} satisfies Meta<typeof Kanji>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("瞬歩")).toHaveAttribute("lang", "ja");
  },
};

export const Sizes: Story = {
  render: () => (
    <Inline gap="lg" align="end">
      <Kanji size="sm">見</Kanji>
      <Kanji size="md">築</Kanji>
      <Kanji size="lg">進</Kanji>
    </Inline>
  ),
};

export const Watermark: Story = { args: { children: "築", size: "xl", tone: "watermark" } };
