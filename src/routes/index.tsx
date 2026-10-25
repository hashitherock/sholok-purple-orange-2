import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { SholokLogo } from "@/components/portal/SholokLogo";
import { MainSearch } from "@/components/portal/MainSearch";
import { QuickServices } from "@/components/portal/QuickServices";
import { NewsSection } from "@/components/portal/NewsSection";
import { BlogFeed } from "@/components/portal/BlogFeed";
import { ShoppingSection } from "@/components/portal/ShoppingSection";
import { PortalSidebar } from "@/components/portal/PortalSidebar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sholok — Everything You Need, All in One Place" },
      { name: "description", content: "Sholok (sholok.com) is a Bengali-first portal for search, news, blogs and everyday services." },
      { property: "og:title", content: "Sholok — Everything You Need, All in One Place" },
      { property: "og:description", content: "A Bengali-first portal for search, news, blogs and everyday services." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useI18n();
  return (
    <>
      <section className="border-b bg-primary-bg">
        <div className="container-portal flex flex-col items-center py-8 md:py-12">
          <SholokLogo size="lg" />
          <p className="mt-2 text-sm text-muted-foreground">{t("tagline")}</p>
          <div className="mt-6 w-full max-w-3xl"><MainSearch /></div>
        </div>
      </section>
      <div className="container-portal py-5">
        <div className="panel p-3"><QuickServices /></div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_300px]">
          <div className="min-w-0 space-y-5">
            <NewsSection />
            <BlogFeed />
            <ShoppingSection />
          </div>
          <PortalSidebar />
        </div>
      </div>
    </>
  );
}
