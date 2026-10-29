import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect } from "storybook/test";

import { Button } from "../src/components/button.tsx";
import { Readout } from "../src/components/readout.tsx";
import { Stack } from "../src/layout/stack.tsx";

const meta = {
  title: "Components/Readout",
  component: Readout,
  args: {
    label: "Première estimation",
    hint: "Choisissez une réponse pour la voir.",
    value: undefined,
    unit: "h perdues par mois",
    announcement: "",
  },
} satisfies Meta<typeof Readout>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Pending: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Choisissez une réponse pour la voir.")).toBeVisible();
    await expect(canvas.getByText("h perdues par mois")).not.toBeVisible();
    await expect(canvas.getByRole("status")).toBeEmptyDOMElement();
  },
};

export const Figure: Story = {
  args: {
    hint: "Données fictives.",
    value: 124,
    announcement: "Première estimation : 124 heures perdues par mois.",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("h perdues par mois")).toBeVisible();
    await expect(canvas.getByText("124")).toBeInTheDocument();
  },
};

export const AnnouncesEachNewFigure: Story = {
  render: function Render(args) {
    const [value, setValue] = useState<number>();
    return (
      <Stack gap="lg" align="start">
        <Readout
          {...args}
          value={value}
          announcement={value === undefined ? "" : `Première estimation : ${value} heures.`}
        />
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            setValue(612);
          }}
        >
          Estimer
        </Button>
      </Stack>
    );
  },
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Estimer" }));

    await expect(canvas.getByRole("status")).toHaveTextContent("Première estimation : 612 heures.");
    await expect(canvas.getByText("h perdues par mois")).toBeVisible();
  },
};
