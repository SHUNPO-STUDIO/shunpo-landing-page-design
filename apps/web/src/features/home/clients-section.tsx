import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { Marquee } from "@repo/ui/motion/marquee";
import Image from "next/image";

import { clientLogos, clientsCopy } from "./clients-content";

export function ClientsSection() {
  return (
    <Section aria-label={clientsCopy.label} spacing="sm">
      <Container>
        <Marquee pauseLabel={clientsCopy.pause}>
          {clientLogos.map((logo) => (
            <Image
              key={logo.name}
              src={logo.image}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
            />
          ))}
        </Marquee>
      </Container>
    </Section>
  );
}
