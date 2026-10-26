import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { products, fmtNum, toBn, type Product } from "@/data/content";
import { SectionHeader, DemoTag } from "./ui";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export function ShoppingSection() {
  const { t, lang } = useI18n();
  const [sel, setSel] = useState<Product | null>(null);
  const price = (p: Product) => `৳${fmtNum(p.discount ? Math.round(p.price * (1 - p.discount / 100)) : p.price, lang)}`;
  return (
    <section className="py-5">
      <SectionHeader title={t("shopping")} tag={<DemoTag label={t("illustrative")} />} />
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {products.map((p) => (
          <button key={p.id} onClick={() => setSel(p)} className="group text-left">
            <div className="relative overflow-hidden rounded-xl bg-muted">
              <img src={p.img} alt={p[lang]} width={400} height={400} loading="lazy" className="aspect-square w-full object-cover transition-transform group-hover:scale-[1.03]" />
              {p.discount && <span className="absolute left-2 top-2 rounded bg-brand-accent px-1.5 py-0.5 text-[11px] font-bold text-primary-foreground">-{lang === "bn" ? toBn(p.discount) : p.discount}%</span>}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{lang === "bn" ? p.cat : p.catEn}</p>
            <p className="line-clamp-1 text-sm font-medium group-hover:text-primary">{p[lang]}</p>
            <p className="text-sm font-bold">{price(p)}</p>
            <span className="text-xs text-primary">{t("viewDetails")} →</span>
          </button>
        ))}
      </div>
      <Dialog open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <DialogContent className="sm:max-w-md">
          {sel && (
            <>
              <img src={sel.img} alt={sel[lang]} className="aspect-video w-full rounded-lg object-cover" />
              <DialogHeader>
                <DialogTitle>{sel[lang]}</DialogTitle>
                <DialogDescription>{lang === "bn" ? sel.cat : sel.catEn} · {t("illustrative")}</DialogDescription>
              </DialogHeader>
              <p className="text-2xl font-bold text-primary">{price(sel)}</p>
              <p className="rounded-lg bg-muted p-3 text-sm text-muted-foreground">{t("noCheckout")}</p>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
