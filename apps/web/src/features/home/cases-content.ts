import altarocLogo from "./images/cases-altaroc-logo.webp";
import altaroc from "./images/cases-altaroc.webp";
import opscleanLogo from "./images/cases-opsclean-logo.webp";
import opsclean from "./images/cases-opsclean.webp";
import tf1Logo from "./images/cases-tf1-logo.webp";
import tf1 from "./images/cases-tf1.webp";

export const casesTitle = "Qu’ont gagné nos clients ?";

export const casesLead =
  "Trois projets en production. Pour chacun, ce qu’on a construit et le résultat chiffré.";

export const cases = [
  {
    client: "TF1",
    sector: "Médias",
    figure: "+1,4 M",
    figureLabel: "Téléspectateurs et joueurs",
    story:
      "Pour TF1, nous avons développé en huit semaines la première application de jeu synchronisée avec le direct du Grand Quiz. Les téléspectateurs répondent aux mêmes questions que les invités en plateau, sans décalage, même au pic d’audience de 21 h.",
    backdrop: tf1,
    logo: tf1Logo,
  },
  {
    client: "Altaroc",
    sector: "FinTech",
    figure: "+1,6 Md€",
    figureLabel: "D’actifs gérés et suivis",
    story:
      "Pour Altaroc, nous avons développé la plateforme qui ouvre le private equity institutionnel aux investisseurs privés. Inscription, vérification d’identité et suivi des placements se font en ligne, avec une sécurité de niveau bancaire.",
    backdrop: altaroc,
    logo: altarocLogo,
  },
  {
    client: "Ops Clean",
    sector: "Industrie",
    figure: "1 M€+",
    figureLabel: "De chiffre d’affaires annuel",
    story:
      "Pour Ops Clean, lessive écologique fabriquée à Lyon, nous avons migré la boutique de Wix vers Shopify en deux mois. Le site a tenu son passage à la télévision sur M6 sans aucun bug.",
    backdrop: opsclean,
    logo: opscleanLogo,
  },
];
