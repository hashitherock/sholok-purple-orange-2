import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoMeta } from "@/components/portal/InfoPage";

export const Route = createFileRoute("/terms")({
  head: () => infoMeta("Terms of Service", "Draft terms of service for Sholok."),
  component: () => <InfoPage title={{ bn: "ব্যবহারের শর্তাবলি", en: "Terms of Service" }} body={[{ bn: "সলোক বর্তমানে একটি ডেমো। সব খবর, পণ্য ও মূল্য উদাহরণমাত্র।", en: "Sholok is currently a demo. All news, products and prices are illustrative." }, { bn: "এটি একটি খসড়া এবং আইনি নথি নয়।", en: "This is a draft and not a legal document." }]} draft={true} />,
});
