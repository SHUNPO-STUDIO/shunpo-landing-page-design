import { ButtonLink } from "@repo/ui/components/button-link";
import { SpotlightStage } from "@repo/ui/motion/spotlight-stage";
import { VideoScrub } from "@repo/ui/motion/video-scrub";
import { Heading } from "@repo/ui/typography/heading";
import Image from "next/image";

import { closingCopy, closingFilm } from "./closing-content";
import samuraiBack from "./images/closing-samurai-back.webp";
import samuraiFacing from "./images/closing-samurai-facing.webp";
import { contactHref, sectionHref } from "./links";

const FIGURE_SIZES = "(min-width: 75rem) 1600px, (min-width: 48rem) 133vw, 240vw";

export function ClosingSection() {
  return (
    <SpotlightStage
      id={sectionHref.contact.slice(1)}
      aria-labelledby="contact-title"
      figure={
        <VideoScrub
          sources={closingFilm.sources}
          poster={<Image src={samuraiBack} alt="" fill sizes={FIGURE_SIZES} />}
          still={<Image src={samuraiFacing} alt="" fill sizes={FIGURE_SIZES} />}
          start={closingFilm.start}
          end={closingFilm.end}
        />
      }
      title={
        <Heading level={2} size="headline" id="contact-title">
          {closingCopy.title}
        </Heading>
      }
      action={
        <ButtonLink href={contactHref} size="lg" corner="cut" arrow>
          {closingCopy.action}
        </ButtonLink>
      }
    />
  );
}
