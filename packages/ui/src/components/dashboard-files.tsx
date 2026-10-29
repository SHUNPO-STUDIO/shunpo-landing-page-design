import { Folder } from "lucide-react";

import { DashboardPanel } from "./dashboard-panel.tsx";

export interface DashboardFile {
  name: string;
  kind: string;
  /* Completion, from 0 to 100. */
  progress: number;
}

export interface DashboardFilesData {
  title: string;
  action: string;
  items: DashboardFile[];
}

/* The latest files and how far along each one is. */
export function DashboardFiles({ title, action, items }: DashboardFilesData) {
  return (
    <DashboardPanel
      tile="files"
      title={title}
      aside={<span className="border-b border-current text-foreground">{action}</span>}
      className="@compact:col-span-3"
    >
      <ul className="flex flex-col text-xs">
        {items.map((file) => (
          <li
            key={file.name}
            className="flex items-center gap-3 border-t border-border py-2 first:border-t-0"
          >
            <Folder aria-hidden="true" className="size-3 shrink-0 text-muted-foreground" />
            <span className="min-w-0 flex-1 truncate">{file.name}</span>
            <span className="hidden w-20 text-muted-foreground @narrow:block">{file.kind}</span>
            <span className="h-1 w-12 shrink-0 bg-border">
              <span
                data-live="fill"
                className="block h-full origin-left bg-foreground"
                style={{ width: `${file.progress}%` }}
              />
            </span>
            <span className="w-8 shrink-0 text-end text-muted-foreground tabular-nums">
              {file.progress}&nbsp;%
            </span>
          </li>
        ))}
      </ul>
    </DashboardPanel>
  );
}
