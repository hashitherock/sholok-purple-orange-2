import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, Mic, Clock } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { Button } from "@/components/ui/button";

const KEY = "sholok-recent";

export function useRecent() {
  const [recent, setRecent] = useState<string[]>([]);
  useEffect(() => {
    try { setRecent(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch { /* ignore */ }
  }, []);
  const save = (r: string[]) => { setRecent(r); localStorage.setItem(KEY, JSON.stringify(r)); };
  return {
    recent,
    add: (q: string) => save([q, ...recent.filter((x) => x !== q)].slice(0, 6)),
    clear: () => save([]),
  };
}

export function MainSearch({ initial = "", compact = false, autoFocus = false }: { initial?: string; compact?: boolean; autoFocus?: boolean }) {
  const { t } = useI18n();
  const nav = useNavigate();
  const [q, setQ] = useState(initial);
  const [focus, setFocus] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const { recent, add, clear } = useRecent();

  useEffect(() => setQ(initial), [initial]);
  useEffect(() => { if (autoFocus) ref.current?.focus(); }, [autoFocus]);

  const go = (term: string) => {
    const v = term.trim();
    if (!v) { ref.current?.focus(); return; }
    add(v);
    setFocus(false);
    nav({ to: "/search", search: { q: v, tab: "all" } });
  };

  return (
    <div className="relative w-full">
      <form
        role="search"
        onSubmit={(e) => { e.preventDefault(); go(q); }}
        className={`flex items-center gap-2 rounded-full border border-primary bg-background pl-4 transition-shadow focus-within:shadow-search ${compact ? "h-11" : "h-12 md:h-[50px]"}`}
      >
        <Search className="h-5 w-5 shrink-0 text-primary" aria-hidden />
        <input
          ref={ref}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 150)}
          placeholder={t("placeholder")}
          aria-label={t("placeholder")}
          className="h-full min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground md:text-lg"
        />
        {q && (
          <Button variant="ghost" type="button" onClick={() => { setQ(""); ref.current?.focus(); }} aria-label={t("clear")} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </Button>
        )}
        <Button variant="ghost" type="button" onClick={() => toast(t("voiceSoon"))} aria-label={t("voiceSoon")} className="hidden rounded-full p-1.5 text-muted-foreground hover:text-primary sm:block">
          <Mic className="h-5 w-5" />
        </Button>
        <Button variant="ghost" type="submit" className="relative h-full shrink-0 rounded-r-full px-4 text-primary hover:bg-primary-bg md:px-5 [&_svg]:size-5">
          <Search className="h-5 w-5" />
          <span className="sr-only">{t("search")}</span>
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" aria-hidden />
        </Button>
      </form>

      {focus && recent.length > 0 && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 panel p-3 text-left">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("recent")}</span>
            <Button variant="ghost" onMouseDown={(e) => e.preventDefault()} onClick={clear} className="hover:text-primary">{t("clearAll")}</Button>
          </div>
          <ul>
            {recent.map((r) => (
              <li key={r}>
                <Button variant="ghost" onMouseDown={(e) => e.preventDefault()} onClick={() => go(r)} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-primary">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {r}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

    </div>
  );
}
