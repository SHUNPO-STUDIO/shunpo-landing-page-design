import { ArrowRight } from "lucide-react";

import { DashboardPanel } from "./dashboard-panel.tsx";

export interface DashboardAssistantData {
  title: string;
  prompt: string;
  suggestions: string[];
}

/* The AI assistant: a request being typed and, when there is room, a few suggested actions. */
export function DashboardAssistant({ title, prompt, suggestions }: DashboardAssistantData) {
  return (
    <DashboardPanel tile="assistant" title={title} className="@compact:col-span-2">
      <span className="flex items-center gap-2 bg-background p-2 text-xs text-muted-foreground">
        <span className="flex-1">{prompt}</span>
        <span className="grid size-6 shrink-0 place-items-center bg-foreground text-background">
          <ArrowRight aria-hidden="true" className="size-3" />
        </span>
      </span>
      <span className="flex flex-wrap gap-1 text-xs @compact:hidden @narrow:flex">
        {suggestions.map((suggestion) => (
          <span key={suggestion} className="border border-border px-2 py-0.5">
            {suggestion}
          </span>
        ))}
      </span>
    </DashboardPanel>
  );
}
