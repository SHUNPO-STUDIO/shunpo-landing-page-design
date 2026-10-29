import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { BrandLogo } from "../src/components/brand-logo.tsx";
import { Inline } from "../src/layout/inline.tsx";
import { Section } from "../src/layout/section.tsx";

const meta = {
  title: "Components/BrandLogo",
  component: BrandLogo,
} satisfies Meta<typeof BrandLogo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByText("SHUNPO")).toBeInTheDocument();
  },
};

export const Sizes: Story = {
  render: () => (
    <Inline gap="lg" align="end">
      <BrandLogo size="sm" />
      <BrandLogo size="md" />
      <BrandLogo size="lg" />
    </Inline>
  ),
};

export const OnFujiNight: Story = {
  render: () => (
    <Section scheme="dark" spacing="sm">
      <BrandLogo size="lg" />
    </Section>
  ),
};
