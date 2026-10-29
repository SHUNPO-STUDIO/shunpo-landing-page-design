import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Split } from "../src/layout/split.tsx";
import { Heading } from "../src/typography/heading.tsx";
import { Text } from "../src/typography/text.tsx";

const meta = {
  title: "Layout/Split",
  component: Split,
  args: {
    aside: (
      <Heading level={2} size="title">
        Les questions que vous nous posez
      </Heading>
    ),
    children: <Text>Two fifths for the aside, three fifths for the content from desktops.</Text>,
  },
} satisfies Meta<typeof Split>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 2 })).toBeVisible();
    await expect(canvas.getByText(/Two fifths/u)).toBeVisible();
  },
};
