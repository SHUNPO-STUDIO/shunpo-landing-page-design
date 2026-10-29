import { BrandLogo } from "@repo/ui/components/brand-logo";
import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";

export function SiteFooter() {
  return (
    <Section as="footer" scheme="dark" spacing="md">
      <Container>
        <BrandLogo />
      </Container>
    </Section>
  );
}
