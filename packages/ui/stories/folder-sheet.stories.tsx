import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { FolderSheet } from "../src/components/folder-sheet.tsx";
import { FeatureSheet, SplitSheet } from "./support/folder-samples.tsx";

const meta = {
  title: "Components/FolderSheet",
  component: FolderSheet,
  args: { kanji: "見", children: null },
} satisfies Meta<typeof FolderSheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Split: Story = {
  render: () => <SplitSheet />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("article", { name: "Immersion" })).toBeVisible();
  },
};

export const Feature: Story = {
  render: () => <FeatureSheet />,
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("article", { name: "Construction" })).toBeVisible();
    await expect(canvas.getByRole("figure")).toBeVisible();
  },
};
