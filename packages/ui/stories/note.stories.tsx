import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Note } from "../src/components/note.tsx";

const meta = {
  title: "Components/Note",
  component: Note,
  args: {
    children: "À partir de 5 000 € HT, remboursée sur la construction de la première brique.",
  },
} satisfies Meta<typeof Note>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Price: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText(/5 000 € HT/u)).toBeVisible();
  },
};
