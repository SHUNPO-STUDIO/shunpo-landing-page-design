import { BrandLogo } from "@repo/ui/components/brand-logo";
import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";

export function SiteHeader() {
  return (
    <Section as="header" spacing="xs">
      <Container>
        <BrandLogo />
      </Container>
    </Section>
  );
}
