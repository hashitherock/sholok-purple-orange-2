import { useEffect, useState } from "react";
import { Bookmark } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { blogs, blogCats, toBn, type BlogPost } from "@/data/content";
import { SectionHeader, DemoTag, Tabs } from "./ui";
import { Button } from "@/components/ui/button";

function useBookmarks() {
  const [ids, setIds] = useState<number[]>([]);
  useEffect(() => { try { setIds(JSON.parse(localStorage.getItem("sholok-bm") || "[]")); } catch { /* ignore */ } }, []);
  const toggle = (id: number) => {
    const n = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
    setIds(n);
    localStorage.setItem("sholok-bm", JSON.stringify(n));
  };
  return { ids, toggle };
}

export function BlogCard({ p, saved, onSave, compact = false }: { p: BlogPost; saved: boolean; onSave: () => void; compact?: boolean }) {
  const { t, lang } = useI18n();
  const cat = blogCats.find((c) => c.id === p.cat);
  return (
    <article className={`group flex flex-col overflow-hidden ${compact ? "" : "rounded-lg border bg-card"}`}>
      <img src={p.img} alt="" width={1024} height={640} loading="lazy" className={`w-full rounded object-cover ${compact ? "aspect-[2/1] max-h-[110px]" : "aspect-[16/10]"}`} />
      <div className={`flex flex-1 flex-col ${compact ? "pt-1.5" : "p-3"}`}>
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-primary">{cat?.[lang]}</span>
          <Button variant="ghost" onClick={onSave} aria-pressed={saved} aria-label={t("bookmarks")} className="h-7 w-7 rounded p-1 hover:bg-accent">
            <Bookmark className={`h-4 w-4 ${saved ? "fill-brand-accent text-brand-accent" : "text-muted-foreground"}`} />
          </Button>
        </div>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary">{lang === "bn" ? p.bn : p.en}</h3>
        <p className={`${compact ? "hidden" : "mt-1 line-clamp-2 text-sm text-muted-foreground"}`}>{lang === "bn" ? p.exBn : p.exEn}</p>
        <p className="mt-auto pt-2 text-xs text-muted-foreground">{p.author} · {lang === "bn" ? toBn(p.mins) : p.mins} {t("minRead")}</p>
      </div>
    </article>
  );
}

export function BlogFeed({ compact = false }: { compact?: boolean }) {
  const { t, lang } = useI18n();
  const [cat, setCat] = useState("all");
  const [count, setCount] = useState(compact ? 3 : 6);
  const { ids, toggle } = useBookmarks();
  const list = blogs.filter((b) => cat === "all" || b.cat === cat);
  return (
    <section className="py-4">
      <SectionHeader title={t("discover")} tag={<DemoTag label={t("sample")} />} />
      <Tabs items={[{ id: "all", label: t("all") }, ...blogCats.map((c) => ({ id: c.id, label: c[lang] }))]} value={cat} onChange={(v) => { setCat(v); setCount(compact ? 3 : 6); }} />
      <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {list.slice(0, count).map((p) => <BlogCard key={p.id} p={p} saved={ids.includes(p.id)} onSave={() => toggle(p.id)} compact={compact} />)}
      </div>
      {count < list.length && (
        <div className="mt-4 text-center">
          <Button variant="outline" onClick={() => setCount((c) => c + 3)}>{t("loadMore")}</Button>
        </div>
      )}
    </section>
  );
}
