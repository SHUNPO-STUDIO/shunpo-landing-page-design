import { NavBarLink } from "@repo/ui/components/nav-bar-link";
import { NavBarMenu } from "@repo/ui/components/nav-bar-menu";
import { NavPanel } from "@repo/ui/components/nav-panel";

import { sectionHref } from "./links";
import { agencyPanel, sectorsPanel } from "./site-header-content";

export function SiteNavEntries() {
  return (
    <>
      <NavBarLink href={sectionHref.pains}>Le système</NavBarLink>
      <NavBarLink href={sectionHref.method}>Méthode</NavBarLink>
      <NavBarMenu label="Secteurs">
        <NavPanel {...sectorsPanel} />
      </NavBarMenu>
      <NavBarLink href={sectionHref.cases}>Réalisations</NavBarLink>
      <NavBarMenu label="L’agence">
        <NavPanel {...agencyPanel} />
      </NavBarMenu>
    </>
  );
}
