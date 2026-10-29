import { RuledList } from "@repo/ui/components/ruled-list";
import { Stack } from "@repo/ui/layout/stack";
import { Heading } from "@repo/ui/typography/heading";
import { Text } from "@repo/ui/typography/text";
import type { ReactNode } from "react";

/* The two columns of a method sheet: what happens (kicker, title, text) and what you get. */

interface SheetIntroProps {
  sheet: { id: string; kicker: string; title: string; text: string };
  children?: ReactNode;
}

export function SheetIntro({ sheet, children }: SheetIntroProps) {
  return (
    <Stack gap="lg" align="start">
      <Stack gap="sm">
        <Text size="sm" weight="medium" tone="muted">
          {sheet.kicker}
        </Text>
        <Heading level={3} size="title-lg" id={sheet.id}>
          {sheet.title}
        </Heading>
      </Stack>
      <Text size="lg">{sheet.text}</Text>
      {children}
    </Stack>
  );
}

interface SheetAsideProps {
  aside: { kicker: string; items: readonly string[] };
  children?: ReactNode;
}

export function SheetAside({ aside, children }: SheetAsideProps) {
  return (
    <Stack gap="md">
      <Text size="sm" weight="medium" tone="muted">
        {aside.kicker}
      </Text>
      <RuledList>
        {aside.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </RuledList>
      {children}
    </Stack>
  );
}
