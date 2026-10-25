import { useI18n } from "@/lib/i18n";

export function InfoPage({ title, body, draft = true }: { title: { bn: string; en: string }; body: { bn: string; en: string }[]; draft?: boolean }) {
  const { t, lang } = useI18n();
  return (
    <div className="container-portal max-w-3xl py-10">
      {draft && <span className="rounded-full bg-brand-accent-soft px-2.5 py-1 text-xs font-semibold text-brand-accent">{t("draft")}</span>}
      <h1 className="mt-3 text-3xl font-bold text-primary">{title[lang]}</h1>
      <div className="mt-4 space-y-3 text-muted-foreground">
        {body.map((p, i) => <p key={i}>{p[lang]}</p>)}
      </div>
    </div>
  );
}

export const infoMeta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — Sholok` },
    { name: "description", content: description },
    { property: "og:title", content: `${title} — Sholok` },
    { property: "og:description", content: description },
  ],
});
