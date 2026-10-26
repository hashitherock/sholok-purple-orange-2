import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { services, type Service } from "@/data/services";

export function useOpenService() {
  const { t, lang } = useI18n();
  return (s: Service) => toast(`${lang === "bn" ? s.bn : s.en} — ${t("serviceSoonMsg")}`);
}

export function QuickServices() {
  const { lang } = useI18n();
  const open = useOpenService();
  const items = services.filter((s) => s.shortcut).sort((a, b) => a.shortcut! - b.shortcut!);
  const cls = "group relative flex min-w-[64px] shrink-0 flex-col items-center gap-1 rounded-md px-2 py-2.5 text-xs text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-2 focus-visible:outline-ring";
  return (
    <nav aria-label="Quick services" className="flex justify-start gap-0.5 overflow-x-auto [scrollbar-width:none] lg:justify-between">
      {items.map((s) => {
        const Icon = s.icon;
        const label = lang === "bn" ? s.bn : s.en;
        const inner = (
          <>
            <Icon className={`h-[22px] w-[22px] ${s.status === "soon" ? "text-muted-foreground" : "text-primary"}`} strokeWidth={1.7} />
            <span className="whitespace-nowrap leading-tight">{label}</span>
            {s.status === "soon" && <span className="absolute right-3 top-2 h-1.5 w-1.5 rounded-full bg-disabled" aria-hidden />}
          </>
        );
        return s.to && s.status !== "soon" ? (
          <Link key={s.id} to={s.to} className={cls} activeOptions={{ exact: true }} activeProps={{ className: "text-primary font-semibold" }}>{inner}</Link>
        ) : (
          <button key={s.id} onClick={() => open(s)} className={cls} aria-label={`${label} (coming soon)`}>{inner}</button>
        );
      })}
    </nav>
  );
}
