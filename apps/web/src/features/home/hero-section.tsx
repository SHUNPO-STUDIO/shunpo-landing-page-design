import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Heading } from "@repo/ui/typography/heading";

export function HeroSection() {
  return (
    <Section>
      <Container>
        <Heading level={1}>
          On construit le système qui fait tourner votre entreprise, boosté à l’IA.
        </Heading>
      </Container>
    </Section>
  );
}
