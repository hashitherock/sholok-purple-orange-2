import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { ServiceDirectory } from "@/components/portal/ServiceDirectory";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "All Services — Sholok" },
      { name: "description", content: "Browse all 20 Sholok services: search, news, blog, mail, maps and more." },
      { property: "og:title", content: "All Services — Sholok" },
      { property: "og:description", content: "Browse all Sholok services and their availability." },
    ],
  }),
  component: () => {
    const { t } = useI18n();
    return (
      <div className="container-portal py-8">
        <h1 className="mb-5 text-2xl font-bold text-primary md:text-3xl">{t("allServices")}</h1>
        <ServiceDirectory />
      </div>
    );
  },
});
