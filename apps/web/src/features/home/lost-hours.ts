export type CalculatorAnswers = Readonly<Partial<Record<string, string>>>;

/* The artifact's first estimate: monthly lost hours by production headcount band.
   Fictitious values until SHUNPO supplies the formula (« valeurs fictives, formule à écrire »). */
const monthlyLostHoursByHeadcount: ReadonlyMap<string, number> = new Map([
  ["1-5", 38],
  ["6-15", 124],
  ["16-30", 296],
  ["31-60", 612],
  ["60+", 940],
]);

export function estimateMonthlyLostHours(answers: CalculatorAnswers): number | undefined {
  const headcount = answers["headcount"];
  if (headcount === undefined) {
    return undefined;
  }
  return monthlyLostHoursByHeadcount.get(headcount);
}
