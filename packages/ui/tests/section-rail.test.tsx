import "../src/styles/globals.css";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";
import { page } from "vitest/browser";

import { SectionRail } from "../src/components/section-rail.tsx";

const items = [
  { href: "#pains", label: "Le système" },
  { href: "#method", label: "Méthode" },
  { href: "#missing", label: "Absente" },
];

function Page() {
  return (
    <>
      <SectionRail label="Sommaire de la page" items={items} />
      <section className="h-dvh">Hero</section>
      <section id="pains" className="h-dvh">
        Pains
      </section>
      <section id="method" className="h-dvh bg-background scheme-dark">
        Method
      </section>
      <section className="h-dvh">End</section>
    </>
  );
}

function scrollTo(screens: number): void {
  window.scrollTo(0, window.innerHeight * screens);
}

beforeEach(async () => {
  await page.viewport(1440, 900);
});

afterEach(() => {
  window.scrollTo(0, 0);
});

describe("SectionRail", () => {
  it("stays out of sight until the first listed section reaches the middle of the screen", async () => {
    const screen = await render(<Page />);

    await expect.element(screen.getByRole("navigation", { includeHidden: true })).not.toBeVisible();

    scrollTo(1);
    await expect.element(screen.getByRole("navigation")).toBeVisible();
  });

  it("numbers the sections and marks the one being read", async () => {
    const screen = await render(<Page />);

    scrollTo(1);
    await expect
      .element(screen.getByRole("link", { name: "01 Le système" }))
      .toHaveAttribute("aria-current", "location");

    scrollTo(2);
    await expect
      .element(screen.getByRole("link", { name: "02 Méthode" }))
      .toHaveAttribute("aria-current", "location");
    await expect
      .element(screen.getByRole("link", { name: "01 Le système" }))
      .not.toHaveAttribute("aria-current");
  });

  it("gives each number the colours of the section under it", async () => {
    const screen = await render(<Page />);
    const first = screen.getByRole("listitem").first();
    const last = screen.getByRole("listitem").last();

    scrollTo(1);
    await expect.element(first).toHaveClass("scheme-light");

    scrollTo(1.5);
    await expect.element(first).toHaveClass("scheme-light");
    await expect.element(last).toHaveClass("scheme-dark");
  });

  it("is reserved for wide screens, where it never meets centred content", async () => {
    await page.viewport(1024, 800);
    const screen = await render(<Page />);

    scrollTo(1);
    await expect.element(screen.getByRole("navigation", { includeHidden: true })).not.toBeVisible();
  });
});
