import { Bell, ChevronDown, Search } from "lucide-react";

export interface DashboardHeaderData {
  search: string;
  shortcut: string;
  fiction: string;
  title: string;
  period: string;
}

interface DashboardHeaderProps extends DashboardHeaderData {
  initials: string;
}

/* The dashboard's top bar (search, fictional-data notice, alerts, user) and its page title. */
export function DashboardHeader({
  search,
  shortcut,
  fiction,
  title,
  period,
  initials,
}: DashboardHeaderProps) {
  return (
    <div data-slot="dashboard-header" data-tile="header" className="flex flex-col gap-3">
      <div className="flex items-center gap-3 text-xs text-muted-foreground">
        <span className="flex min-w-0 flex-1 items-center gap-2 bg-muted px-2 py-1">
          <Search aria-hidden="true" className="size-3 shrink-0" />
          <span className="min-w-0 flex-1 truncate">{search}</span>
          <span className="hidden bg-background px-1 @compact:inline">{shortcut}</span>
        </span>
        <span className="whitespace-nowrap">{fiction}</span>
        <Bell aria-hidden="true" className="hidden size-3 shrink-0 @compact:block" />
        <span className="hidden size-6 shrink-0 place-items-center bg-foreground text-background @compact:grid">
          {initials}
        </span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <span className="text-lg">{title}</span>
        <span className="flex items-center gap-1 border border-border bg-surface px-2 py-1 text-xs">
          {period}
          <ChevronDown aria-hidden="true" className="size-3" />
        </span>
      </div>
    </div>
  );
}
