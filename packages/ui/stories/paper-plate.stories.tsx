import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { PaperPlate } from "../src/components/paper-plate.tsx";
import { Stamp } from "../src/components/stamp.tsx";

const meta = {
  title: "Components/PaperPlate",
  component: PaperPlate,
  parameters: {
    docs: {
      description: {
        component:
          'A photographic print on white paper: the picture, its number and title in the margin, and the `Stamp` that approves it. Apps pass `image={<Image src={…} alt="…" sizes="…" />}` from next/image.',
      },
    },
  },
  args: {
    image: (
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Crect width='4' height='5' fill='%23b9b4aa'/%3E%3C/svg%3E"
        alt="Figurine en papier washi"
        width={400}
        height={500}
      />
    ),
    number: "01",
    caption: "Ressaisie",
    className: "max-w-compact",
  },
} satisfies Meta<typeof PaperPlate>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Plain: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("img", { name: "Figurine en papier washi" })).toBeVisible();
    await expect(canvas.getByText("Ressaisie")).toBeVisible();
  },
};

export const Stamped: Story = {
  args: { stamp: <Stamp size="sm">Saisi une fois</Stamp> },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Saisi une fois")).toBeVisible();
  },
};
