export type Scheme = "light" | "dark";

const ISLAND = ".scheme-dark, .scheme-light";

/* The colour scheme of the page under a point, looking through an overlay (a fixed bar or rail)
   that sits on top of it. Outside any island, the page is light paper. */
export function schemeBeneath(x: number, y: number, overlay: Element): Scheme {
  const beneath = document.elementsFromPoint(x, y).find((element) => !overlay.contains(element));
  const island = beneath?.closest(ISLAND);
  return island?.classList.contains("scheme-dark") === true ? "dark" : "light";
}
