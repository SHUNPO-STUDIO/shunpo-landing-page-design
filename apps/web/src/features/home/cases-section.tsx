import { CasePanel } from "@repo/ui/components/case-panel";
import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Stack } from "@repo/ui/layout/stack";
import { PanelReveal } from "@repo/ui/motion/panel-reveal";
import { Heading } from "@repo/ui/typography/heading";
import { Text } from "@repo/ui/typography/text";
import Image from "next/image";

import { cases, casesLead, casesTitle } from "./cases-content";

export function CasesSection() {
  return (
    <Section id="realisations" scheme="dark" spacing="lg" aria-labelledby="realisations-title">
      <Stack gap="3xl">
        <Container>
          <Stack gap="md">
            <Heading level={2} size="display-xl" id="realisations-title">
              {casesTitle}
            </Heading>
            <Text size="lg" tone="muted" measure="prose">
              {casesLead}
            </Text>
          </Stack>
        </Container>
        <PanelReveal>
          {cases.map((item) => (
            <CasePanel
              key={item.client}
              as="li"
              backdrop={<Image src={item.backdrop} alt="" fill sizes="100vw" />}
              logo={
                <Image
                  src={item.logo}
                  alt={item.client}
                  width={item.logo.width / 2}
                  height={item.logo.height / 2}
                />
              }
              client={item.client}
              sector={item.sector}
              figure={item.figure}
              figureLabel={item.figureLabel}
            >
              {item.story}
            </CasePanel>
          ))}
        </PanelReveal>
      </Stack>
    </Section>
  );
}
