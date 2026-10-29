import { LoaderCircle, type LucideIcon } from "lucide-react";

import { cn } from "../lib/cn.ts";

export interface DashboardNavItem {
  label: string;
  icon: LucideIcon;
  count?: string;
  current?: boolean;
}

export interface DashboardConnection {
  label: string;
  status: string;
}

export interface DashboardSidebarData {
  workspace: string;
  navigation: DashboardNavItem[];
  connectionsTitle: string;
  connections: DashboardConnection[];
  user: { initials: string; name: string; role: string };
}

/* The dashboard's Fuji Night side: a header strip on phones, an icon rail when compact, labels from prose width. */
export function DashboardSidebar({
  workspace,
  navigation,
  connectionsTitle,
  connections,
  user,
}: DashboardSidebarData) {
  return (
    <div
      data-slot="dashboard-sidebar"
      data-tile="sidebar"
      className="relative flex items-center justify-between gap-4 bg-background p-2 text-xs text-foreground scheme-dark @compact:w-14 @compact:flex-col @compact:items-stretch @compact:justify-start @prose:w-40 @narrow:w-48"
    >
      <span className="flex items-center gap-2 p-1 @compact:justify-center @prose:justify-start">
        <LoaderCircle aria-hidden="true" className="size-4 shrink-0 @prose:hidden @narrow:block" />
        <span className="@compact:hidden @prose:inline">
          <span className="text-muted-foreground">{workspace}</span> OS
        </span>
      </span>
      <ul className="hidden flex-col gap-1 @compact:flex">
        {navigation.map(({ label, icon: Glyph, count, current }) => (
          <li
            key={label}
            className={cn(
              "flex items-center justify-center gap-2 rounded-sm px-2 py-1 text-muted-foreground @prose:justify-start",
              current === true && "bg-muted text-foreground",
            )}
          >
            <Glyph aria-hidden="true" className="size-3 shrink-0" />
            <span className="hidden flex-1 truncate @prose:inline">{label}</span>
            {count === undefined ? null : <span className="hidden @prose:inline">{count}</span>}
          </li>
        ))}
      </ul>
      <div className="hidden flex-col gap-2 @prose:flex">
        <span className="text-muted-foreground">{connectionsTitle}</span>
        <ul className="flex flex-col gap-1">
          {connections.map((connection) => (
            <li key={connection.label} className="flex items-center justify-between gap-2">
              {connection.label}
              <span className="flex items-center gap-1 text-muted-foreground">
                <span className="size-1 bg-muted-foreground" />
                {connection.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <span className="flex items-center gap-2 border-border @compact:mt-auto @compact:justify-center @prose:justify-start @prose:border-t @prose:py-2">
        <span className="grid size-6 shrink-0 place-items-center bg-muted">{user.initials}</span>
        <span className="hidden flex-col @prose:flex">
          {user.name}
          <span className="text-muted-foreground">{user.role}</span>
        </span>
      </span>
    </div>
  );
}
