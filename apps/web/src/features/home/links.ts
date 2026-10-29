/* In-page anchors of the home page. Each section sets the matching `id` (without `#`). */
export const sectionHref = {
  pains: "#systeme",
  comparison: "#sur-mesure",
  sectors: "#secteurs",
  cases: "#realisations",
  method: "#methode",
  team: "#agence",
  testimonials: "#avis",
  faq: "#questions",
  calculator: "#calculateur",
  contact: "#contact",
} as const;

/* Every « Réserver une Immersion » and « Parlons de votre projet » goes to the closing section
   until the real booking page exists. */
export const contactHref = sectionHref.contact;
