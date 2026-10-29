import type { HTMLAttributes, ReactElement, ReactNode } from "react";

import { Container } from "../layout/container.tsx";
import { cn } from "../lib/cn.ts";
import { Stat } from "../typography/stat.tsx";

type CasePanelElement = "div" | "li" | "article";

interface CasePanelProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  as?: CasePanelElement;
  backdrop: ReactElement;
  logo: ReactElement;
  client: string;
  sector: string;
  figure: string;
  figureLabel: string;
  children: ReactNode;
}

/* A client case as a full-width Fuji Night panel over its blurred screenshot:
   logo and facts on top, the result figure beside the story of what was built. */
export function CasePanel({
  as: Element = "div",
  backdrop,
  logo,
  client,
  sector,
  figure,
  figureLabel,
  children,
  className,
  ...props
}: CasePanelProps) {
  return (
    <Element
      data-slot="case-panel"
      className={cn(
        "relative isolate flex overflow-hidden bg-background text-foreground scheme-dark corner-cut-xl lg:aspect-16/9 lg:max-h-svh",
        className,
      )}
      {...props}
    >
      <div
        aria-hidden="true"
        data-case="backdrop"
        className="absolute inset-0 -z-10 scale-110 blur-md [&_img]:object-cover"
      >
        {backdrop}
      </div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-fuji/70" />
      <Container
        data-case="content"
        className="flex flex-col justify-center gap-12 py-16 lg:gap-20"
      >
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
          <div>{logo}</div>
          <dl className="flex flex-wrap justify-between gap-x-10 gap-y-2 text-sm">
            <div className="flex gap-3">
              <dt className="opacity-75">Client</dt>
              <dd>{client}</dd>
            </div>
            <div className="flex gap-3">
              <dt className="opacity-75">Secteur</dt>
              <dd>{sector}</dd>
            </div>
          </dl>
        </div>
        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <dl>
            <Stat value={figure} label={figureLabel} />
          </dl>
          <h3 className="text-xl text-pretty md:text-2xl">{children}</h3>
        </div>
      </Container>
    </Element>
  );
}
