"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../lib/cn.ts";
import { buttonChildren, buttonVariants } from "./button.tsx";

interface ButtonLinkProps
  extends useRender.ComponentProps<"a">, VariantProps<typeof buttonVariants> {
  className?: string;
}

export function ButtonLink({
  render,
  variant,
  size,
  corner,
  arrow,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  const ownProps = {
    "data-slot": "button-link",
    className: cn(buttonVariants({ variant, size, corner, arrow }), className),
    children: buttonChildren(children, arrow),
  };
  return useRender({ defaultTagName: "a", render, props: mergeProps<"a">(ownProps, props) });
}
