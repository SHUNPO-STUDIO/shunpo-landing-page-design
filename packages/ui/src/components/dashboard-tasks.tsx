import { Check } from "lucide-react";

import { cn } from "../lib/cn.ts";
import { DashboardPanel } from "./dashboard-panel.tsx";

export interface DashboardTask {
  label: string;
  client?: string;
  time: string;
  done: boolean;
}

export interface DashboardTasksData {
  title: string;
  /* How many tasks are done, e.g. « 2 sur 4 ». */
  progress: string;
  items: DashboardTask[];
}

/* Today's tasks with their checkboxes; done ones tick when the tile comes alive. */
export function DashboardTasks({ title, progress, items }: DashboardTasksData) {
  return (
    <DashboardPanel tile="tasks" title={title} aside={progress} className="@compact:col-span-2">
      <ul className="flex flex-col gap-2 text-xs">
        {items.map((task) => (
          <li key={task.label} className="flex items-center gap-2">
            <span className="relative size-3 shrink-0 border border-muted-foreground">
              {task.done ? (
                <span
                  data-live="appear"
                  className="absolute inset-0 grid place-items-center bg-foreground text-background"
                >
                  <Check aria-hidden="true" className="size-2" strokeWidth={4} />
                </span>
              ) : null}
            </span>
            <span className={cn("min-w-0 flex-1 truncate", task.done && "text-muted-foreground")}>
              {task.label}
              {task.client === undefined ? null : (
                <span className="hidden text-muted-foreground @narrow:inline">
                  {" "}
                  · {task.client}
                </span>
              )}
            </span>
            <span className="text-muted-foreground tabular-nums">{task.time}</span>
          </li>
        ))}
      </ul>
    </DashboardPanel>
  );
}
