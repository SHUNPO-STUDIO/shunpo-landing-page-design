import "../src/styles/globals.css";
import { afterEach, describe, expect, it } from "vitest";
import { render } from "vitest-browser-react";

import { AdaptiveHeader } from "../src/components/adaptive-header.tsx";

interface PageProps {
  menuOpen?: boolean;
}

function Page({ menuOpen = false }: PageProps) {
  return (
    <>
      <AdaptiveHeader data-testid="header">
        <button type="button" className="h-20" data-popup-open={menuOpen ? "" : undefined}>
          Menu
        </button>
      </AdaptiveHeader>
      <main>
        <section className="h-dvh bg-background scheme-dark">Opening</section>
        <section className="h-dvh">Paper</section>
        <section className="h-dvh bg-background scheme-dark">Island</section>
        <section className="h-dvh">End</section>
      </main>
    </>
  );
}

function scrollTo(screens: number): void {
  window.scrollTo(0, window.innerHeight * screens);
}

afterEach(() => {
  window.scrollTo(0, 0);
});

describe("AdaptiveHeader", () => {
  it("is clear with light text over a dark opening section", async () => {
    const screen = await render(<Page />);
    const header = screen.getByTestId("header");

    await expect.element(header).toHaveAttribute("data-scheme", "dark");
    await expect.element(header).toHaveClass("bg-transparent");
  });

  it("is a solid bar from the start on a page without a main opening section", async () => {
    const screen = await render(
      <>
        <AdaptiveHeader data-testid="header" />
        <section className="h-dvh">Paper</section>
      </>,
    );

    await expect.element(screen.getByTestId("header")).toHaveClass("bg-background");
  });

  it("becomes a solid paper bar once the opening section is behind it", async () => {
    const screen = await render(<Page />);
    const header = screen.getByTestId("header");

    scrollTo(1.5);

    await expect.element(header).toHaveAttribute("data-scheme", "light");
    await expect.element(header).toHaveClass("bg-background");
  });

  it("takes light text again over a dark island further down", async () => {
    const screen = await render(<Page />);
    const header = screen.getByTestId("header");

    scrollTo(2.5);

    await expect.element(header).toHaveAttribute("data-scheme", "dark");
    await expect.element(header).toHaveClass("bg-background");
  });

  it("hides while scrolling down and comes back on the way up", async () => {
    const screen = await render(<Page />);
    const header = screen.getByTestId("header");

    scrollTo(1.5);
    await expect.element(header).toHaveClass("-translate-y-full");

    scrollTo(1.2);
    await expect.element(header).toHaveClass("translate-y-0");
  });

  it("comes back when a control inside receives focus", async () => {
    const screen = await render(<Page />);
    const header = screen.getByTestId("header");

    scrollTo(1.5);
    await expect.element(header).toHaveClass("-translate-y-full");

    screen.getByRole("button", { name: "Menu" }).element().focus();
    await expect.element(header).toHaveClass("translate-y-0");
  });

  it("turns into paper while a menu inside is open", async () => {
    const screen = await render(<Page />);
    const header = screen.getByTestId("header");

    await expect.element(header).toHaveAttribute("data-scheme", "dark");
    await screen.rerender(<Page menuOpen />);

    await expect.element(header).toHaveAttribute("data-scheme", "light");
    await expect.element(header).toHaveClass("bg-background");
  });
});
