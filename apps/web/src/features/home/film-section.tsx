import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Heading } from "@repo/ui/typography/heading";

export function FilmSection() {
  return (
    <Section>
      <Container>
        <Heading level={2}>Le terrain d’abord</Heading>
      </Container>
    </Section>
  );
}
