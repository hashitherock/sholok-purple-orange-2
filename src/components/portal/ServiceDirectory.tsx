import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, SearchX } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { services, categories } from "@/data/services";
import { StatusBadge } from "./StatusBadge";
import { useOpenService } from "./QuickServices";
import { Button } from "@/components/ui/button";

export function ServiceDirectory({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useI18n();
  const open = useOpenService();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const s = q.trim().toLowerCase();
  const list = services.filter((x) => (cat === "all" || x.category === cat) && (!s || [x.en, x.bn, x.descEn, x.descBn].some((v) => v.toLowerCase().includes(s))));
  const groups = categories.map((c) => ({ c, items: list.filter((x) => x.category === c.id) })).filter((g) => g.items.length);
  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row md:items-center">
        <label className="flex h-11 min-w-0 flex-1 items-center gap-2 rounded-lg border bg-background px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-soft">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchServices")} aria-label={t("searchServices")} className="min-w-0 flex-1 bg-transparent outline-none" />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[{ id: "all", en: "All", bn: "সব" }, ...categories].map((c) => (
          <Button variant="ghost" key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id}
            className={`h-9 max-w-full whitespace-normal rounded border px-2 py-1 text-xs transition-colors ${cat === c.id ? "border-primary bg-primary text-primary-foreground hover:bg-primary-dark hover:text-primary-foreground" : "bg-background text-muted-foreground hover:border-primary hover:text-primary"}`}>
            {c[lang]}
          </Button>
        ))}
      </div>
      {groups.length === 0 ? (
        <div className="mt-10 flex flex-col items-center text-center text-muted-foreground">
          <SearchX className="h-10 w-10" /><p className="mt-2">{t("noServices")}</p>
        </div>
      ) : groups.map(({ c, items }) => (
        <section key={c.id} className="mt-6">
          <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">{c[lang]}</h2>
          <div className={compact ? "grid grid-cols-2 gap-2 sm:grid-cols-3" : "grid gap-3 sm:grid-cols-2 lg:grid-cols-4"}>
            {items.map((x) => {
              const I = x.icon;
              const body = (
                <>
                  <div className="flex flex-wrap items-start justify-between gap-1.5">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded ${x.status === "soon" ? "bg-muted text-disabled" : "bg-primary-soft text-primary"}`}><I className="h-5 w-5" /></span>
                    <StatusBadge status={x.status} />
                  </div>
                  <h3 className="mt-3 font-semibold">{lang === "bn" ? x.bn : x.en}</h3>
                  <p className="text-xs text-muted-foreground">{lang === "bn" ? x.en : x.bn}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{compact ? null : lang === "bn" ? x.descBn : x.descEn}</p>
                </>
              );
              const cls = compact ? "panel block p-3 text-left" + " transition-colors hover:border-primary" : "panel block p-4 text-left transition-colors hover:border-primary";
              return x.to && x.status !== "soon"
                ? <Link key={x.id} to={x.to} className={cls}>{body}</Link>
                : <Button variant="ghost" key={x.id} onClick={() => open(x)} className={`${cls} h-auto min-w-0 whitespace-normal`}>{body}</Button>;
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
