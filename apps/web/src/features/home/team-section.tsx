import { ButtonLink } from "@repo/ui/components/button-link";
import { Container } from "@repo/ui/layout/container";
import { Inline } from "@repo/ui/layout/inline";
import { Section } from "@repo/ui/layout/section";
import { Stack } from "@repo/ui/layout/stack";
import { Heading } from "@repo/ui/typography/heading";
import { Text } from "@repo/ui/typography/text";

import { contactHref } from "./links";
import { TeamBadges } from "./team-badges";
import { teamAction, teamLead, teamTitle } from "./team-content";

export function TeamSection() {
  return (
    <Section id="agence" tone="surface" spacing="lg" aria-labelledby="agence-title">
      <Container>
        <Stack gap="3xl">
          <Stack gap="md" align="center">
            <Heading level={2} size="display" align="center" id="agence-title">
              {teamTitle}
            </Heading>
            <Text size="lg" tone="muted" align="center" measure="prose">
              {teamLead}
            </Text>
          </Stack>
          <TeamBadges />
          <Inline justify="center">
            <ButtonLink href={contactHref} variant="outline" size="lg" arrow>
              {teamAction}
            </ButtonLink>
          </Inline>
        </Stack>
      </Container>
    </Section>
  );
}
