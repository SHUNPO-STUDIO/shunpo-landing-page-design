import { cva, type VariantProps } from "class-variance-authority";
import type { LiHTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/cn.ts";
import { Kanji } from "../typography/kanji.tsx";

const backVariants = cva("washi-fibre", {
  variants: {
    tone: {
      kome: "bg-shiro",
      sand: "bg-washi-sand-deep",
      mist: "bg-washi-mist-deep",
    },
  },
});

const frontVariants = cva(
  "absolute inset-x-0 bottom-0 z-30 flex h-32 items-end justify-between gap-4 washi-fibre p-5 corner-cut-top before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-5 before:bg-linear-to-b before:from-fuji/10 before:to-transparent md:h-40 lg:p-6 staged:h-3/4",
  {
    variants: {
      tone: {
        kome: "bg-kome",
        sand: "bg-washi-sand",
        mist: "bg-washi-mist",
      },
    },
  },
);

type FolderTone = NonNullable<VariantProps<typeof backVariants>["tone"]>;

interface FolderProps extends Omit<LiHTMLAttributes<HTMLLIElement>, "title"> {
  /* Label on the folder's tab, e.g. « Étape 1 · Voir ». */
  tab: ReactNode;
  /* One kanji printed large on the folder front. */
  kanji: string;
  title: ReactNode;
  caption: ReactNode;
  tone?: FolderTone;
  /* The sheet filed in the folder (a `FolderSheet`). */
  children: ReactNode;
}

/* The drop that marks a folder: a faint ink drop at rest, Fuji Night once passed, a Fushimi drop while open.
   The scene animates it; without the scene every folder rests. */
function FolderDrop() {
  return (
    <span data-slot="folder-drop" aria-hidden="true" className="relative block size-4">
      <span
        data-part="past"
        className="absolute inset-0.5 rounded-full ink-drop text-fuji opacity-20"
      />
      <span
        data-part="active"
        className="absolute inset-0 scale-50 rounded-full ink-drop text-fushimi opacity-0"
      />
    </span>
  );
}

/* A washi paper folder: a tab, a back and a front cut at both top corners, with its sheet filed inside.
   Stacked, the sheet follows the folder; inside a running `FolderScene`, the folder joins a row and its
   sheet is pulled out on stage. */
export function Folder({
  tab,
  kanji,
  title,
  caption,
  tone = "kome",
  className,
  children,
  ...props
}: FolderProps) {
  return (
    <li data-slot="folder" className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex flex-col text-fuji">
        <span
          className={cn(
            backVariants({ tone }),
            "flex h-8 items-center self-start rounded-t-lg px-4 text-xs font-medium tracking-wide text-ink-shadow",
          )}
        >
          {tab}
        </span>
        <div
          data-slot="folder-body"
          className="relative h-40 md:h-48 staged:aspect-36/25 staged:h-auto"
        >
          <div
            className={cn(
              backVariants({ tone }),
              "absolute inset-0 z-10 rounded-lg rounded-tl-none shadow-xs",
            )}
          />
          <div data-slot="folder-front" className={frontVariants({ tone })}>
            <Kanji
              aria-hidden="true"
              className="text-6xl leading-none text-fuji staged:text-5xl staged:xl:text-6xl"
            >
              {kanji}
            </Kanji>
            <span className="flex flex-col items-end gap-2 text-end">
              <FolderDrop />
              <span className="flex flex-col items-end gap-0.5">
                <span className="font-display text-md">{title}</span>
                <span className="text-xs font-medium tracking-wide text-ink-shadow uppercase">
                  {caption}
                </span>
              </span>
            </span>
          </div>
        </div>
      </div>
      {children}
    </li>
  );
}
