import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/cn.ts";

const comparisonCardVariants = cva("flex flex-col gap-10 px-6 py-8 corner-cut-lg md:p-12", {
  variants: {
    tone: {
      standard: "bg-shiro text-muted-foreground",
      custom: "bg-background text-foreground scheme-dark",
    },
  },
  defaultVariants: { tone: "standard" },
});

type ComparisonTone = NonNullable<VariantProps<typeof comparisonCardVariants>["tone"]>;

function CrossMark() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="size-5 shrink-0 translate-y-0.5 opacity-70"
    >
      <circle cx="10" cy="10" r="9.25" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function CheckMark() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-5 shrink-0 translate-y-0.5">
      <circle cx="10" cy="10" r="10" fill="currentColor" />
      <path
        d="M6 10.2l2.7 2.7L14.2 7.4"
        fill="none"
        strokeWidth="1.6"
        className="stroke-background"
      />
    </svg>
  );
}

const marks: Record<ComparisonTone, () => ReactNode> = {
  standard: CrossMark,
  custom: CheckMark,
};

interface ComparisonCardProps
  extends Omit<HTMLAttributes<HTMLElement>, "title">, VariantProps<typeof comparisonCardVariants> {
  title: ReactNode;
  label?: string;
  claim: string;
  items: string[];
}

/* One side of a before/after comparison: who adapts to whom, then the points that prove it. */
export function ComparisonCard({
  tone,
  title,
  label,
  claim,
  items,
  className,
  ...props
}: ComparisonCardProps) {
  const Mark = marks[tone ?? "standard"];
  return (
    <article
      data-slot="comparison-card"
      className={cn(comparisonCardVariants({ tone }), className)}
      {...props}
    >
      <div className="flex flex-col gap-6">
        <h3 className="flex min-h-10 flex-wrap items-center gap-x-4 gap-y-1 font-display text-2xl tracking-tight">
          {title}
          {label === undefined ? null : (
            <>
              {" "}
              <span className="font-sans text-sm font-medium opacity-75">{label}</span>
            </>
          )}
        </h3>
        <p className="font-display text-3xl tracking-tight text-balance">{claim}</p>
      </div>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 border-t border-current/15 py-5 text-md">
            <Mark />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
