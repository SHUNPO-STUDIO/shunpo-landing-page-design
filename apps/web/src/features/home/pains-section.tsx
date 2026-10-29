import { SystemDashboard } from "@repo/ui/components/system-dashboard";
import { Container } from "@repo/ui/layout/container";
import { Section } from "@repo/ui/layout/section";
import { FilingScene } from "@repo/ui/motion/filing-scene";
import { Heading } from "@repo/ui/typography/heading";
import Image from "next/image";

import hankoImage from "./images/pains-hanko.webp";
import { PainsCard } from "./pains-card";
import { dashboard, pains, painsOutro, painsTitle } from "./pains-content";
import { PainsPlate } from "./pains-plate";

const painCount = String(pains.length).padStart(2, "0");

const painSteps = pains.map((pain) => ({
  id: pain.id,
  targets: pain.targets,
  plate: <PainsPlate pain={pain} />,
  card: <PainsCard label={`${pain.number} / ${painCount}`} title={pain.title} text={pain.text} />,
}));

/* « Votre entreprise tourne. À quel prix ? »: each pain is stamped, then filed into the system. */
export function PainsSection() {
  return (
    <Section id="systeme" aria-labelledby="systeme-titre">
      <Container>
        <FilingScene
          heading={
            <Heading level={2} id="systeme-titre">
              {painsTitle}
            </Heading>
          }
          steps={painSteps}
          outro={<PainsCard seal {...painsOutro} />}
          board={<SystemDashboard {...dashboard} />}
          hanko={<Image src={hankoImage} alt="" sizes="5rem" />}
        />
      </Container>
    </Section>
  );
}
