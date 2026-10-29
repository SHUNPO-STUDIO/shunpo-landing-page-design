import { Accordion } from "@repo/ui/components/accordion";
import { AccordionItem } from "@repo/ui/components/accordion-item";
import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Split } from "@repo/ui/layout/split";
import { Stack } from "@repo/ui/layout/stack";
import { Heading } from "@repo/ui/typography/heading";
import { Text } from "@repo/ui/typography/text";

import { faqItems, faqNote, faqTitle } from "./faq-content";

export function FaqSection() {
  return (
    <Section id="questions" spacing="lg" aria-labelledby="questions-title">
      <Container>
        <Split
          aside={
            <Stack gap="lg">
              <Heading level={2} id="questions-title">
                {faqTitle}
              </Heading>
              <Text tone="muted">{faqNote}</Text>
            </Stack>
          }
        >
          <Accordion defaultValue={[0]}>
            {faqItems.map((item, index) => (
              <AccordionItem key={item.question} value={index} question={item.question}>
                {item.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </Split>
      </Container>
    </Section>
  );
}
