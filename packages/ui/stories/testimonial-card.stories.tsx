import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { TestimonialCard } from "../src/components/testimonial-card.tsx";
import { Section } from "../src/layout/section.tsx";

const meta = {
  title: "Components/TestimonialCard",
  component: TestimonialCard,
  args: {
    photo: (
      <img
        src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%23bdc8cc'/%3E%3C/svg%3E"
        alt=""
      />
    ),
    name: "Corentin Lambert",
    jobTitle: "CEO, Revoltrain",
    children: "« Qualité, rigueur, rapidité et conseils de dingues. »",
    className: "max-w-sm",
  },
  render: (args) => (
    <Section tone="muted" spacing="sm">
      <TestimonialCard {...args} />
    </Section>
  ),
} satisfies Meta<typeof TestimonialCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnShiro: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("figure")).toBeVisible();
    await expect(canvas.getByText("Corentin Lambert")).toBeVisible();
    await expect(canvas.getByText(/Qualité, rigueur/u)).toBeVisible();
  },
};
