import { createFileRoute } from "@tanstack/react-router";
import { NewsSection } from "@/components/portal/NewsSection";
import { PortalSidebar } from "@/components/portal/PortalSidebar";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News — Sholok" },
      { name: "description", content: "Today's highlights by category on Sholok News (sample content)." },
      { property: "og:title", content: "News — Sholok" },
      { property: "og:description", content: "Category-wise highlights on Sholok News (sample content)." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <div className="container-portal grid gap-5 py-6 lg:grid-cols-[1fr_300px]">
      <div className="min-w-0"><NewsSection full /></div>
      <PortalSidebar />
    </div>
  ),
});
