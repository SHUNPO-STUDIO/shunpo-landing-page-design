import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { PhotoStack } from "../src/components/photo-stack.tsx";

function swatch(fill: string): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Crect width='4' height='5' fill='%23${fill}'/%3E%3C/svg%3E`;
}

const photos = [
  <img key="kome" src={swatch("e5dfd3")} alt="A sheet of Shiro paper" />,
  <img key="tenku" src={swatch("2b718c")} alt="A sheet of Blue Tenku paper" />,
  <img key="hikari" src={swatch("bdc8cc")} alt="A sheet of Hikari Frost paper" />,
];

const meta = {
  title: "Components/PhotoStack",
  component: PhotoStack,
  args: {
    photos,
    active: 1,
    paper: <img src={swatch("f3f0e9")} alt="" />,
    className: "w-64",
  },
  parameters: { layout: "centered" },
} satisfies Meta<typeof PhotoStack>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PileUpToTheActivePrint: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "A sheet of Blue Tenku paper" })).toBeVisible();
    await expect(canvas.getByRole("img", { name: "A sheet of Shiro paper" })).toBeVisible();
    await expect(
      canvas.queryByRole("img", { name: "A sheet of Hikari Frost paper" }),
    ).not.toBeInTheDocument();
  },
};
