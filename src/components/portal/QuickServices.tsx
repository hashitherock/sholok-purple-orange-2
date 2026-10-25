import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { services, allServicesShortcut, type Service } from "@/data/services";

export function useOpenService() {
  const { t, lang } = useI18n();
  return (s: Service) => toast(`${lang === "bn" ? s.bn : s.en} — ${t("serviceSoonMsg")}`);
}

export function QuickServices() {
  const { lang } = useI18n();
  const open = useOpenService();
  const items = services.filter((s) => s.shortcut).sort((a, b) => a.shortcut! - b.shortcut!);
  const cls = "group flex flex-col items-center gap-1.5 rounded-xl p-2 text-center text-xs transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-ring";
  const iconCls = "relative flex h-12 w-12 items-center justify-center rounded-2xl border bg-background text-primary transition-colors group-hover:border-primary";
  const All = allServicesShortcut.icon;
  return (
    <nav aria-label="Quick services" className="grid grid-cols-5 gap-1 sm:grid-cols-10">
      {items.map((s, i) => {
        const Icon = s.icon;
        const inner = (
          <>
            <span className={iconCls}>
              <Icon className="h-5 w-5" strokeWidth={1.8} />
              {s.status === "soon" && <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-disabled" aria-hidden />}
            </span>
            <span className="leading-tight text-foreground group-hover:text-primary">{lang === "bn" ? s.bn : s.en}</span>
          </>
        );
        const hideMobile = i >= 7 ? "hidden sm:flex" : "";
        return s.to && s.status !== "soon" ? (
          <Link key={s.id} to={s.to} className={`${cls} ${hideMobile}`}>{inner}</Link>
        ) : (
          <button key={s.id} onClick={() => open(s)} className={`${cls} ${hideMobile}`} aria-label={`${lang === "bn" ? s.bn : s.en} (coming soon)`}>{inner}</button>
        );
      })}
      <Link to="/services" className={cls}>
        <span className={`${iconCls} bg-primary text-primary-foreground`}><All className="h-5 w-5" /></span>
        <span className="font-semibold leading-tight text-primary">{lang === "bn" ? allServicesShortcut.bn : allServicesShortcut.en}</span>
      </Link>
    </nav>
  );
}
