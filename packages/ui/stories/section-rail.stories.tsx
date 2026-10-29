import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { SectionRail } from "../src/components/section-rail.tsx";
import { Container } from "../src/layout/container.tsx";
import { Section } from "../src/layout/section.tsx";
import { Heading } from "../src/typography/heading.tsx";

const meta = {
  title: "Components/SectionRail",
  component: SectionRail,
  parameters: { layout: "fullscreen" },
  globals: { viewport: { value: "desktop" } },
  args: {
    label: "Sommaire de la page",
    items: [
      { href: "#systeme", label: "Le système" },
      { href: "#methode", label: "Méthode" },
      { href: "#avis", label: "Avis clients" },
    ],
  },
  render: (args) => (
    <>
      <SectionRail {...args} />
      <Section className="h-dvh">
        <Container>
          <Heading level={1}>Scroll: the rail appears with the first listed section</Heading>
        </Container>
      </Section>
      <Section id="systeme" className="h-dvh">
        <Container>
          <Heading level={2}>Le système</Heading>
        </Container>
      </Section>
      <Section id="methode" scheme="dark" className="h-dvh">
        <Container>
          <Heading level={2}>Méthode</Heading>
        </Container>
      </Section>
      <Section id="avis" className="h-dvh">
        <Container>
          <Heading level={2}>Avis clients</Heading>
        </Container>
      </Section>
    </>
  ),
} satisfies Meta<typeof SectionRail>;

export default meta;

type Story = StoryObj<typeof meta>;

export const MarksTheSectionBeingRead: Story = {
  play: async ({ canvas, canvasElement }) => {
    const view = canvasElement.ownerDocument.defaultView;
    view?.scrollTo(0, view.innerHeight * 2);
    await waitFor(async () => {
      await expect(canvas.getByRole("link", { name: "02 Méthode" })).toHaveAttribute(
        "aria-current",
        "location",
      );
    });
    view?.scrollTo(0, 0);
  },
};
