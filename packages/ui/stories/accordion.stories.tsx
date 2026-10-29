import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, waitFor } from "storybook/test";

import { AccordionItem } from "../src/components/accordion-item.tsx";
import { Accordion } from "../src/components/accordion.tsx";

const FIRST = "Le sur-mesure, ça ne dérape pas ?";
const SECOND = "Et si SHUNPO disparaît ?";

const questions = [
  {
    question: FIRST,
    answer: "On avance par briques, avec un périmètre et un prix fixés à chaque étape.",
  },
  {
    question: SECOND,
    answer: "Le code, les données et la documentation vous appartiennent.",
  },
];

const meta = {
  title: "Components/Accordion",
  component: Accordion,
  args: {
    defaultValue: [0],
    className: "max-w-2xl",
    children: questions.map((item, index) => (
      <AccordionItem key={item.question} value={index} question={item.question}>
        {item.answer}
      </AccordionItem>
    )),
  },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FirstOpen: Story = {
  play: async ({ canvas, userEvent }) => {
    const first = canvas.getByRole("button", { name: FIRST });
    const second = canvas.getByRole("button", { name: SECOND });
    await expect(first).toHaveAttribute("aria-expanded", "true");
    await expect(canvas.getByText(/On avance par briques/u)).toBeVisible();

    await userEvent.click(second);

    await expect(second).toHaveAttribute("aria-expanded", "true");
    await expect(first).toHaveAttribute("aria-expanded", "false");
    await waitFor(async () => {
      await expect(canvas.getByText(/Le code, les données/u)).toBeVisible();
    });
  },
};
