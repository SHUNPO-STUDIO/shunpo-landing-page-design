const media = `${process.env.NEXT_PUBLIC_BASE_PATH}/media/home`;

export const heroCopy = {
  title: "On construit le système qui fait tourner votre entreprise, boosté à l’IA.",
  action: "Réserver une Immersion",
} as const;

/* The client's sunrise in three states (night, red sun risen, peach dawn), 8.71 s read by the scroll. */
export const heroFilm = {
  sources: { mp4: `${media}/hero-sunrise.mp4`, webm: `${media}/hero-sunrise.webm` },
  /* From 5.54 s the sky is light enough for Fuji Night text (3.7:1 under the headline, as in the prototype). */
  lightAt: 5.54 / 8.71,
  /* At 1 100 of the prototype's 1 450 px of sunrise, the headline leaves the sky to the sun. */
  leaveAt: 1100 / 1450,
} as const;
