import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/cn.ts";

interface FooterColumnsProps extends HTMLAttributes<HTMLDivElement> {
  /* The brand block: logo and one-line description. */
  lead: ReactNode;
}

/* The footer's grid: the brand block, then up to four `FooterNav` columns. Two columns on phones,
   four on tablets with the brand above, one row on desktop with the brand taking a third. */
export function FooterColumns({ lead, className, children, ...props }: FooterColumnsProps) {
  return (
    <div
      data-slot="footer-columns"
      className={cn(
        "grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4 lg:grid-cols-12 lg:gap-x-8",
        className,
      )}
      {...props}
    >
      <div className="col-span-2 flex flex-col items-start gap-6 md:col-span-4 lg:col-span-4">
        {lead}
      </div>
      {children}
    </div>
  );
}
