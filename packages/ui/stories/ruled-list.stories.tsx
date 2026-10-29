import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { RuledList } from "../src/components/ruled-list.tsx";

const meta = {
  title: "Components/RuledList",
  component: RuledList,
  args: {
    children: [
      <li key="map">La carte de vos process</li>,
      <li key="hours">Vos heures perdues, chiffrées</li>,
      <li key="roadmap">Une feuille de route priorisée</li>,
    ],
  },
} satisfies Meta<typeof RuledList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Deliverables: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
  },
};
