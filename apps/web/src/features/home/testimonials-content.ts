import type { StaticImageData } from "next/image";

import { firstColumn } from "./testimonials-first-column";
import { secondColumn } from "./testimonials-second-column";
import { thirdColumn } from "./testimonials-third-column";

export const testimonialsTitle = "Ce qu’en disent nos clients";

export const testimonialsRating = "4,6/5 sur Trustpilot";

export const testimonialsScore = 4.6;

export const testimonialsStars = "Note de 4,6 sur 5";

export const testimonialsPause = "Mettre en pause le défilement des avis";

interface Testimonial {
  name: string;
  jobTitle: string;
  photo: StaticImageData;
  quote: string;
  /* Set when the quote is not in French. */
  lang?: string;
}

/* The artifact's wall, column by column: up, down, up. */
export const testimonialColumns: Testimonial[][] = [firstColumn, secondColumn, thirdColumn];
