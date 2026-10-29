import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Heading } from "@repo/ui/typography/heading";

export function ClosingSection() {
  return (
    <Section>
      <Container>
        <Heading level={2}>Construisons le dernier logiciel dont vous aurez besoin.</Heading>
      </Container>
    </Section>
  );
}
