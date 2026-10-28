import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Info, SearchX } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { Tabs } from "@/components/portal/ui";
import { news, blogs, products, newsCats, blogCats, fmtAgo, fmtNum, toBn } from "@/data/content";

const TABS = ["all", "news", "blogs", "shopping", "videos", "qa"] as const;
type Tab = (typeof TABS)[number];

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): { q: string; tab: Tab } => ({
    q: typeof s["q"] === "string" ? s["q"] : "",
    tab: TABS.includes(s["tab"] as Tab) ? (s["tab"] as Tab) : "all",
  }),
  head: () => ({
    meta: [
      { title: "Search — Sholok" },
      { name: "description", content: "Demo search across Sholok's sample news, blogs and products." },
      { property: "og:title", content: "Search — Sholok" },
      { property: "og:description", content: "Demo search across Sholok's sample content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

const tabLabels: Record<Tab, { bn: string; en: string }> = {
  all: { bn: "সব", en: "All" }, news: { bn: "খবর", en: "News" }, blogs: { bn: "ব্লগ", en: "Blogs" },
  shopping: { bn: "শপিং", en: "Shopping" }, videos: { bn: "ভিডিও", en: "Videos" }, qa: { bn: "প্রশ্ন-উত্তর", en: "Q&A" },
};

function SearchPage() {
  const { q, tab } = Route.useSearch();
  const nav = useNavigate({ from: "/search" });
  const { t, lang } = useI18n();
  const s = q.trim().toLowerCase();
  const m = (...v: string[]) => !!s && v.some((x) => x.toLowerCase().includes(s));
  const catName = (list: readonly { id: string; bn: string; en: string }[], id: string) => list.find((c) => c.id === id)!;

  const n = news.filter((x) => { const c = catName(newsCats, x.cat); return m(x.bn, x.en, x.source, c.bn, c.en); });
  const b = blogs.filter((x) => { const c = catName(blogCats, x.cat); return m(x.bn, x.en, x.exBn, x.exEn, x.author, c.bn, c.en); });
  const p = products.filter((x) => m(x.bn, x.en, x.cat, x.catEn));
  const show = (k: Tab) => tab === "all" || tab === k;
  const total = (show("news") ? n.length : 0) + (show("blogs") ? b.length : 0) + (show("shopping") ? p.length : 0);

  return (
    <div className="container-portal py-6">
      <div className="mx-auto max-w-3xl">
        <p className=" flex items-center gap-2 rounded-lg bg-primary-soft px-3 py-2 text-xs text-primary-dark"><Info className="h-4 w-4 shrink-0" />{t("demoSearch")}</p>
        <div className="mt-4">
          <Tabs items={TABS.map((k) => ({ id: k, label: tabLabels[k][lang] }))} value={tab} onChange={(v) => nav({ search: { q, tab: v as Tab } })} />
        </div>
        {s && <p className="mt-3 text-sm text-muted-foreground">“{q}” — {lang === "bn" ? toBn(total) : total} {t("results")}</p>}

        {total === 0 ? (
          <div className="mt-12 flex flex-col items-center text-center">
            <SearchX className="h-12 w-12 text-disabled" />
            <p className="mt-3 font-semibold">{t("noResults")}</p>
            <p className="mt-1 text-sm text-muted-foreground">{t("noResultsHint")}</p>
          </div>
        ) : (
          <div className="mt-4 space-y-6">
            {show("news") && n.length > 0 && (
              <section className="panel p-4">
                <h2 className="mb-2 font-bold text-primary">{tabLabels.news[lang]}</h2>
                <ul className="divide-y">{n.map((x) => (
                  <li key={x.id} className="flex gap-3 py-3"><img src={x.img} alt="" loading="lazy" className="h-16 w-24 rounded-lg object-cover" />
                    <div><p className="font-medium">{x[lang]}</p><p className="text-xs text-muted-foreground">{x.source} · {fmtAgo(x.mins, lang)}</p></div></li>
                ))}</ul>
              </section>
            )}
            {show("blogs") && b.length > 0 && (
              <section className="panel p-4">
                <h2 className="mb-2 font-bold text-primary">{tabLabels.blogs[lang]}</h2>
                <ul className="divide-y">{b.map((x) => (
                  <li key={x.id} className="py-3"><p className="font-medium">{lang === "bn" ? x.bn : x.en}</p><p className="text-sm text-muted-foreground">{lang === "bn" ? x.exBn : x.exEn}</p><p className="text-xs text-muted-foreground">{x.author}</p></li>
                ))}</ul>
              </section>
            )}
            {show("shopping") && p.length > 0 && (
              <section className="panel p-4">
                <h2 className="mb-2 font-bold text-primary">{tabLabels.shopping[lang]}</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{p.map((x) => (
                  <div key={x.id}><img src={x.img} alt={x[lang]} loading="lazy" className="aspect-square w-full rounded-lg object-cover" /><p className="mt-1 text-sm">{x[lang]}</p><p className="text-sm font-bold">৳{fmtNum(x.price, lang)}</p></div>
                ))}</div>
              </section>
            )}
          </div>
        )}
        {(tab === "videos" || tab === "qa") && (
          <p className="mt-4 text-center text-sm text-muted-foreground">{t("serviceSoonMsg")} <Link to="/services" className="text-primary hover:underline">{t("allServices")}</Link></p>
        )}
      </div>
    </div>
  );
}
