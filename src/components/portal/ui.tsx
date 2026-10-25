import type { ReactNode } from "react";

export function SectionHeader({ title, tag, action }: { title: string; tag?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-bold text-foreground md:text-xl">{title}</h2>
        {tag}
      </div>
      {action}
    </div>
  );
}

export function DemoTag({ label }: { label: string }) {
  return <span className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">{label}</span>;
}

export function Tabs({ items, value, onChange }: { items: { id: string; label: string }[]; value: string; onChange: (v: string) => void }) {
  return (
    <div role="tablist" className="-mx-1 flex gap-1 overflow-x-auto border-b pb-px">
      {items.map((i) => (
        <button
          key={i.id}
          role="tab"
          aria-selected={value === i.id}
          onClick={() => onChange(i.id)}
          className={`shrink-0 border-b-2 px-3 py-2 text-sm transition-colors ${value === i.id ? "border-primary font-semibold text-primary" : "border-transparent text-muted-foreground hover:text-primary"}`}
        >
          {i.label}
        </button>
      ))}
    </div>
  );
}
