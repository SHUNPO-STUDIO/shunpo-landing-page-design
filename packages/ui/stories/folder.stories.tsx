import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { FolderList } from "../src/components/folder-list.tsx";
import { Folder } from "../src/components/folder.tsx";
import { SampleFolders, SplitSheet } from "./support/folder-samples.tsx";

const meta = {
  title: "Components/Folder",
  component: Folder,
  args: {
    tab: "Étape 1 · Voir",
    kanji: "見",
    title: "Immersion",
    caption: "5 jours sur le terrain",
    children: <SplitSheet />,
  },
  render: (args) => (
    <FolderList>
      <Folder {...args} />
    </FolderList>
  ),
} satisfies Meta<typeof Folder>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Kome: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Étape 1 · Voir")).toBeVisible();
    await expect(canvas.getByRole("article")).toBeVisible();
  },
};

export const Tones: Story = {
  render: () => (
    <FolderList>
      <SampleFolders />
    </FolderList>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Étape 3 · Avancer")).toBeVisible();
  },
};
