import { PaperPlate } from "@repo/ui/components/paper-plate";
import { Stamp } from "@repo/ui/components/stamp";
import Image from "next/image";

import type { Pain } from "./pains-content";

const plateSizes = "(min-width: 48rem) 22rem, (min-width: 40rem) 45vw, 75vw";

interface PainsPlateProps {
  pain: Pain;
}

/* A pain as a paper print, with the stamp that approves it once SHUNPO has solved it. */
export function PainsPlate({ pain }: PainsPlateProps) {
  return (
    <PaperPlate
      image={<Image src={pain.image} alt={pain.alt} sizes={plateSizes} />}
      number={pain.number}
      caption={pain.caption}
      stamp={<Stamp size="sm">{pain.stamp}</Stamp>}
    />
  );
}
