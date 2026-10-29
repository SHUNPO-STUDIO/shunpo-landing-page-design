import { Icon } from "@repo/ui/components/icon";
import { TextLink } from "@repo/ui/components/text-link";
import { Inline } from "@repo/ui/layout/inline";
import { Stack } from "@repo/ui/layout/stack";
import { Text } from "@repo/ui/typography/text";
import { ArrowRight } from "lucide-react";

import { contactHref } from "./links";
import { sectorsClosing } from "./sectors-content";

export function SectorsOutro() {
  return (
    <Stack gap="sm" align="start">
      <Text size="lg">{sectorsClosing}</Text>
      <TextLink href={contactHref}>
        <Inline as="span" gap="xs" wrap={false}>
          Parlons de votre projet
          <Icon icon={ArrowRight} size="sm" />
        </Inline>
      </TextLink>
    </Stack>
  );
}
