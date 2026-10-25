import { useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Search, X, Mic, Clock, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { trending } from "@/data/content";

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
  const { t, lang } = useI18n();
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
        className={`flex items-center gap-2 rounded-2xl border-2 border-primary bg-background pl-4 shadow-search transition-shadow focus-within:ring-4 focus-within:ring-primary-soft ${compact ? "h-12" : "h-14 md:h-16"}`}
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
          <button type="button" onClick={() => { setQ(""); ref.current?.focus(); }} aria-label={t("clear")} className="rounded-full p-1.5 text-muted-foreground hover:bg-muted">
            <X className="h-4 w-4" />
          </button>
        )}
        <button type="button" onClick={() => toast(t("voiceSoon"))} aria-label={t("voiceSoon")} className="hidden rounded-full p-1.5 text-muted-foreground hover:text-primary sm:block">
          <Mic className="h-5 w-5" />
        </button>
        <button type="submit" className="relative mr-1.5 flex h-[calc(100%-12px)] items-center gap-2 rounded-xl bg-primary px-4 font-semibold text-primary-foreground transition-colors hover:bg-primary-dark md:px-6">
          <Search className="h-4 w-4 md:hidden" />
          <span className="hidden md:inline">{t("search")}</span>
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-brand-accent" aria-hidden />
        </button>
      </form>

      {focus && recent.length > 0 && (
        <div className="absolute inset-x-0 top-full z-30 mt-2 panel p-3 text-left">
          <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{t("recent")}</span>
            <button onMouseDown={(e) => e.preventDefault()} onClick={clear} className="hover:text-primary">{t("clearAll")}</button>
          </div>
          <ul>
            {recent.map((r) => (
              <li key={r}>
                <button onMouseDown={(e) => e.preventDefault()} onClick={() => go(r)} className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm hover:bg-accent hover:text-primary">
                  <Clock className="h-3.5 w-3.5 text-muted-foreground" /> {r}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!compact && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm">
          <span className="inline-flex items-center gap-1 font-semibold text-brand-accent">
            <TrendingUp className="h-4 w-4" /> {t("trending")}
          </span>
          {trending.map((tr) => (
            <button key={tr.bn} onClick={() => go(tr[lang])} className="rounded-full border bg-background px-3 py-1 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
              {tr[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
