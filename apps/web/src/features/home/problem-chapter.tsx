import { ComparisonSection } from "./comparison-section";
import { PainsSection } from "./pains-section";
import { StatementSection } from "./statement-section";

export function ProblemChapter() {
  return (
    <>
      <PainsSection />
      <StatementSection />
      <ComparisonSection />
    </>
  );
}
