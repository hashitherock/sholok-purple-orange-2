import { Button } from "@/components/ui/button";
import type { ReactNode } from "react";

export function SectionHeader({ title, tag, action }: { title: string; tag?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-bold text-foreground">{title}</h2>
        {tag}
      </div>
      {action}
    </div>
  );
}

export function DemoTag({ label }: { label: string }) {
  return <span className="rounded border px-1.5 py-0.5 text-[11px] text-muted-foreground">{label}</span>;
}

export function Tabs({ items, value, onChange }: { items: { id: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="tablist" className="flex min-w-0 gap-0.5 overflow-x-auto border-b pb-px [scrollbar-width:none]">
      {items.map((i) => (
        <Button variant="ghost"
          key={i.id}
          role="tab"
          aria-selected={value === i.id}
          onClick={() => onChange(i.id)}
          className={`h-9 shrink-0 rounded-none border-b-2 px-2 py-1 text-xs transition-colors ${value === i.id ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}
        >
          {i.label}
        </Button>
      ))}
    </div>
  );
}
