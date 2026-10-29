import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Heading } from "@repo/ui/typography/heading";

export function StatementSection() {
  return (
    <Section>
      <Container>
        <Heading level={2}>
          On ne vend pas de la tech. On construit ce qui fait croître votre business.
        </Heading>
      </Container>
    </Section>
  );
}
