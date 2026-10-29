import type { HTMLAttributes } from "react";

import { cn } from "../lib/cn.ts";
import { type DashboardActivityData, DashboardActivity } from "./dashboard-activity.tsx";
import { type DashboardAssistantData, DashboardAssistant } from "./dashboard-assistant.tsx";
import { type DashboardFilesData, DashboardFiles } from "./dashboard-files.tsx";
import { type DashboardHeaderData, DashboardHeader } from "./dashboard-header.tsx";
import { type DashboardMetricData, DashboardMetric } from "./dashboard-metric.tsx";
import { type DashboardSidebarData, DashboardSidebar } from "./dashboard-sidebar.tsx";
import { type DashboardTasksData, DashboardTasks } from "./dashboard-tasks.tsx";

export interface SystemDashboardData {
  /* What the picture shows, read by assistive technologies instead of the drawing. */
  label: string;
  /* The caption under the frame, e.g. that the data is fictional. */
  note: string;
  sidebar: DashboardSidebarData;
  header: DashboardHeaderData;
  metrics: DashboardMetricData[];
  activity: DashboardActivityData;
  tasks: DashboardTasksData;
  files: DashboardFilesData;
  assistant: DashboardAssistantData;
}

type SystemDashboardProps = SystemDashboardData & HTMLAttributes<HTMLElement>;

/* An example of a system SHUNPO builds, drawn as a picture (not an app): every tile carries `data-tile`
   so a filing scene can light it up. Phones get a single column; the sidebar and four-tile row
   arrive from the compact container width. */
export function SystemDashboard({
  label,
  note,
  sidebar,
  header,
  metrics,
  activity,
  tasks,
  files,
  assistant,
  className,
  ...props
}: SystemDashboardProps) {
  return (
    <figure
      data-slot="system-dashboard"
      className={cn("@container flex flex-col gap-3", className)}
      {...props}
    >
      <p className="sr-only">{label}</p>
      <div
        aria-hidden="true"
        className="relative flex flex-col p-0.5 text-foreground @compact:flex-row"
      >
        <div data-tile="frame" className="absolute inset-0 bg-foreground p-0.5 corner-cut">
          <div className="size-full bg-background corner-cut" />
        </div>
        <DashboardSidebar {...sidebar} />
        <div className="relative flex min-w-0 flex-1 flex-col gap-2 p-3">
          <DashboardHeader {...header} initials={sidebar.user.initials} />
          <div className="grid grid-cols-2 gap-2 @compact:grid-cols-4">
            {metrics.map((metric) => (
              <DashboardMetric key={metric.id} {...metric} />
            ))}
          </div>
          <div className="grid gap-2 @compact:grid-cols-5">
            <DashboardActivity {...activity} />
            <DashboardTasks {...tasks} />
            <DashboardFiles {...files} />
            <DashboardAssistant {...assistant} />
          </div>
        </div>
      </div>
      <figcaption className="text-xs text-muted-foreground">{note}</figcaption>
    </figure>
  );
}
