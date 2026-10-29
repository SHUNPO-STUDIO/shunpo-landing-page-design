import type { SystemDashboardData } from "@repo/ui/components/system-dashboard";
import {
  ChartColumn,
  Folder,
  LayoutGrid,
  MessageSquare,
  ReceiptText,
  RefreshCw,
} from "lucide-react";
import type { StaticImageData } from "next/image";

import blindImage from "./images/pains-aveugle.webp";
import searchImage from "./images/pains-recherche.webp";
import retypingImage from "./images/pains-ressaisie.webp";
import onePersonImage from "./images/pains-une-personne.webp";

export interface Pain {
  id: string;
  number: string;
  title: string;
  text: string;
  caption: string;
  stamp: string;
  image: StaticImageData;
  alt: string;
  /* Dashboard tiles the stamped plate files into (`data-tile`). */
  targets: string[];
}

export const painsTitle = "Votre entreprise tourne. À quel prix ?";

export const pains: Pain[] = [
  {
    id: "ressaisie",
    number: "01",
    title: "Vous ressaisissez les mêmes données",
    text: "Un devis dans un outil, la facture dans un autre, le suivi dans un Excel à rallonge.",
    caption: "Ressaisie",
    stamp: "Saisi une fois",
    image: retypingImage,
    alt: "Figurine en papier washi qui recopie la même facture sur trois feuilles.",
    targets: ["files", "cases"],
  },
  {
    id: "recherche",
    number: "02",
    title: "Vous cherchez une information pendant des heures",
    text: "Mails, WhatsApp, Excel, Drive : vous ne savez plus où elle se trouve.",
    caption: "Recherche",
    stamp: "Classé",
    image: searchImage,
    alt: "Figurine en papier washi agenouillée au milieu d’un tas d’enveloppes et de dossiers.",
    targets: ["mails"],
  },
  {
    id: "dependance",
    number: "03",
    title: "Tout repose sur une ou deux personnes",
    text: "Quand l’une d’elles est absente, tout ralentit.",
    caption: "Dépendance",
    stamp: "Partagé",
    image: onePersonImage,
    alt: "Figurine en papier washi qui porte une pile de dossiers pendant que deux collègues attendent.",
    targets: ["tasks"],
  },
  {
    id: "angle-mort",
    number: "04",
    title: "Vous pilotez à l’aveugle",
    text: "Quand vous voyez un problème, il a déjà coûté.",
    caption: "Angle mort",
    stamp: "À jour",
    image: blindImage,
    alt: "Figurine en papier washi aux yeux bandés qui avance vers un graphique renversé.",
    targets: ["activity"],
  },
];

export const painsOutro = {
  label: "Avec SHUNPO",
  title: "Un seul système. Les tâches répétitives partent seules.",
  text: "Pas un ERP de plus : vos données réunies, vos outils connectés, des automatisations et des agents IA qui préparent le travail. Votre équipe valide.",
};

export const dashboard: SystemDashboardData = {
  label:
    "Exemple de système construit par SHUNPO, données fictives : tableau de bord avec dossiers en cours, temps gagné, mails traités, automatisations actives, activité de l’équipe, tâches du jour, derniers dossiers et assistant IA.",
  note: "Exemple de système construit par SHUNPO · données fictives",
  sidebar: {
    workspace: "[Votre entreprise]",
    navigation: [
      { label: "Tableau de bord", icon: LayoutGrid, count: "3", current: true },
      { label: "Ventes", icon: ReceiptText },
      { label: "Dossiers", icon: Folder },
      { label: "Automatisations", icon: RefreshCw },
      { label: "Reporting", icon: ChartColumn },
      { label: "Assistant IA", icon: MessageSquare },
    ],
    connectionsTitle: "Connecté à",
    connections: [
      { label: "Messagerie", status: "à jour" },
      { label: "Comptabilité", status: "à jour" },
      { label: "Agenda", status: "à jour" },
      { label: "Signature", status: "à jour" },
    ],
    user: { initials: "CM", name: "Claire Moreau", role: "Commerciale" },
  },
  header: {
    search: "Rechercher un client, un dossier…",
    shortcut: "⌘K",
    fiction: "Données fictives",
    title: "Tableau de bord",
    period: "Cette semaine",
  },
  metrics: [
    { id: "cases", label: "Dossiers en cours", value: "6", trend: "+20 %" },
    { id: "time", label: "Temps gagné", value: "11 h 08", trend: "+19 %" },
    { id: "mails", label: "Mails traités", value: "96", trend: "+19 %" },
    { id: "automations", label: "Automatisations actives", value: "8", trend: "+14 %" },
  ],
  activity: {
    title: "Activité de l’équipe",
    period: "Par jour",
    days: [
      { label: "Lun", automated: 27, manual: 13 },
      { label: "Mar", automated: 40, manual: 13 },
      { label: "Mer", automated: 33, manual: 10 },
      { label: "Jeu", automated: 32, manual: 6 },
      { label: "Ven" },
      { label: "Sam" },
      { label: "Dim" },
    ],
    highlight: { day: 3, label: "32 actions automatisées", detail: "6 par l’équipe" },
  },
  tasks: {
    title: "Tâches du jour",
    progress: "2 sur 4",
    items: [
      { label: "Vérifier devis", client: "Le Comptoir", time: "10 h 30", done: true },
      { label: "Relancer", client: "Les Tilleuls", time: "11 h 00", done: true },
      { label: "Suivi dossier", client: "Martin", time: "14 h 00", done: false },
      { label: "Point d’équipe", time: "16 h 00", done: false },
    ],
  },
  files: {
    title: "Derniers dossiers",
    action: "Tout voir",
    items: [
      { name: "Brasserie Le Comptoir", kind: "Dépannage", progress: 75 },
      { name: "Hôtel Les Tilleuls", kind: "Devis", progress: 40 },
      { name: "Boulangeries Martin", kind: "Suivi", progress: 90 },
    ],
  },
  assistant: {
    title: "Assistant IA",
    prompt: "Prépare le suivi du dossier Martin après l’intervention.",
    suggestions: ["Suivi dossier", "Relance client", "Synthèse"],
  },
};
