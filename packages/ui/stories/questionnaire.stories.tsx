import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, fn } from "storybook/test";

import { Questionnaire, type QuestionnaireStep } from "../src/components/questionnaire.tsx";
import { Readout } from "../src/components/readout.tsx";

const steps: QuestionnaireStep[] = [
  {
    id: "equipe",
    legend: "Combien de personnes compte votre équipe ?",
    options: [
      { value: "1-10", label: "1 à 10" },
      { value: "11-50", label: "11 à 50" },
      { value: "51+", label: "Plus de 50" },
    ],
  },
  {
    id: "outils",
    legend: "Combien d’outils utilisez-vous chaque jour ?",
    options: [
      { value: "1-3", label: "1 à 3" },
      { value: "4-8", label: "4 à 8" },
      { value: "9+", label: "Plus de 8" },
    ],
  },
  {
    id: "ressaisie",
    legend: "Ressaisissez-vous des données d’un outil à l’autre ?",
    options: [
      { value: "souvent", label: "Souvent" },
      { value: "parfois", label: "Parfois" },
      { value: "rarement", label: "Rarement" },
    ],
  },
];

const meta = {
  title: "Components/Questionnaire",
  component: Questionnaire,
  args: {
    "aria-label": "Questionnaire",
    steps,
    answers: {},
    onAnswer: fn<(stepId: string, value: string) => void>(),
    labels: {
      progress: (current: number, total: number) => `Question ${current} sur ${total}`,
      next: "Question suivante",
      previous: "Question précédente",
    },
  },
  render: function Render(args) {
    const [answers, setAnswers] = useState<Record<string, string>>({});
    return (
      <Questionnaire
        {...args}
        answers={answers}
        onAnswer={(stepId, value) => {
          args.onAnswer(stepId, value);
          setAnswers((previous) => ({ ...previous, [stepId]: value }));
        }}
      />
    );
  },
} satisfies Meta<typeof Questionnaire>;

export default meta;

type Story = StoryObj<typeof meta>;

export const StepsThroughQuestions: Story = {
  play: async ({ args, canvas, userEvent }) => {
    await expect(canvas.getByText("Question 1 sur 3")).toBeVisible();
    await expect(canvas.getByRole("button", { name: "Question suivante" })).toBeDisabled();

    await userEvent.click(canvas.getByRole("radio", { name: "11 à 50" }));
    await expect(args.onAnswer).toHaveBeenCalledWith("equipe", "11-50");
    await userEvent.click(canvas.getByRole("button", { name: "Question suivante" }));

    await expect(canvas.getByText("Question 2 sur 3")).toBeVisible();
    await expect(canvas.getByRole("radio", { name: "1 à 3" })).toHaveFocus();

    await userEvent.click(canvas.getByRole("button", { name: "Question précédente" }));

    await expect(canvas.getByText("Question 1 sur 3")).toBeVisible();
    await expect(canvas.getByRole("radio", { name: "11 à 50" })).toBeChecked();
    await expect(canvas.getByRole("radio", { name: "11 à 50" })).toHaveFocus();
  },
};

export const EndsOnTheLastQuestion: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("radio", { name: "1 à 10" }));
    await userEvent.click(canvas.getByRole("button", { name: "Question suivante" }));
    await userEvent.click(canvas.getByRole("radio", { name: "4 à 8" }));
    await userEvent.click(canvas.getByRole("button", { name: "Question suivante" }));

    await expect(canvas.getByText("Question 3 sur 3")).toBeVisible();
    await expect(canvas.queryByRole("button", { name: "Question suivante" })).toBeNull();
    await expect(canvas.getByRole("button", { name: "Question précédente" })).toBeVisible();
  },
};

export const SingleQuestion: Story = {
  args: { steps: steps.slice(0, 1) },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("radiogroup")).toBeVisible();
    await expect(canvas.queryByText("Question 1 sur 1")).toBeNull();
    await expect(canvas.queryByRole("button")).toBeNull();
  },
};

export const WithKickerAndResult: Story = {
  args: {
    kicker: "Cabinets comptables",
    result: (
      <Readout
        label="Première estimation"
        hint="Choisissez une réponse pour la voir."
        value={undefined}
        unit="h perdues par mois"
        announcement=""
      />
    ),
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByText("Cabinets comptables")).toBeVisible();
    await expect(canvas.getByText("Première estimation")).toBeVisible();
  },
};
