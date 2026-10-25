import { CheckCircle2, Eye, Clock } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import type { ServiceStatus } from "@/data/services";

export function StatusBadge({ status }: { status: ServiceStatus }) {
  const { t } = useI18n();
  const map = {
    active: { cls: "bg-primary-soft text-primary", icon: CheckCircle2, label: t("active") },
    preview: { cls: "bg-brand-accent-soft text-brand-accent", icon: Eye, label: t("preview") },
    soon: { cls: "bg-muted text-muted-foreground", icon: Clock, label: t("soon") },
  }[status];
  const Icon = map.icon;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${map.cls}`}>
      <Icon className="h-3 w-3" aria-hidden /> {map.label}
    </span>
  );
}
