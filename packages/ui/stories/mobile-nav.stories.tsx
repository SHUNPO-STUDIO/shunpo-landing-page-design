import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { BrandLogo } from "../src/components/brand-logo.tsx";
import { ButtonLink } from "../src/components/button-link.tsx";
import { MobileNav } from "../src/components/mobile-nav.tsx";

const brand = (
  <a href="#top" aria-label="SHUNPO, accueil">
    <BrandLogo />
  </a>
);

const meta = {
  title: "Components/MobileNav",
  component: MobileNav,
  globals: { viewport: { value: "mobile2" } },
  args: {
    label: "Menu",
    openLabel: "Ouvrir le menu",
    closeLabel: "Fermer le menu",
    brand,
    action: (
      <ButtonLink href="#contact" variant="accent" corner="cut" arrow>
        Réserver une Immersion
      </ButtonLink>
    ),
    links: [
      { label: "Le système", href: "#systeme" },
      { label: "Méthode", href: "#methode" },
      { label: "Secteurs", href: "#secteurs" },
    ],
  },
} satisfies Meta<typeof MobileNav>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OpenAndClose: Story = {
  play: async ({ canvas, canvasElement }) => {
    await userEvent.click(canvas.getByRole("button", { name: "Ouvrir le menu" }));
    const page = within(canvasElement.ownerDocument.body);
    const dialog = await page.findByRole("dialog", { name: "Menu" });
    await waitFor(async () => {
      await expect(within(dialog).getByRole("link", { name: /Réserver/u })).toBeVisible();
    });

    await userEvent.keyboard("{Escape}");
    await waitFor(async () => {
      await expect(page.queryByRole("dialog")).toBeNull();
    });
  },
};
