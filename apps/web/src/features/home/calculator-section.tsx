import { Separator } from "@repo/ui/components/separator";
import { Container } from "@repo/ui/layout/container";
import { Grid } from "@repo/ui/layout/grid";
import { Section } from "@repo/ui/layout/section";
import { Stack } from "@repo/ui/layout/stack";
import { Heading } from "@repo/ui/typography/heading";
import { Text } from "@repo/ui/typography/text";

import { calculatorCopy } from "./calculator-content";
import { LostHoursCalculator } from "./lost-hours-calculator";

export function CalculatorSection() {
  return (
    <Section id="calculateur" spacing="lg" aria-labelledby="calculateur-title">
      <Container>
        <Stack gap="3xl">
          <Grid columns="2" from="lg" gap="3xl" align="center">
            <Stack gap="lg">
              <Heading level={2} id="calculateur-title">
                {calculatorCopy.title}
              </Heading>
              <Text size="lg" tone="muted">
                {calculatorCopy.lead}
              </Text>
              <Text size="sm" tone="muted" measure="prose">
                {calculatorCopy.disclaimer}
              </Text>
            </Stack>
            <LostHoursCalculator />
          </Grid>
          <Stack gap="xl">
            <Separator />
            <Text size="lg" measure="prose">
              {calculatorCopy.taxCredit}
            </Text>
            <Separator />
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
