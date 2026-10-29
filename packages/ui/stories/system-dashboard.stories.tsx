import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { SystemDashboard } from "../src/components/system-dashboard.tsx";
import { dashboardSample } from "./support/dashboard-sample.ts";

const meta = {
  title: "Components/SystemDashboard",
  component: SystemDashboard,
  parameters: {
    docs: {
      description: {
        component:
          "An example of a system SHUNPO builds, drawn as a picture: assistive technologies read `label`, the caption says the data is fictional. Every tile carries `data-tile` for `FilingScene`. The layout follows its container: one column on phones, an icon rail from `@compact`, labels from `@prose`.",
      },
    },
  },
  args: { ...dashboardSample, className: "max-w-narrow" },
} satisfies Meta<typeof SystemDashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ canvas, canvasElement }) => {
    await expect(canvas.getByText(dashboardSample.note)).toBeVisible();
    await expect(canvas.getByText(dashboardSample.label)).toBeInTheDocument();
    await expect(canvasElement.querySelectorAll("[data-tile]")).toHaveLength(11);
  },
};

export const Compact: Story = { args: { className: "max-w-compact" } };

export const Phone: Story = {
  render: (args) => (
    <div className="max-w-compact">
      <SystemDashboard {...args} className="w-3/4" />
    </div>
  ),
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Tableau de bord", { selector: "span.text-lg" })).toBeVisible();
    await expect(canvas.getByText("Ventes")).not.toBeVisible();
  },
};
