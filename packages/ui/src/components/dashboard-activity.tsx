import { DashboardPanel } from "./dashboard-panel.tsx";

export interface DashboardDay {
  label: string;
  /* Actions of the day; omit both for days still to come. */
  automated?: number;
  manual?: number;
}

export interface DashboardActivityData {
  title: string;
  period: string;
  days: DashboardDay[];
  /* The day called out above the chart, by index. */
  highlight: { day: number; label: string; detail: string };
}

/* The tallest bar fills this share of the chart, leaving room for the call-out above. */
const HEADROOM = 0.5;

function percent(value: number, total: number): string {
  return `${((value / total) * 100).toFixed(1)}%`;
}

interface DayBarProps {
  day: DashboardDay;
  scale: number;
  highlighted: boolean;
}

function DayBar({ day, scale, highlighted }: DayBarProps) {
  const automated = day.automated ?? 0;
  const manual = day.manual ?? 0;
  const total = automated + manual;
  if (total === 0) {
    return <span className="w-3 border-t border-dashed border-muted-foreground" />;
  }
  return (
    <span
      data-live="rise"
      className="flex w-3 origin-bottom flex-col"
      style={{ height: percent(total, scale) }}
    >
      <span className="bg-border" style={{ height: percent(manual, total) }} />
      <span
        className={highlighted ? "bg-foreground" : "bg-muted-foreground"}
        style={{ height: percent(automated, total) }}
      />
    </span>
  );
}

/* The team's activity per day: automated actions under the team's own, today called out. */
export function DashboardActivity({ title, period, days, highlight }: DashboardActivityData) {
  const busiest = Math.max(...days.map((day) => (day.automated ?? 0) + (day.manual ?? 0)));
  const scale = busiest / HEADROOM;
  return (
    <DashboardPanel tile="activity" title={title} aside={period} className="@compact:col-span-3">
      <div className="flex h-24 border-b border-border">
        {days.map((day, index) => (
          <div key={day.label} className="relative flex flex-1 flex-col items-center justify-end">
            {index === highlight.day ? (
              <span
                data-live="appear"
                className="absolute top-0 flex flex-col items-center border border-border bg-surface px-2 py-1 text-xs whitespace-nowrap"
              >
                {highlight.label}
                <span className="text-muted-foreground">{highlight.detail}</span>
              </span>
            ) : null}
            <DayBar day={day} scale={scale} highlighted={index === highlight.day} />
          </div>
        ))}
      </div>
      <div className="flex text-xs text-muted-foreground">
        {days.map((day) => (
          <span key={day.label} className="flex-1 text-center">
            {day.label}
          </span>
        ))}
      </div>
    </DashboardPanel>
  );
}
