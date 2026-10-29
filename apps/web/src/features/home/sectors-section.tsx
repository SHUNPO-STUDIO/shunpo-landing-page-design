import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Heading } from "@repo/ui/typography/heading";

export function SectorsSection() {
  return (
    <Section>
      <Container>
        <Heading level={2}>Ce que ça change dans votre quotidien.</Heading>
      </Container>
    </Section>
  );
}
