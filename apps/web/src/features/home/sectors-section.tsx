import { Section } from "@repo/ui/layout/section";
import { ScrollShowcase } from "@repo/ui/motion/scroll-showcase";
import { Heading } from "@repo/ui/typography/heading";
import Image from "next/image";

import { sectors, sectorsPaper, sectorsTitle } from "./sectors-content";
import { SectorsOutro } from "./sectors-outro";

const photoSizes = "(min-width: 64rem) 23rem, (min-width: 48rem) 45vw, 75vw";

export function SectorsSection() {
  return (
    <Section id="secteurs" spacing="lg" aria-labelledby="secteurs-title">
      <ScrollShowcase
        intro={
          <Heading level={2} size="display" id="secteurs-title">
            {sectorsTitle}
          </Heading>
        }
        outro={<SectorsOutro />}
        paper={<Image src={sectorsPaper} alt="" fill sizes={photoSizes} />}
        items={sectors.map((sector) => ({
          title: sector.title,
          body: sector.body,
          photo: (
            <Image key={sector.title} src={sector.photo} alt={sector.alt} fill sizes={photoSizes} />
          ),
        }))}
      />
    </Section>
  );
}
