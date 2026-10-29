import type { HTMLAttributes, ReactElement, ReactNode } from "react";

import { cn } from "../lib/cn.ts";

interface TestimonialCardProps extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  /* A square photo of the author from next/image, decorative (`alt=""`): the name sits next to it. */
  photo: ReactElement;
  name: ReactNode;
  jobTitle: ReactNode;
  /* The quote, verbatim. */
  children: ReactNode;
}

/* A client's words on light paper in a thin Kome frame, square corners, signed with a photo, name and role. */
export function TestimonialCard({
  photo,
  name,
  jobTitle,
  children,
  className,
  ...props
}: TestimonialCardProps) {
  return (
    <div data-slot="testimonial-card" className={cn("h-full bg-kome/55 p-1", className)} {...props}>
      <figure className="flex h-full flex-col justify-between gap-12 bg-surface p-6 text-foreground lg:p-8">
        <blockquote className="text-md">{children}</blockquote>
        <figcaption className="flex items-center gap-3">
          <div className="size-12 shrink-0 overflow-clip bg-muted [&_img]:size-full [&_img]:object-cover">
            {photo}
          </div>
          <div className="flex flex-col">
            <span className="text-md font-medium">{name}</span>
            <span className="text-sm text-muted-foreground">{jobTitle}</span>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
