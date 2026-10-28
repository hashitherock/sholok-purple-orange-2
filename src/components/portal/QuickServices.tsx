import { Link, useRouterState } from "@tanstack/react-router";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import { services, isServiceSelected, type Service } from "@/data/services";
import { Button } from "@/components/ui/button";

export function useOpenService() {
  const { t, lang } = useI18n();
  return (s: Service) => toast(`${lang === "bn" ? s.bn : s.en} — ${t("serviceSoonMsg")}`);
}

export function QuickServices() {
  const { lang } = useI18n();
  const open = useOpenService();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = [...services].sort((a, b) => (a.shortcut ?? 100) - (b.shortcut ?? 100));
  const cls = "group relative flex h-[54px] min-w-[54px] shrink-0 flex-col items-center justify-center gap-1 rounded-none border-b-2 border-transparent px-2 py-1.5 text-[11px] font-medium text-foreground transition-colors hover:bg-muted hover:text-primary focus-visible:outline-2 focus-visible:outline-ring";
  return (
    <nav aria-label="Quick services" className="flex min-w-0 justify-start gap-0.5 overflow-x-auto [scrollbar-width:thin]">
      {items.map((s) => {
        const Icon = s.icon;
        const label = lang === "bn" ? s.bn : s.en;
        const inner = (
          <>
            <Icon className={`h-5 w-5 ${s.status === "soon" ? "text-muted-foreground" : "text-primary"}`} strokeWidth={1.7} />
            <span className="max-w-[90px] truncate leading-tight" title={label}>{label}</span>
            {s.status === "soon" && <span className="absolute right-2 top-1.5 h-1 w-1 rounded-full bg-disabled" aria-hidden />}
          </>
        );
        return s.to && s.status !== "soon" ? (
          <Link key={s.id} to={s.to} aria-current={isServiceSelected(s, pathname) ? "page" : undefined} className={`${cls} ${isServiceSelected(s, pathname) ? "border-primary bg-primary-bg text-primary" : ""}`}>{inner}</Link>
        ) : (
          <Button variant="ghost" key={s.id} onClick={() => open(s)} className={cls} aria-label={`${label} (${s.status === "preview" ? "preview" : "coming soon"})`}>{inner}</Button>
        );
      })}
    </nav>
  );
}
