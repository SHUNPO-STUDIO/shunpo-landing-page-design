import { PhotoStage } from "@repo/ui/motion/photo-stage";
import Image from "next/image";

import processWall from "./images/film-process-wall.webp";

export function FilmSection() {
  return (
    <PhotoStage
      image={
        <Image
          src={processWall}
          alt="Une personne de dos face à un mur couvert de schémas de processus, dans un bureau traversé par un rayon de lumière."
          fill
          sizes="(min-width: 90rem) 1260px, (min-width: 48rem) 88vw, 100vw"
        />
      }
    />
  );
}
