import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { BrandLogo } from "../src/components/brand-logo.tsx";
import { FooterColumns } from "../src/components/footer-columns.tsx";
import { FooterNav } from "../src/components/footer-nav.tsx";
import { Container } from "../src/layout/container.tsx";
import { Section } from "../src/layout/section.tsx";
import { Text } from "../src/typography/text.tsx";

const meta = {
  title: "Components/FooterColumns",
  component: FooterColumns,
  subcomponents: { FooterNav },
  parameters: { layout: "fullscreen" },
  args: {
    lead: (
      <>
        <BrandLogo />
        <Text size="sm" tone="muted">
          SHUNPO est une agence lyonnaise qui construit des logiciels métier sur mesure, boostés à
          l’IA, pour les entreprises de 20 à 250 salariés.
        </Text>
      </>
    ),
    children: (
      <>
        <FooterNav
          title="Offres"
          links={[
            { label: "Immersion", href: "#methode" },
            { label: "Construction", href: "#methode" },
          ]}
        />
        <FooterNav
          title="Métiers"
          links={[
            { label: "Cabinets comptables", href: "#secteurs" },
            { label: "BTP", href: "#secteurs" },
          ]}
        />
        <FooterNav
          title="Ressources"
          links={[{ label: "Calculateur d’heures perdues", href: "#calculateur" }]}
        />
        <FooterNav title="L’agence" links={[{ label: "Premier échange", href: "#contact" }]} />
      </>
    ),
  },
  render: (args) => (
    <Section as="footer" scheme="dark" spacing="sm">
      <Container>
        <FooterColumns {...args} />
      </Container>
    </Section>
  ),
} satisfies Meta<typeof FooterColumns>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OnFujiNight: Story = {
  play: async ({ canvas }) => {
    const offers = canvas.getByRole("navigation", { name: "Offres" });
    await expect(within(offers).getByRole("link", { name: "Immersion" })).toHaveAttribute(
      "href",
      "#methode",
    );
  },
};

export const SmallScreen: Story = {
  globals: { viewport: { value: "mobile2" } },
};
