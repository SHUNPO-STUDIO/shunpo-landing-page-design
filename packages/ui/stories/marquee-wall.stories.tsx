import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { TestimonialCard } from "../src/components/testimonial-card.tsx";
import { MarqueeColumn } from "../src/motion/marquee-column.tsx";
import { MarqueeWall } from "../src/motion/marquee-wall.tsx";

const photo = (
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23bdc8cc'/%3E%3C/svg%3E"
    alt=""
  />
);

const columns = [
  ["Corentin Lambert", "Sophie Reneaume"],
  ["Simon Brossard", "Fanny Ocler"],
  ["Ludovic Donnadieu", "Émilie Giust"],
];

const meta = {
  title: "Motion/MarqueeWall",
  component: MarqueeWall,
  parameters: {
    docs: {
      description: {
        component:
          "Columns (`MarqueeColumn`) loop without a seam in alternating directions, rows on phones. They ease to a stop under the pointer, off screen and with the pause toggle; under reduced motion every item stands still, once.",
      },
    },
  },
  args: {
    pauseLabel: "Mettre en pause le défilement des avis",
    children: columns.map((names) => (
      <MarqueeColumn key={names[0]}>
        {names.map((name) => (
          <TestimonialCard key={name} photo={photo} name={name} jobTitle="CEO">
            « Une équipe à l’écoute, des délais tenus. »
          </TestimonialCard>
        ))}
      </MarqueeColumn>
    )),
  },
} satisfies Meta<typeof MarqueeWall>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Wall: Story = {
  play: async ({ canvas, userEvent }) => {
    await expect(canvas.getAllByRole("figure")).toHaveLength(6);
    const pause = canvas.getByRole("button", { name: "Mettre en pause le défilement des avis" });
    await userEvent.click(pause);
    await expect(pause).toHaveAttribute("aria-pressed", "true");
  },
};
