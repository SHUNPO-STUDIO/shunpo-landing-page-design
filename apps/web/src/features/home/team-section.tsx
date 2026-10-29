import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Heading } from "@repo/ui/typography/heading";

export function TeamSection() {
  return (
    <Section>
      <Container>
        <Heading level={2}>Qui s’occupe de votre projet ?</Heading>
      </Container>
    </Section>
  );
}
