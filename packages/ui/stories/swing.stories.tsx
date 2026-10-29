import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { Card } from "../src/components/card.tsx";
import { Swing } from "../src/motion/swing.tsx";
import { Text } from "../src/typography/text.tsx";

/* The drop-in fades the content in: wait until it is fully opaque before checking it (and its contrast). */
async function settled(root: HTMLElement): Promise<void> {
  await waitFor(
    () => {
      const dropping = [...root.querySelectorAll("[data-slot=swing]")].some(
        (swing) => getComputedStyle(swing).opacity !== "1",
      );
      if (dropping) {
        throw new Error("Still dropping in");
      }
    },
    { timeout: 4000 },
  );
}

const meta = {
  title: "Motion/Swing",
  component: Swing,
  args: {
    order: 0,
    className: "max-w-xs",
    children: (
      <Card>
        <Text>
          Hangs from its top centre, drops in with a damped swing, sways under the pointer.
        </Text>
      </Card>
    ),
  },
} satisfies Meta<typeof Swing>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvas, canvasElement, userEvent }) => {
    await settled(canvasElement);
    const content = canvas.getByText(/Hangs from its top centre/u);
    await userEvent.hover(content);
    await expect(content).toBeVisible();
  },
};
