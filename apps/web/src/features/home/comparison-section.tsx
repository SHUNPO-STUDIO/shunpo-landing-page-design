import { BrandLogo } from "@repo/ui/components/brand-logo";
import { ComparisonCard } from "@repo/ui/components/comparison-card";
import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Stack } from "@repo/ui/layout/stack";
import { ComparisonReveal } from "@repo/ui/motion/comparison-reveal";
import { Heading } from "@repo/ui/typography/heading";
import { Text } from "@repo/ui/typography/text";

import { comparisonSources, comparisonTitle, customSide, standardSide } from "./comparison-content";

export function ComparisonSection() {
  return (
    <Section id="sur-mesure" spacing="lg" aria-labelledby="sur-mesure-title">
      <Container>
        <Stack gap="3xl">
          <Heading level={2} id="sur-mesure-title">
            {comparisonTitle}
          </Heading>
          <ComparisonReveal
            standard={<ComparisonCard tone="standard" {...standardSide} />}
            custom={
              <ComparisonCard tone="custom" title={<BrandLogo size="sm" />} {...customSide} />
            }
            note={
              <Text size="xs" tone="muted">
                {comparisonSources}
              </Text>
            }
          />
        </Stack>
      </Container>
    </Section>
  );
}
