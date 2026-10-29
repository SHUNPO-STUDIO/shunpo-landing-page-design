import type { Meta, StoryObj } from "@storybook/react-vite";

import { Shuriken } from "../src/components/shuriken.tsx";
import { Inline } from "../src/layout/inline.tsx";
import { Section } from "../src/layout/section.tsx";

const meta = {
  title: "Components/Shuriken",
  component: Shuriken,
} satisfies Meta<typeof Shuriken>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Seal: Story = { args: { size: "xl" } };

export const Sizes: Story = {
  render: () => (
    <Inline gap="md">
      <Shuriken size="sm" />
      <Shuriken size="md" />
      <Shuriken size="lg" />
      <Shuriken size="xl" />
    </Inline>
  ),
};

export const Night: Story = {
  render: () => (
    <Section scheme="dark" spacing="sm">
      <Inline gap="md">
        <Shuriken size="xl" tone="night" />
        <Shuriken size="xl" tone="line" />
      </Inline>
    </Section>
  ),
};
