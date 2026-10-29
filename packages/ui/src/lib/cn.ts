import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      container: ["prose", "narrow", "default", "wide"],
      ease: ["standard", "emphasized"],
      font: ["sans", "mono", "display", "kanji"],
      "font-weight": ["light", "regular", "medium", "semibold"],
      tracking: ["tight", "normal", "wide"],
    },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
