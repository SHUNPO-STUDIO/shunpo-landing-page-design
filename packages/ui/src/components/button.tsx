import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { cn } from "../lib/cn.ts";

export const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm font-medium whitespace-nowrap transition select-none data-disabled:cursor-not-allowed data-disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        accent: "bg-accent text-accent-foreground hover:bg-accent/90",
        outline: "border border-foreground/60 bg-transparent text-foreground hover:bg-foreground/5",
        ghost: "bg-transparent text-foreground hover:bg-foreground/5",
      },
      size: {
        sm: "h-10 px-4 text-sm",
        md: "h-12 px-5 text-sm",
        lg: "h-14 px-6 text-md",
        icon: "size-12",
      },
      corner: {
        none: "",
        cut: "corner-cut-sm",
      },
      arrow: {
        true: "items-stretch gap-0 px-0",
        false: "",
      },
    },
    defaultVariants: { variant: "primary", size: "md", corner: "none", arrow: false },
  },
);

/* With `arrow`, the label and a trailing arrow sit in two cells split by a hairline, as on SHUNPO's calls to action. */
export function buttonChildren(children: ReactNode, arrow: boolean | null | undefined): ReactNode {
  if (arrow !== true) {
    return children;
  }
  return (
    <>
      <span className="flex items-center gap-2 px-5">{children}</span>
      <span
        data-slot="button-arrow"
        aria-hidden="true"
        className="flex items-center border-l border-current/25 px-4"
      >
        <ArrowRight />
      </span>
    </>
  );
}

interface ButtonProps
  extends Omit<BaseButton.Props, "children">, VariantProps<typeof buttonVariants> {
  className?: string;
  children?: ReactNode;
}

export function Button({
  variant,
  size,
  corner,
  arrow,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <BaseButton
      data-slot="button"
      className={cn(buttonVariants({ variant, size, corner, arrow }), className)}
      {...props}
    >
      {buttonChildren(children, arrow)}
    </BaseButton>
  );
}
