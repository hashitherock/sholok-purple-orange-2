import { createFileRoute } from "@tanstack/react-router";
import { BlogFeed } from "@/components/portal/BlogFeed";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — Sholok" },
      { name: "description", content: "Stories on technology, travel, food and more from Sholok Blog (sample content)." },
      { property: "og:title", content: "Blog — Sholok" },
      { property: "og:description", content: "Discover stories and guides on Sholok Blog." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => <div className="container-portal py-6"><BlogFeed /></div>,
});
