import { compactMarks } from "./clients-marks";
import { wordmarks } from "./clients-wordmarks";

export const clientsCopy = {
  label: "Ils nous confient leurs outils",
  pause: "Mettre en pause le défilement des logos",
};

/* The order of the G prototype's band, alternating wide and compact marks. */
export const clientLogos = [
  wordmarks.lemlist,
  compactMarks.carteNoire,
  wordmarks.opsClean,
  compactMarks.donnadieu,
  wordmarks.initial,
  wordmarks.frenchAbroad,
  compactMarks.insiders,
  wordmarks.hetic,
  compactMarks.axd,
  wordmarks.revoltrain,
  wordmarks.yBrush,
];
