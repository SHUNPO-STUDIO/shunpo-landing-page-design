import { contactHref, sectionHref } from "./links";

export const footerCopy = {
  description:
    "SHUNPO est une agence lyonnaise qui construit des logiciels métier sur mesure, boostés à l’IA, pour les entreprises de 20 à 250 salariés.",
  copyright: "© 2026 SHUNPO · Lyon",
  legal: "Mentions légales · Confidentialité",
};

export const footerColumns = [
  {
    title: "Offres",
    links: [
      { label: "Immersion", href: sectionHref.method },
      { label: "Construction", href: sectionHref.method },
      { label: "Évolution", href: sectionHref.method },
    ],
  },
  {
    title: "Métiers",
    links: [
      { label: "Cabinets comptables", href: sectionHref.sectors },
      { label: "Gestion immobilière", href: sectionHref.sectors },
      { label: "BTP", href: sectionHref.sectors },
      { label: "Agences", href: sectionHref.sectors },
    ],
  },
  {
    title: "Ressources",
    links: [{ label: "Calculateur d’heures perdues", href: sectionHref.calculator }],
  },
  {
    title: "L’agence",
    links: [
      { label: "Cas clients", href: sectionHref.cases },
      { label: "L’équipe", href: sectionHref.team },
      { label: "Premier échange", href: contactHref },
    ],
  },
];
