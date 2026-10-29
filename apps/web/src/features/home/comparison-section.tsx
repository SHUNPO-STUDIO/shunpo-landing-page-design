import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Heading } from "@repo/ui/typography/heading";

export function ComparisonSection() {
  return (
    <Section>
      <Container>
        <Heading level={2}>Le logiciel standard s’impose. SHUNPO s’adapte.</Heading>
      </Container>
    </Section>
  );
}
