import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Heading } from "@repo/ui/typography/heading";

export function PainsSection() {
  return (
    <Section>
      <Container>
        <Heading level={2}>Votre entreprise tourne. À quel prix ?</Heading>
      </Container>
    </Section>
  );
}
