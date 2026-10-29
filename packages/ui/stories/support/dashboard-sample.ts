import {
  ChartColumn,
  Folder,
  LayoutGrid,
  MessageSquare,
  ReceiptText,
  RefreshCw,
} from "lucide-react";

import type { SystemDashboardData } from "../../src/components/system-dashboard.tsx";

/* The example system of the SHUNPO home page, with its fictional data. */
export const dashboardSample: SystemDashboardData = {
  label:
    "Exemple de système, données fictives : tableau de bord avec dossiers en cours, temps gagné, mails traités, automatisations actives, activité de l’équipe, tâches du jour, derniers dossiers et assistant IA.",
  note: "Exemple de système · données fictives",
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
    { id: "cases", label: "Dossiers en cours", value: "6", trend: "+20 %" },
    { id: "time", label: "Temps gagné", value: "11 h 08", trend: "+19 %" },
    { id: "mails", label: "Mails traités", value: "96", trend: "+19 %" },
    { id: "automations", label: "Automatisations actives", value: "8", trend: "+14 %" },
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
    ],
    highlight: { day: 3, label: "32 actions automatisées", detail: "6 par l’équipe" },
  },
  tasks: {
    title: "Tâches du jour",
    progress: "1 sur 2",
    items: [
      { label: "Vérifier devis", client: "Le Comptoir", time: "10 h 30", done: true },
      { label: "Point d’équipe", time: "16 h 00", done: false },
    ],
  },
  files: {
    title: "Derniers dossiers",
    action: "Tout voir",
    items: [
      { name: "Brasserie Le Comptoir", kind: "Dépannage", progress: 75 },
      { name: "Hôtel Les Tilleuls", kind: "Devis", progress: 40 },
    ],
  },
  assistant: {
    title: "Assistant IA",
    prompt: "Prépare le suivi du dossier Martin après l’intervention.",
    suggestions: ["Suivi dossier", "Synthèse"],
  },
};
