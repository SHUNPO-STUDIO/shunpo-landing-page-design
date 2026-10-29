import type { QuestionnaireLabels, QuestionnaireStep } from "@repo/ui/components/questionnaire";

export const calculatorCopy = {
  title: "Combien d’heures perd votre cabinet ?",
  lead: "Calculez-le en 3 minutes. Votre résultat s’affiche tout de suite, sans email.",
  disclaimer:
    "Estimation prudente, calculée à partir de vos réponses. Seule une observation sur le terrain permet un chiffrage précis.",
  name: "Calculateur d’heures perdues",
  trade: "Cabinets comptables",
  estimateLabel: "Première estimation",
  estimatePending: "Choisissez une réponse pour la voir.",
  /* The artifact's hours are placeholders (« valeurs fictives, formule à écrire »). */
  estimateReady: "Données fictives, formule à valider.",
  estimateUnit: "h perdues par mois",
  taxCredit:
    "SHUNPO est agréée Crédit d’impôt innovation : si votre projet est éligible, 20 % des dépenses éligibles reviennent en crédit d’impôt.",
} as const;

export const calculatorLabels: QuestionnaireLabels = {
  progress: (current, total) => `Question ${current} sur ${total}`,
  next: "Question suivante",
  previous: "Question précédente",
};

/* The artifact holds question 1 of the planned 11 only: the others and their formula are still to write. */
export const calculatorQuestions = [
  {
    id: "headcount",
    legend: "Combien de collaborateurs travaillent en production dans votre cabinet ?",
    options: [
      { value: "1-5", label: "1 à 5" },
      { value: "6-15", label: "6 à 15" },
      { value: "16-30", label: "16 à 30" },
      { value: "31-60", label: "31 à 60" },
      { value: "60+", label: "Plus de 60" },
    ],
  },
] as const satisfies readonly QuestionnaireStep[];

export function estimateAnnouncement(hours: number): string {
  return `Première estimation : ${hours} heures perdues par mois.`;
}
