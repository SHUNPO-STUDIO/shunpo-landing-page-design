import { contactHref, sectionHref } from "./links";

export const headerCopy = {
  navigationLabel: "Navigation principale",
  homeLabel: "SHUNPO, accueil",
  cta: "Réserver une Immersion",
  menuLabel: "Menu",
  openMenu: "Ouvrir le menu",
  closeMenu: "Fermer le menu",
  railLabel: "Sommaire de la page",
};

const immersionFeature = {
  kicker: "À la une",
  title: "Immersion",
  description: "Cinq jours sur le terrain pour repérer ce qui coûte du temps à vos équipes.",
  action: { label: "Découvrir l’Immersion", href: sectionHref.method },
};

export const sectorsPanel = {
  kicker: "Secteurs",
  kana: "・セクター",
  title: "Un système taillé pour votre métier.",
  link: { label: "Tous les secteurs", href: sectionHref.sectors },
  rows: [
    { title: "Cabinets comptables", description: "Relances, saisie", href: sectionHref.sectors },
    { title: "Gestion immobilière", description: "Interventions", href: sectionHref.sectors },
    { title: "BTP", description: "Suivi de chantier", href: sectionHref.sectors },
    { title: "Agences", description: "Temps passé", href: sectionHref.sectors },
  ],
  feature: immersionFeature,
};

export const agencyPanel = {
  kicker: "L’agence",
  kana: "・エージェンシー",
  title: "Une équipe à Lyon, sur le terrain avec vous.",
  rows: [
    { title: "L’équipe", description: "Les visages", href: sectionHref.team },
    { title: "Nous écrire", description: "Contact", href: contactHref },
  ],
  feature: immersionFeature,
};

export const mobileLinks = [
  { label: "Le système", href: sectionHref.pains },
  { label: "Méthode", href: sectionHref.method },
  { label: "Secteurs", href: sectionHref.sectors },
  { label: "Réalisations", href: sectionHref.cases },
  { label: "L’agence", href: sectionHref.team },
];

export const railItems = [
  { label: "Le système", href: sectionHref.pains },
  { label: "Sur mesure", href: sectionHref.comparison },
  { label: "Secteurs", href: sectionHref.sectors },
  { label: "Réalisations", href: sectionHref.cases },
  { label: "Méthode", href: sectionHref.method },
  { label: "L’agence", href: sectionHref.team },
  { label: "Avis clients", href: sectionHref.testimonials },
];
