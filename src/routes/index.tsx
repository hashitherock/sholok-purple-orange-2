import { createFileRoute } from "@tanstack/react-router";
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
  return (
    <div className="bg-surface">
      <div className="container-portal grid gap-6 py-5 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_340px] xl:gap-8">
        <div className="min-w-0 divide-y rounded-lg border bg-background px-4 md:px-5">
          <NewsSection />
          <BlogFeed />
          <ShoppingSection />
        </div>
        <PortalSidebar />
      </div>
    </div>
  );
}
