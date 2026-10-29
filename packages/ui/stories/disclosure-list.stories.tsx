import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn, userEvent } from "storybook/test";

import { DisclosureList } from "../src/components/disclosure-list.tsx";

const items = [
  { title: "Cabinets comptables", body: "Les relances partent seules." },
  { title: "Gestion immobilière", body: "Chaque demande d’intervention est suivie." },
  { title: "BTP", body: "Les équipes remplissent le suivi depuis le chantier." },
];

function ControlledList() {
  const [open, setOpen] = useState(0);
  return <DisclosureList items={items} open={open} onOpenChange={setOpen} />;
}

const meta = {
  title: "Components/DisclosureList",
  component: DisclosureList,
  args: { items, open: 0, onOpenChange: fn<(index: number) => void>() },
  render: () => <ControlledList />,
} satisfies Meta<typeof DisclosureList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OneOpenAtATime: Story = {
  play: async ({ canvas }) => {
    const first = canvas.getByRole("button", { name: "Cabinets comptables" });
    const second = canvas.getByRole("button", { name: "Gestion immobilière" });
    await expect(first).toHaveAttribute("aria-expanded", "true");

    await userEvent.click(second);
    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");

    await userEvent.click(second);
    await expect(second).toHaveAttribute("aria-expanded", "true");
  },
};
