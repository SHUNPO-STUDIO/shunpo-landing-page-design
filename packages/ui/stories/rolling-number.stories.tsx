import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, waitFor } from "storybook/test";

import { Button } from "../src/components/button.tsx";
import { RollingNumber } from "../src/components/rolling-number.tsx";
import { Inline } from "../src/layout/inline.tsx";
import { Stack } from "../src/layout/stack.tsx";

function left(element: Element): number {
  return element.getBoundingClientRect().left;
}

/* The digits a reader sees: on each rod, the bead that sits in the rod's window. */
function shownDigits(canvasElement: HTMLElement): string {
  const rods = canvasElement.querySelectorAll("[data-slot=rolling-number] [aria-hidden=true] > *");
  return [...rods]
    .toSorted((first, second) => left(first) - left(second))
    .map((rod) => {
      const { top } = rod.getBoundingClientRect();
      const beads = [...rod.querySelectorAll("span")].filter(
        (bead) => bead.childElementCount === 0,
      );
      const shown = beads.find((bead) => Math.abs(bead.getBoundingClientRect().top - top) < 1);
      return shown?.textContent ?? "?";
    })
    .join("");
}

const meta = {
  title: "Components/RollingNumber",
  component: RollingNumber,
  args: { value: 124 },
} satisfies Meta<typeof RollingNumber>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Value: Story = {
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText("124")).toBeInTheDocument();
    await waitFor(async () => {
      await expect(shownDigits(canvasElement)).toBe("124");
    });
  },
};

export const RollsToANewValue: Story = {
  render: function Render(args) {
    const [value, setValue] = useState(args.value);
    return (
      <Stack gap="lg" align="start">
        <RollingNumber {...args} value={value} />
        <Inline gap="sm">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setValue(38);
            }}
          >
            38
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setValue(940);
            }}
          >
            940
          </Button>
        </Inline>
      </Stack>
    );
  },
  play: async ({ canvas, canvasElement, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: "940" }));
    await waitFor(async () => {
      await expect(shownDigits(canvasElement)).toBe("940");
    });

    await userEvent.click(canvas.getByRole("button", { name: "38" }));
    await waitFor(async () => {
      await expect(shownDigits(canvasElement)).toBe("38");
    });
  },
};
