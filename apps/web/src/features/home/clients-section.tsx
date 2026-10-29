import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Heading } from "@repo/ui/typography/heading";

export function ClientsSection() {
  return (
    <Section>
      <Container>
        <Heading level={2}>Ils nous font confiance</Heading>
      </Container>
    </Section>
  );
}
