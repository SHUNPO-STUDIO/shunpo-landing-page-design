import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "../lib/cn.ts";

interface DashboardPanelProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /* The tile name a filing scene lights up (`data-tile`). */
  tile: string;
  title: string;
  aside?: ReactNode;
}

/* A titled tile of the system dashboard: light paper on the dashboard's ground, a hairline border. */
export function DashboardPanel({
  tile,
  title,
  aside,
  className,
  children,
  ...props
}: DashboardPanelProps) {
  return (
    <div
      data-slot="dashboard-panel"
      data-tile={tile}
      className={cn("flex flex-col gap-3 border border-border bg-surface p-3", className)}
      {...props}
    >
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <span className="font-medium">{title}</span>
        {aside === undefined ? null : <span className="text-muted-foreground">{aside}</span>}
      </div>
      {children}
    </div>
  );
}
