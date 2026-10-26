import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, SearchX } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { services, categories } from "@/data/services";
import { StatusBadge } from "./StatusBadge";
import { useOpenService } from "./QuickServices";

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
        <label className="flex h-11 flex-1 items-center gap-2 rounded-xl border bg-background px-3 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-soft">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchServices")} aria-label={t("searchServices")} className="flex-1 bg-transparent outline-none" />
        </label>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[{ id: "all", en: "All", bn: "সব" }, ...categories].map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)} aria-pressed={cat === c.id}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${cat === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-background text-muted-foreground hover:border-primary hover:text-primary"}`}>
            {c[lang]}
          </button>
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
                  <div className="flex items-start justify-between">
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${x.status === "soon" ? "bg-muted text-disabled" : "bg-primary-soft text-primary"}`}><I className="h-5 w-5" /></span>
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
                : <button key={x.id} onClick={() => open(x)} className={cls}>{body}</button>;
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
