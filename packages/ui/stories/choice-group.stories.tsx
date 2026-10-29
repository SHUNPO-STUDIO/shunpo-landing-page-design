import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";

import { ChoiceGroup } from "../src/components/choice-group.tsx";

const meta = {
  title: "Components/ChoiceGroup",
  component: ChoiceGroup,
  args: {
    legend: "Combien de personnes compte votre équipe ?",
    name: "equipe",
    options: [
      { value: "1-10", label: "1 à 10" },
      { value: "11-50", label: "11 à 50" },
      { value: "51-250", label: "51 à 250" },
      { value: "250+", label: "Plus de 250" },
    ],
    value: undefined,
    onValueChange: fn<(value: string) => void>(),
  },
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <ChoiceGroup
        {...args}
        value={value}
        onValueChange={(chosen) => {
          args.onValueChange(chosen);
          setValue(chosen);
        }}
      />
    );
  },
} satisfies Meta<typeof ChoiceGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PickWithPointer: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const group = canvas.getByRole("radiogroup", {
      name: "Combien de personnes compte votre équipe ?",
    });
    await expect(group).toBeVisible();

    await userEvent.click(canvas.getByRole("radio", { name: "11 à 50" }));

    await expect(canvas.getByRole("radio", { name: "11 à 50" })).toBeChecked();
    await expect(args.onValueChange).toHaveBeenCalledWith("11-50");
  },
};

export const PickWithKeyboard: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("radio", { name: "1 à 10" })).toHaveFocus();

    await userEvent.keyboard("{ArrowRight}");

    await expect(canvas.getByRole("radio", { name: "11 à 50" })).toBeChecked();
    await expect(args.onValueChange).toHaveBeenLastCalledWith("11-50");
  },
};

export const WithDescription: Story = {
  args: { description: "Question 2 sur 5", value: "51-250" },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("radiogroup")).toHaveAccessibleDescription("Question 2 sur 5");
    await expect(canvas.getByRole("radio", { name: "51 à 250" })).toBeChecked();
  },
};
