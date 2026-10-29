import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Heading } from "@repo/ui/typography/heading";

export function TestimonialsSection() {
  return (
    <Section>
      <Container>
        <Heading level={2}>Ce qu’en disent nos clients</Heading>
      </Container>
    </Section>
  );
}
