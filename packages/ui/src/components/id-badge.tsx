import type { HTMLAttributes, ReactElement, ReactNode } from "react";

import { cn } from "../lib/cn.ts";
import { BrandLogo } from "./brand-logo.tsx";
import { Separator } from "./separator.tsx";

interface IdBadgeProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  /* A square portrait from next/image, cropped to the cut-corner photo slot. */
  image: ReactElement;
  /* The small caps line under the logo, e.g. the team the holder belongs to. */
  tag: ReactNode;
  jobTitle: ReactNode;
  profile: ReactNode;
  children: ReactNode;
}

/* A SHUNPO staff ID badge on washi paper: portrait, wordmark and tag, then the role, who holds it and what they do. */
export function IdBadge({
  image,
  tag,
  jobTitle,
  profile,
  children,
  className,
  ...props
}: IdBadgeProps) {
  return (
    <article
      data-slot="id-badge"
      className={cn(
        "flex w-full flex-col gap-5 rounded-xl bg-kome washi-fibre px-6 py-8 text-fuji shadow-md",
        className,
      )}
      {...props}
    >
      <header className="flex items-start gap-4">
        <div className="size-24 shrink-0 overflow-clip bg-ink-shadow corner-cut md:size-32 [&_img]:size-full [&_img]:object-cover">
          {image}
        </div>
        <div className="flex flex-col gap-3 py-1">
          <BrandLogo size="sm" />
          <p className="text-xs font-medium tracking-wide uppercase">{tag}</p>
        </div>
      </header>
      <Separator className="bg-fuji/15" />
      <div className="flex flex-col gap-3">
        <h3 className="font-display text-2xl font-regular tracking-tight">{jobTitle}</h3>
        <p className="text-sm font-medium text-ink-shadow">{profile}</p>
      </div>
      <p className="text-md">{children}</p>
    </article>
  );
}
