import { BrandLogo } from "@repo/ui/components/brand-logo";
import { FooterColumns } from "@repo/ui/components/footer-columns";
import { FooterNav } from "@repo/ui/components/footer-nav";
import { Separator } from "@repo/ui/components/separator";
import { Container } from "@repo/ui/layout/container";
import { Inline } from "@repo/ui/layout/inline";
import { Section } from "@repo/ui/layout/section";
import { Stack } from "@repo/ui/layout/stack";
import { Text } from "@repo/ui/typography/text";

import { footerColumns, footerCopy } from "./site-footer-content";

export function SiteFooter() {
  return (
    <Section as="footer" scheme="dark" spacing="sm">
      <Container>
        <Stack gap="3xl">
          <Separator />
          <FooterColumns
            lead={
              <>
                <BrandLogo />
                <Text size="sm" tone="muted" measure="prose">
                  {footerCopy.description}
                </Text>
              </>
            }
          >
            {footerColumns.map((column) => (
              <FooterNav key={column.title} title={column.title} links={column.links} />
            ))}
          </FooterColumns>
          <Stack gap="lg">
            <Separator />
            <Inline justify="between" gap="md">
              <Text size="xs" tone="muted">
                {footerCopy.copyright}
              </Text>
              <Text size="xs" tone="muted">
                {footerCopy.legal}
              </Text>
            </Inline>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}
