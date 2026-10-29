import type { BrushStroke, BrushTrace } from "./brush-stroke.ts";

/* Painted strokes as one self-contained SVG image, used as a mask: white where the ink lies, black in the
   grooves. The browser rasterises it once with its ink filter (ragged edges, uneven tone, a slight bleed),
   so revealing the strokes while scrolling never re-runs the filter. */

interface InkCanvas {
  width: number;
  height: number;
}

const INK = {
  edgeFrequency: 0.06,
  edgeDisplacement: 3,
  toneFrequency: 0.02,
  mottle: 0.7,
  bleed: 0.9,
  halo: 0.25,
  seed: 14,
} as const;

function inkFilter({ width, height }: InkCanvas): string {
  const toneAlpha = `${-INK.mottle} 0 0 0 ${INK.mottle * 0.5 + 0.97}`;
  return [
    `<filter id='ink' filterUnits='userSpaceOnUse' x='0' y='0' width='${width}' height='${height}' color-interpolation-filters='sRGB'>`,
    `<feTurbulence type='fractalNoise' baseFrequency='${INK.edgeFrequency}' numOctaves='2' seed='${INK.seed}' result='edge'/>`,
    `<feDisplacementMap in='SourceGraphic' in2='edge' scale='${INK.edgeDisplacement}' xChannelSelector='R' yChannelSelector='G' result='ragged'/>`,
    `<feTurbulence type='fractalNoise' baseFrequency='${INK.toneFrequency}' numOctaves='3' seed='${INK.seed + 5}' result='tone'/>`,
    `<feColorMatrix in='tone' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 ${toneAlpha}' result='mottle'/>`,
    "<feComposite in='ragged' in2='mottle' operator='in' result='ink'/>",
    `<feGaussianBlur in='ragged' stdDeviation='${INK.bleed}' result='blur'/>`,
    `<feColorMatrix in='blur' type='matrix' values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 ${INK.halo} 0' result='halo'/>`,
    "<feMerge><feMergeNode in='halo'/><feMergeNode in='ink'/></feMerge></filter>",
  ].join("");
}

function traceMarkup(trace: BrushTrace, colour: string): string {
  return `<path d='${trace.path}' stroke='${colour}' stroke-width='${trace.width.toFixed(2)}' stroke-opacity='${trace.opacity.toFixed(2)}' stroke-dasharray='${trace.dashes}' pathLength='100'/>`;
}

function strokeMarkup(stroke: BrushStroke): string {
  return [
    `<path d='${stroke.body}' fill='white' fill-opacity='0.96'/>`,
    `<g fill='none'>${stroke.bristles.map((bristle) => traceMarkup(bristle, "white")).join("")}`,
    `${stroke.grooves.map((groove) => traceMarkup(groove, "black")).join("")}</g>`,
  ].join("");
}

export function inkImage(strokes: readonly BrushStroke[], canvas: InkCanvas): string {
  const markup = [
    `<svg xmlns='http://www.w3.org/2000/svg' width='${canvas.width}' height='${canvas.height}' viewBox='0 0 ${canvas.width} ${canvas.height}'>`,
    `<defs>${inkFilter(canvas)}</defs><g filter='url(#ink)'>${strokes.map((stroke) => strokeMarkup(stroke)).join("")}</g></svg>`,
  ].join("");
  return `data:image/svg+xml,${markup.replaceAll("%", "%25").replaceAll("#", "%23").replaceAll("<", "%3C").replaceAll(">", "%3E")}`;
}
