import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor } from "storybook/test";

import { BrandLogo } from "../src/components/brand-logo.tsx";
import { ButtonLink } from "../src/components/button-link.tsx";
import { MobileNav } from "../src/components/mobile-nav.tsx";
import { NavBarLink } from "../src/components/nav-bar-link.tsx";
import { NavBarMenu } from "../src/components/nav-bar-menu.tsx";
import { NavBar } from "../src/components/nav-bar.tsx";
import { NavPanel } from "../src/components/nav-panel.tsx";

const brand = (
  <a href="#top" aria-label="SHUNPO, accueil">
    <BrandLogo />
  </a>
);
const cta = (
  <ButtonLink href="#contact" variant="accent" size="sm" corner="cut" arrow>
    Réserver une Immersion
  </ButtonLink>
);
const immersion = {
  kicker: "À la une",
  title: "Immersion",
  description: "Cinq jours sur le terrain pour repérer ce qui coûte du temps à vos équipes.",
  action: { label: "Découvrir l’Immersion", href: "#methode" },
};

const meta = {
  title: "Components/NavBar",
  component: NavBar,
  subcomponents: { NavBarLink, NavBarMenu, NavPanel },
  parameters: { layout: "fullscreen" },
  args: {
    label: "Navigation principale",
    brand,
    action: cta,
    menu: (
      <MobileNav
        label="Menu"
        openLabel="Ouvrir le menu"
        closeLabel="Fermer le menu"
        brand={brand}
        action={cta}
        links={[
          { label: "Le système", href: "#systeme" },
          { label: "Secteurs", href: "#secteurs" },
        ]}
      />
    ),
    children: (
      <>
        <NavBarLink href="#systeme">Le système</NavBarLink>
        <NavBarMenu label="Secteurs">
          <NavPanel
            kicker="Secteurs"
            kana="・セクター"
            title="Un système taillé pour votre métier."
            link={{ label: "Tous les secteurs", href: "#secteurs" }}
            rows={[
              { title: "Cabinets comptables", description: "Relances, saisie", href: "#secteurs" },
              { title: "BTP", description: "Suivi de chantier", href: "#secteurs" },
            ]}
            feature={immersion}
          />
        </NavBarMenu>
        <NavBarLink href="#realisations">Réalisations</NavBarLink>
        <NavBarMenu label="L’agence">
          <NavPanel
            kicker="L’agence"
            kana="・エージェンシー"
            title="Une équipe à Lyon, sur le terrain avec vous."
            rows={[{ title: "L’équipe", description: "Les visages", href: "#agence" }]}
            feature={immersion}
          />
        </NavBarMenu>
      </>
    ),
  },
} satisfies Meta<typeof NavBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("link", { name: "Le système" })).toHaveAttribute(
      "href",
      "#systeme",
    );
    await expect(canvas.getByRole("link", { name: /Réserver une Immersion/u })).toBeVisible();
  },
};

async function openWithKeyboard(trigger: HTMLElement): Promise<void> {
  trigger.focus();
  await userEvent.keyboard("{Enter}");
}

export const MenuOpen: Story = {
  play: async ({ canvas, canvasElement }) => {
    const body = canvasElement.ownerDocument.body;
    const sectors = canvas.getByRole("button", { name: "Secteurs" });
    await openWithKeyboard(sectors);
    await waitFor(async () => {
      await expect(body).toHaveTextContent("Un système taillé pour votre métier.");
    });
    await userEvent.keyboard("{Escape}");
    await waitFor(async () => {
      await expect(sectors).toHaveFocus();
    });

    await openWithKeyboard(canvas.getByRole("button", { name: "L’agence" }));
    await waitFor(async () => {
      await expect(body).toHaveTextContent("Une équipe à Lyon, sur le terrain avec vous.");
    });
    await userEvent.keyboard("{Escape}");
    await waitFor(async () => {
      await expect(body).not.toHaveTextContent("Une équipe à Lyon");
    });
  },
};

export const SmallScreen: Story = {
  globals: { viewport: { value: "mobile2" } },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("button", { name: "Ouvrir le menu" })).toBeVisible();
  },
};
