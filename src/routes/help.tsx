import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoMeta } from "@/components/portal/InfoPage";

export const Route = createFileRoute("/help")({
  head: () => infoMeta("Help Center", "Help and frequently asked questions for Sholok."),
  component: () => <InfoPage title={{ bn: "সাহায্য কেন্দ্র", en: "Help Center" }} body={[{ bn: "সার্চ বক্সে লিখে Enter চাপুন — ফলাফল নমুনা কন্টেন্ট থেকে আসবে।", en: "Type in the search box and press Enter — results come from sample content." }, { bn: "উপরের ভাষা বোতাম দিয়ে বাংলা ও ইংরেজির মধ্যে বদলান।", en: "Use the language buttons at the top to switch between Bangla and English." }]} draft={false} />,
});
