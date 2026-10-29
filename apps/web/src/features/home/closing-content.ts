const media = `${process.env.NEXT_PUBLIC_BASE_PATH}/media/home`;

export const closingCopy = {
  title: "Construisons le dernier logiciel dont vous aurez besoin.",
  action: "Parlons de votre projet",
} as const;

/* The paper samurai turns to face the reader and bows (5 s) while the closing section rises into view. */
export const closingFilm = {
  sources: { mp4: `${media}/closing-samurai.mp4`, webm: `${media}/closing-samurai.webm` },
  start: "top 60%",
  end: "bottom bottom",
} as const;
