import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";

import { Card } from "../src/components/card.tsx";
import { PaperPlate } from "../src/components/paper-plate.tsx";
import { Stamp } from "../src/components/stamp.tsx";
import { SystemDashboard } from "../src/components/system-dashboard.tsx";
import { FilingScene } from "../src/motion/filing-scene.tsx";
import { Heading } from "../src/typography/heading.tsx";
import { dashboardSample } from "./support/dashboard-sample.ts";

const picture =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Crect width='4' height='5' fill='%23b9b4aa'/%3E%3C/svg%3E";

const pains = [
  {
    id: "ressaisie",
    title: "Vous ressaisissez les mêmes données",
    stamp: "Saisi une fois",
    targets: ["files", "cases"],
  },
  { id: "recherche", title: "Vous cherchez une information", stamp: "Classé", targets: ["mails"] },
  {
    id: "dependance",
    title: "Tout repose sur une ou deux personnes",
    stamp: "Partagé",
    targets: ["tasks"],
  },
];

const steps = pains.map((pain, index) => ({
  id: pain.id,
  targets: pain.targets,
  plate: (
    <PaperPlate
      image={<img src={picture} alt={pain.title} width={400} height={500} />}
      number={`0${index + 1}`}
      caption={pain.id}
      stamp={<Stamp size="sm">{pain.stamp}</Stamp>}
    />
  ),
  card: (
    <Card as="article" variant="night" corner="cut">
      <Heading level={3} size="title-sm">
        {pain.title}
      </Heading>
    </Card>
  ),
}));

const meta = {
  title: "Motion/FilingScene",
  component: FilingScene,
  parameters: {
    layout: "fullscreen",
    /* The board waits dimmed until the plates file into it: decorative (aria-hidden), and checked
       fully lit by the SystemDashboard stories and the reduced-motion page audit. */
    a11y: {
      config: { rules: [{ id: "color-contrast", selector: "*:not([data-filing='board'] *)" }] },
    },
    docs: {
      description: {
        component:
          "Pinned from the tablet breakpoint: each step's plate comes forward, the hanko stamps it, then it files into its `data-tile` on the board, which comes alive; the outro closes on the full board. Phones and reduced motion show the steps stacked, every plate stamped.",
      },
    },
  },
  args: {
    heading: <Heading level={2}>Votre entreprise tourne. À quel prix ?</Heading>,
    steps,
    outro: (
      <Card as="article" variant="night" corner="cut">
        <Heading level={3} size="title-sm">
          Un seul système.
        </Heading>
      </Card>
    ),
    board: <SystemDashboard {...dashboardSample} />,
    hanko: <img src={picture} alt="" width={80} height={240} />,
  },
  render: (args) => (
    <div className="mx-auto max-w-default p-10">
      <FilingScene {...args} />
    </div>
  ),
} satisfies Meta<typeof FilingScene>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Filing: Story = {
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("heading", { level: 2 })).toBeVisible();
    await expect(canvas.getByText(dashboardSample.note)).toBeVisible();
  },
};
