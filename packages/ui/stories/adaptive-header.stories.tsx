import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { AdaptiveHeader } from "../src/components/adaptive-header.tsx";
import { BrandLogo } from "../src/components/brand-logo.tsx";
import { Container } from "../src/layout/container.tsx";
import { Section } from "../src/layout/section.tsx";
import { Heading } from "../src/typography/heading.tsx";

const meta = {
  title: "Components/AdaptiveHeader",
  component: AdaptiveHeader,
  parameters: { layout: "fullscreen" },
  render: () => (
    <>
      <AdaptiveHeader>
        <Container className="flex h-20 items-center">
          <BrandLogo />
        </Container>
      </AdaptiveHeader>
      <main>
        <Section scheme="dark" className="flex h-dvh items-center">
          <Container>
            <Heading level={1}>The bar stays clear over the opening section</Heading>
          </Container>
        </Section>
        <Section className="h-dvh">
          <Container>
            <Heading level={2}>Then it turns into paper and hides while you scroll down</Heading>
          </Container>
        </Section>
        <Section scheme="dark" className="h-dvh">
          <Container>
            <Heading level={2}>Kome ink over dark islands</Heading>
          </Container>
        </Section>
      </main>
    </>
  ),
} satisfies Meta<typeof AdaptiveHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const OverTheOpening: Story = {
  play: async ({ canvas }) => {
    const header = canvas.getByRole("banner");
    await waitFor(async () => {
      await expect(header).toHaveAttribute("data-scheme", "dark");
    });
    await expect(header).toHaveClass("bg-transparent");
  },
};
