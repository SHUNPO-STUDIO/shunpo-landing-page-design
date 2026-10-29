import { ButtonLink } from "@repo/ui/components/button-link";
import { FilmScene } from "@repo/ui/motion/film-scene";
import { Heading } from "@repo/ui/typography/heading";
import Image from "next/image";

import { heroCopy, heroFilm } from "./hero-content";
import sunriseRisen from "./images/hero-sunrise-risen.webp";
import sunriseStart from "./images/hero-sunrise-start.webp";
import { contactHref } from "./links";

export function HeroSection() {
  return (
    <FilmScene
      sources={heroFilm.sources}
      poster={
        <Image src={sunriseStart} alt="" fill sizes="100vw" loading="eager" fetchPriority="high" />
      }
      still={<Image src={sunriseRisen} alt="" fill sizes="100vw" />}
      lightAt={heroFilm.lightAt}
      leaveAt={heroFilm.leaveAt}
      title={
        <Heading level={1} size="headline" align="center">
          {heroCopy.title}
        </Heading>
      }
      action={
        <ButtonLink href={contactHref} size="lg" corner="cut" arrow>
          {heroCopy.action}
        </ButtonLink>
      }
    />
  );
}
