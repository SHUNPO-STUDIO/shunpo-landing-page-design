import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { IdBadge } from "../src/components/id-badge.tsx";
import { Lanyard } from "../src/components/lanyard.tsx";
import { Inline } from "../src/layout/inline.tsx";

const portrait = (
  <img
    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect width='1' height='1' fill='%238d8a84'/%3E%3C/svg%3E"
    alt=""
  />
);

/* The drop-in fades the content in: wait until it is fully opaque before checking it (and its contrast). */
async function settled(root: HTMLElement): Promise<void> {
  await waitFor(
    () => {
      const dropping = [...root.querySelectorAll("[data-slot=swing]")].some(
        (swing) => getComputedStyle(swing).opacity !== "1",
      );
      if (dropping) {
        throw new Error("Still dropping in");
      }
    },
    { timeout: 4000 },
  );
}

const roles = [
  { jobTitle: "Business Architect", profile: "Un chef d’entreprise", tilt: "left" },
  { jobTitle: "Experience Architect", profile: "Un expert UX/UI", tilt: "right" },
  { jobTitle: "AI Architect", profile: "Un pur développeur spécialisé en IA", tilt: "slight" },
] as const;

const meta = {
  title: "Components/Lanyard",
  component: Lanyard,
  parameters: {
    docs: {
      description: {
        component:
          'Hangs a badge from a Fuji Night strap at a slight tilt. It drops in with a damped swing when scrolled into view and sways under the pointer (`Swing`); still under reduced motion. Racks of up to three go in `Inline as="ul" justify="center" gap="none"`.',
      },
    },
  },
  args: { tilt: "left" },
} satisfies Meta<typeof Lanyard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Rack: Story = {
  render: () => (
    <Inline as="ul" justify="center" align="start" gap="none">
      {roles.map((role, order) => (
        <Lanyard key={role.jobTitle} as="li" tilt={role.tilt} order={order}>
          <IdBadge
            image={portrait}
            tag="Équipe projet"
            jobTitle={role.jobTitle}
            profile={role.profile}
          >
            Il construit l’architecture de votre système et connecte vos outils.
          </IdBadge>
        </Lanyard>
      ))}
    </Inline>
  ),
  play: async ({ canvas, canvasElement, userEvent }) => {
    await settled(canvasElement);
    const badge = canvas.getByRole("heading", { name: "Experience Architect" });
    await userEvent.hover(badge);
    await expect(badge).toBeVisible();
    await expect(canvas.getAllByRole("listitem")).toHaveLength(3);
  },
};
