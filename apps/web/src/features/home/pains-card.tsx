import { Card } from "@repo/ui/components/card";
import { Shuriken } from "@repo/ui/components/shuriken";
import { Inline } from "@repo/ui/layout/inline";
import { Heading } from "@repo/ui/typography/heading";
import { Text } from "@repo/ui/typography/text";

interface PainsCardProps {
  label: string;
  title: string;
  text: string;
  /* Marks the closing card with the shuriken. */
  seal?: boolean;
}

/* The Fuji Night plaque that names a pain (or, sealed, what SHUNPO puts in its place). */
export function PainsCard({ label, title, text, seal = false }: PainsCardProps) {
  return (
    <Card as="article" variant="night" corner="cut">
      <Inline gap="xs">
        {seal ? <Shuriken size="sm" tone="night" /> : null}
        <Text as="span" size="sm" weight="medium" tone="muted">
          {label}
        </Text>
      </Inline>
      <Heading level={3} size="title-sm">
        {title}
      </Heading>
      <Text>{text}</Text>
    </Card>
  );
}
