import { Statement } from "@repo/ui/components/statement";
import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";

export function StatementSection() {
  return (
    <Section tone="surface" spacing="xl">
      <Container size="narrow">
        <Statement
          lead="On ne vend pas de la tech."
          emphasis="On construit ce qui fait croître votre business."
        />
      </Container>
    </Section>
  );
}
