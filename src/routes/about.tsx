import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoMeta } from "@/components/portal/InfoPage";

export const Route = createFileRoute("/about")({
  head: () => infoMeta("About Sholok", "Learn what Sholok is and who it"s for."),
  component: () => <InfoPage title={{ bn: "সলোক সম্পর্কে", en: "About Sholok" }} body={[{ bn: "সলোক হলো বাংলা-ভাষী ব্যবহারকারীদের জন্য তৈরি একটি সার্চ ও সেবা পোর্টালের প্রোটোটাইপ।", en: "Sholok is a prototype search and services portal built for Bengali-speaking users." }, { bn: "এই সংস্করণে সব কন্টেন্ট নমুনা এবং কোনো লাইভ ডেটা ব্যবহার করা হয় না।", en: "In this version all content is sample data; nothing is live." }]} draft={false} />,
});
