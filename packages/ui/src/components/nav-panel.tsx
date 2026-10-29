"use client";

import { NavigationMenu } from "@base-ui/react/navigation-menu";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { Container } from "../layout/container.tsx";
import { cn } from "../lib/cn.ts";
import { ButtonLink } from "./button-link.tsx";

interface NavPanelLink {
  label: string;
  href: string;
}

interface NavPanelRow {
  title: string;
  description: string;
  href: string;
}

interface NavPanelFeature {
  kicker: string;
  title: string;
  description: string;
  action: NavPanelLink;
}

interface NavPanelProps {
  kicker: string;
  /* Japanese reading of the kicker, set in the Mincho face (`・セクター`). */
  kana: string;
  title: string;
  rows: NavPanelRow[];
  feature: NavPanelFeature;
  link?: NavPanelLink;
  className?: string;
}

function bracketLabel(label: string, kana?: string): ReactNode {
  return (
    <p className="text-xs font-medium tracking-wide uppercase">
      [ {label}
      {kana === undefined ? null : (
        <span lang="ja" className="font-kanji tracking-normal text-muted-foreground">
          {" "}
          {kana}
        </span>
      )}{" "}
      ]
    </p>
  );
}

/* The paper sheet a `NavBarMenu` opens: a title, a list of destinations and one featured offer. */
export function NavPanel({ kicker, kana, title, rows, feature, link, className }: NavPanelProps) {
  return (
    <Container
      data-slot="nav-panel"
      className={cn("grid gap-8 py-12 lg:grid-cols-12 lg:gap-6", className)}
    >
      <div className="flex flex-col items-start gap-4 lg:col-span-4">
        {bracketLabel(kicker, kana)}
        <p className="font-display text-3xl tracking-tight text-balance">{title}</p>
        {link === undefined ? null : (
          <NavigationMenu.Link
            href={link.href}
            className="mt-auto inline-flex min-h-6 items-center gap-2 text-sm font-medium underline decoration-border underline-offset-4 transition-colors hover:decoration-foreground"
          >
            {link.label}
            <ArrowRight aria-hidden="true" className="size-4" />
          </NavigationMenu.Link>
        )}
      </div>
      <ul className="group/rows flex flex-col border-t border-border lg:col-span-4 lg:col-start-6">
        {rows.map((row) => (
          <li key={row.title} className="border-b border-border">
            <NavigationMenu.Link
              href={row.href}
              className="flex items-baseline justify-between gap-4 py-3 transition-opacity group-hover/rows:opacity-60 hover:opacity-100"
            >
              <span className="text-xl">{row.title}</span>
              <span className="text-sm text-muted-foreground">{row.description}</span>
            </NavigationMenu.Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-start gap-3 border-l border-border px-6 lg:col-span-3 lg:col-start-10">
        {bracketLabel(feature.kicker)}
        <p className="font-display text-2xl tracking-tight">{feature.title}</p>
        <p className="text-sm text-muted-foreground">{feature.description}</p>
        <ButtonLink
          variant="outline"
          size="sm"
          corner="cut"
          arrow
          render={<NavigationMenu.Link href={feature.action.href} />}
        >
          {feature.action.label}
        </ButtonLink>
      </div>
    </Container>
  );
}
