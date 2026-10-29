import aiArchitect from "./images/team-ai-architect.webp";
import businessArchitect from "./images/team-business-architect.webp";
import experienceArchitect from "./images/team-experience-architect.webp";

export const teamTitle = "Qui s’occupe de votre projet ?";

export const teamLead =
  "Chez SHUNPO, des entrepreneurs pour comprendre, des designers pour simplifier, des développeurs pour livrer.";

export const teamTag = "Équipe projet";

export const teamAction = "Rencontrer l’équipe SHUNPO";

export const teamMembers = [
  {
    jobTitle: "Business Architect",
    profile: "Un chef d’entreprise",
    description:
      "Il parle votre langage, comprend vos enjeux business et les traduit en besoins techniques. Mène l’Immersion, fixe les priorités avec vous, tient le budget et le planning.",
    portrait: businessArchitect,
    portraitAlt: "Portrait en papier washi : figurine en kimono tenant un éventail",
    tilt: "left",
  },
  {
    jobTitle: "Experience Architect",
    profile: "Un expert UX/UI",
    description:
      "Dessine les écrans avec vos équipes et les teste avec elles, pour un outil qu’elles adoptent dès le premier jour.",
    portrait: experienceArchitect,
    portraitAlt: "Portrait en papier washi : figurine en kimono tenant un pinceau",
    tilt: "right",
  },
  {
    jobTitle: "AI Architect",
    profile: "Un pur développeur spécialisé en IA",
    description:
      "Il construit l’architecture de votre système, connecte vos outils, développe les briques et les agents IA, et assure son fonctionnement continu.",
    portrait: aiArchitect,
    portraitAlt:
      "Portrait en papier washi : figurine en kimono tenant un cube de papier, une grue en origami sur l’épaule",
    tilt: "slight",
  },
] as const;
