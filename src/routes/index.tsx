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
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background">
      <div className="container-portal grid items-start gap-4 py-4 md:grid-cols-[minmax(0,2fr)_minmax(240px,1fr)] xl:gap-6">
        <div className="min-w-0 divide-y">
          <NewsSection />
          <BlogFeed compact />
          <ShoppingSection />
        </div>
        <PortalSidebar />
      </div>
    </div>
  );
}
