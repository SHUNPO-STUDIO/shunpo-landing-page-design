import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { IdBadge } from "../src/components/id-badge.tsx";

const portrait = (
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%238d8a84'/%3E%3C/svg%3E"
    alt="Portrait en papier washi : figurine en kimono tenant un éventail"
  />
);

const meta = {
  title: "Components/IdBadge",
  component: IdBadge,
  args: {
    image: portrait,
    tag: "Équipe projet",
    jobTitle: "Business Architect",
    profile: "Un chef d’entreprise",
    children:
      "Il parle votre langage, comprend vos enjeux business et les traduit en besoins techniques.",
    className: "max-w-sm",
  },
} satisfies Meta<typeof IdBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("heading", { level: 3, name: "Business Architect" }),
    ).toBeVisible();
    await expect(canvas.getByText("SHUNPO")).toBeInTheDocument();
    await expect(
      canvas.getByRole("img", { name: /figurine en kimono tenant un éventail/u }),
    ).toBeVisible();
  },
};
