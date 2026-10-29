import { AdaptiveHeader } from "@repo/ui/components/adaptive-header";
import { BrandLogo } from "@repo/ui/components/brand-logo";
import { ButtonLink } from "@repo/ui/components/button-link";
import { MobileNav } from "@repo/ui/components/mobile-nav";
import { NavBar } from "@repo/ui/components/nav-bar";
import { SectionRail } from "@repo/ui/components/section-rail";
import Link from "next/link";

import { contactHref } from "./links";
import { headerCopy, mobileLinks, railItems } from "./site-header-content";
import { SiteNavEntries } from "./site-nav-entries";

export function SiteHeader() {
  const brand = (
    <Link href="/" aria-label={headerCopy.homeLabel}>
      <BrandLogo />
    </Link>
  );
  const cta = (
    <ButtonLink href={contactHref} variant="accent" size="sm" corner="cut" arrow>
      {headerCopy.cta}
    </ButtonLink>
  );

  return (
    <>
      <AdaptiveHeader>
        <NavBar
          label={headerCopy.navigationLabel}
          brand={brand}
          action={cta}
          menu={
            <MobileNav
              label={headerCopy.menuLabel}
              openLabel={headerCopy.openMenu}
              closeLabel={headerCopy.closeMenu}
              brand={brand}
              action={cta}
              links={mobileLinks}
            />
          }
        >
          <SiteNavEntries />
        </NavBar>
      </AdaptiveHeader>
      <SectionRail label={headerCopy.railLabel} items={railItems} />
    </>
  );
}
