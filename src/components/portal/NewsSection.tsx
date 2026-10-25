import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { news, newsCats, fmtAgo } from "@/data/content";
import { SectionHeader, DemoTag, Tabs } from "./ui";

export function NewsSection({ full = false }: { full?: boolean }) {
  const { t, lang } = useI18n();
  const [cat, setCat] = useState<string>("bangladesh");
  const list = news.filter((n) => n.cat === cat);
  const [feat, ...rest] = list;
  return (
    <section className="panel p-4 md:p-5">
      <SectionHeader title={t("highlights")} tag={<DemoTag label={t("demoNews")} />}
        action={!full && <Link to="/news" className="inline-flex items-center text-sm text-primary hover:underline">{t("viewAllNews")}<ChevronRight className="h-4 w-4" /></Link>} />
      <Tabs items={newsCats.map((c) => ({ id: c.id, label: c[lang] }))} value={cat} onChange={setCat} />
      {feat && (
        <div className="mt-4 grid gap-4 md:grid-cols-[1.2fr_1fr]">
          <article className="group">
            <div className="overflow-hidden rounded-xl">
              <img src={feat.img} alt="" width={1024} height={640} loading="lazy" className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
            </div>
            <span className="mt-3 inline-block rounded bg-brand-accent-soft px-1.5 py-0.5 text-[11px] font-semibold text-brand-accent">{t("sample")}</span>
            <h3 className="mt-1 text-lg font-bold leading-snug group-hover:text-primary">{feat[lang]}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{feat.source} · {fmtAgo(feat.mins, lang)}</p>
          </article>
          <ul className="divide-y">
            {(full ? news.filter((n) => n.cat !== cat).concat(rest) : rest.concat(news.filter((n) => n.cat !== cat).slice(0, 4 - rest.length))).slice(0, full ? 12 : 4).map((n) => (
              <li key={n.id} className="group flex gap-3 py-3 first:pt-0">
                <img src={n.img} alt="" width={96} height={64} loading="lazy" className="h-16 w-24 shrink-0 rounded-lg object-cover" />
                <div className="min-w-0">
                  <h4 className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-primary">{n[lang]}</h4>
                  <p className="mt-1 text-xs text-muted-foreground">{n.source} · {fmtAgo(n.mins, lang)}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
