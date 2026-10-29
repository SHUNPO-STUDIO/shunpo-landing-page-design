import sectorsAccounting from "./images/sectors-accounting.webp";
import sectorsAgencies from "./images/sectors-agencies.webp";
import sectorsConstruction from "./images/sectors-construction.webp";
import sectorsProperty from "./images/sectors-property.webp";

export { default as sectorsPaper } from "./images/sectors-paper.webp";

export const sectorsTitle = "Ce que ça change dans votre quotidien.";

export const sectorsClosing = "Quel que soit votre secteur, on peut vous accompagner.";

export const sectors = [
  {
    title: "Cabinets comptables",
    body: "Les relances partent seules et les pièces reçues sont triées et rattachées au bon dossier.",
    photo: sectorsAccounting,
    alt: "Une comptable range une pièce dans un dossier d’archives",
  },
  {
    title: "Gestion immobilière",
    body: "Chaque demande d’intervention est lue, classée et suivie jusqu’au bout, et le locataire est tenu informé.",
    photo: sectorsProperty,
    alt: "Un gestionnaire marche vers la porte d’un locataire, un trousseau à la main",
  },
  {
    title: "BTP",
    body: "Les équipes remplissent le suivi depuis le chantier : heures et matériel remontent sans ressaisie.",
    photo: sectorsConstruction,
    alt: "Un chef de chantier note le suivi sur un carnet, au milieu des échafaudages",
  },
  {
    title: "Agences",
    body: "Temps passés, devis et factures sont reliés : vous suivez la rentabilité de chaque projet en cours de route.",
    photo: sectorsAgencies,
    alt: "Deux personnes devant le planning des projets affiché au mur du studio",
  },
];
