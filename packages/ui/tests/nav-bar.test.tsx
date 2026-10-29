import "../src/styles/globals.css";
import { describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page, userEvent } from "vitest/browser";

import { MobileNav } from "../src/components/mobile-nav.tsx";
import { NavBarLink } from "../src/components/nav-bar-link.tsx";
import { NavBarMenu } from "../src/components/nav-bar-menu.tsx";
import { NavBar } from "../src/components/nav-bar.tsx";
import { NavPanel } from "../src/components/nav-panel.tsx";

const panel = {
  kicker: "Secteurs",
  kana: "・セクター",
  title: "Un système taillé pour votre métier.",
  link: { label: "Tous les secteurs", href: "#secteurs" },
  rows: [{ title: "BTP", description: "Suivi de chantier", href: "#secteurs" }],
  feature: {
    kicker: "À la une",
    title: "Immersion",
    description: "Cinq jours sur le terrain.",
    action: { label: "Découvrir l’Immersion", href: "#methode" },
  },
};

function Header() {
  return (
    <NavBar
      label="Navigation principale"
      brand={<a href="#top">SHUNPO</a>}
      action={<a href="#contact">Réserver une Immersion</a>}
      menu={
        <MobileNav
          label="Menu"
          openLabel="Ouvrir le menu"
          closeLabel="Fermer le menu"
          brand={<a href="#top">SHUNPO</a>}
          action={<a href="#contact">Réserver une Immersion</a>}
          links={[{ label: "Méthode", href: "#methode" }]}
        />
      }
    >
      <NavBarLink href="#systeme">Le système</NavBarLink>
      <NavBarMenu label="Secteurs">
        <NavPanel {...panel} />
      </NavBarMenu>
    </NavBar>
  );
}

describe("NavBar", () => {
  it("opens a menu's panel from its trigger and closes it with Escape, back on the trigger", async () => {
    await page.viewport(1280, 800);
    const screen = await render(<Header />);
    const trigger = screen.getByRole("button", { name: "Secteurs" });

    await trigger.click();
    await expect.element(screen.getByRole("link", { name: /BTP/u })).toBeVisible();
    await expect.element(screen.getByRole("link", { name: "Découvrir l’Immersion" })).toBeVisible();

    await userEvent.keyboard("{Escape}");
    await expect.element(screen.getByRole("link", { name: /BTP/u })).not.toBeInTheDocument();
    await expect.element(trigger).toHaveFocus();
  });

  it("keeps desktop entries out of small screens, where the menu button takes over", async () => {
    await page.viewport(390, 844);
    const screen = await render(<Header />);

    await expect.element(screen.getByRole("button", { name: "Ouvrir le menu" })).toBeVisible();
    await expect
      .element(screen.getByRole("link", { name: "Le système", includeHidden: true }))
      .not.toBeVisible();
    await expect
      .element(screen.getByRole("link", { name: "Réserver une Immersion", includeHidden: true }))
      .not.toBeVisible();
  });

  it("closes the small-screen menu when a destination is chosen", async () => {
    await page.viewport(390, 844);
    const screen = await render(<Header />);

    await screen.getByRole("button", { name: "Ouvrir le menu" }).click();
    const dialog = screen.getByRole("dialog", { name: "Menu" });
    await expect.element(dialog).toBeVisible();

    await dialog.getByRole("link", { name: "Méthode" }).click();
    await expect.element(dialog).not.toBeInTheDocument();
  });

  it("closes the small-screen menu from its close button", async () => {
    await page.viewport(390, 844);
    const screen = await render(<Header />);

    await screen.getByRole("button", { name: "Ouvrir le menu" }).click();
    await screen.getByRole("button", { name: "Fermer le menu" }).click();

    await expect.element(screen.getByRole("dialog", { name: "Menu" })).not.toBeInTheDocument();
  });
});
