import { ArrowUpRight } from "lucide-react";
import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";

export interface DashboardMetricData {
  /* The tile name a filing scene lights up (`data-tile`). */
  id: string;
  label: string;
  value: string;
  trend: string;
}

type DashboardMetricProps = DashboardMetricData & Omit<HTMLAttributes<HTMLDivElement>, "id">;

const WHOLE_NUMBER = /^\d+$/u;

/* A key figure of the system dashboard. Whole numbers count up when the tile comes alive. */
export function DashboardMetric({
  id,
  label,
  value,
  trend,
  className,
  ...props
}: DashboardMetricProps) {
  return (
    <div
      data-slot="dashboard-metric"
      data-tile={id}
      className={cn("flex flex-col gap-1 border border-border bg-surface p-3", className)}
      {...props}
    >
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="flex flex-wrap items-baseline gap-x-2">
        <span
          data-live={WHOLE_NUMBER.test(value) ? "count" : undefined}
          className="text-2xl tracking-tight whitespace-nowrap tabular-nums"
        >
          {value}
        </span>
        <span className="ms-auto flex items-center gap-1 text-xs whitespace-nowrap text-muted-foreground">
          <ArrowUpRight aria-hidden="true" className="size-3" />
          {trend}
        </span>
      </span>
    </div>
  );
}
