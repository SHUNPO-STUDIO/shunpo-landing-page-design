/* « Comment se passe votre projet avec nous ? »: copy of the artifact's #s06, in G's three folders. */

export const methodTitle = "Comment se passe votre projet avec nous ?";

export const methodIntro =
  "La méthode SHUNPO, c’est le terrain d’abord. Vous décidez de la suite à chaque étape : 5 jours d’Immersion pour comprendre votre entreprise, la Construction de votre système brique par brique, puis son Évolution.";

interface MethodFolder {
  tab: string;
  kanji: string;
  title: string;
  caption: string;
  tone: "kome" | "sand" | "mist";
}

interface MethodSheet {
  id: string;
  kicker: string;
  title: string;
  text: string;
}

interface MethodAside {
  kicker: string;
  items: readonly string[];
}

export const immersion = {
  folder: {
    tab: "Étape 1 · Voir",
    kanji: "見",
    title: "Immersion",
    caption: "5 jours sur le terrain",
    tone: "kome",
  } satisfies MethodFolder,
  sheet: {
    id: "methode-immersion",
    kicker: "5 jours dans votre entreprise",
    title: "Immersion",
    text: "On observe les postes, on interroge chaque service, on relève les tâches et leur durée. Puis on priorise ce qui vous rendra le plus de temps.",
  } satisfies MethodSheet,
  link: "Comment se passe l’Immersion",
  aside: {
    kicker: "Vous repartez avec",
    items: [
      "La carte de vos process",
      "Vos heures perdues, chiffrées",
      "Une feuille de route priorisée",
    ],
  } satisfies MethodAside,
  price: "À partir de 5 000 € HT, remboursée sur la construction de la première brique.",
};

export const construction = {
  folder: {
    tab: "Étape 2 · Construire",
    kanji: "築",
    title: "Construction",
    caption: "Brique par brique",
    tone: "sand",
  } satisfies MethodFolder,
  sheet: {
    id: "methode-construction",
    kicker: "Premier résultat en quelques semaines",
    title: "Construction",
    text: "On commence par le processus qui coûte le plus. Premier résultat en quelques semaines, puis on étend, brique par brique.",
  } satisfies MethodSheet,
  chips: ["Un outil testé avec vos équipes", "Le temps gagné, mesuré", "Votre code et vos données"],
  bricks: [
    { kicker: "Brique 1", label: "Relances" },
    { kicker: "Brique 2", label: "Pièces comptables" },
    { kicker: "Brique 3", label: "Planning" },
    { kicker: "Brique 4", label: "Tableau de bord" },
  ],
  stamp: "Livré",
  caption: "Exemple · données fictives",
};

export const evolution = {
  folder: {
    tab: "Étape 3 · Avancer",
    kanji: "進",
    title: "Évolution",
    caption: "Chaque mois",
    tone: "mist",
  } satisfies MethodFolder,
  sheet: {
    id: "methode-evolution",
    kicker: "On maintient, on fait évoluer",
    title: "Évolution",
    text: "Les outils et les modèles d’IA changent, votre entreprise aussi. On maintient, on supervise et on fait évoluer.",
  } satisfies MethodSheet,
  aside: {
    kicker: "Chaque mois",
    items: ["Maintenance et supervision", "Outils et modèles à jour", "Des évolutions chaque mois"],
  } satisfies MethodAside,
};
