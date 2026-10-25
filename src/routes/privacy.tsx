import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoMeta } from "@/components/portal/InfoPage";

export const Route = createFileRoute("/privacy")({
  head: () => infoMeta("Privacy Policy", "Draft privacy policy for Sholok."),
  component: () => <InfoPage title={{ bn: "গোপনীয়তা নীতি", en: "Privacy Policy" }} body={[{ bn: "এই প্রোটোটাইপ কোনো ব্যক্তিগত তথ্য সংগ্রহ বা সার্ভারে পাঠায় না। ভাষা, সাম্প্রতিক সার্চ ও বুকমার্ক শুধু আপনার ব্রাউজারে থাকে।", en: "This prototype collects no personal data and sends nothing to a server. Language, recent searches and bookmarks stay in your browser only." }, { bn: "এটি একটি খসড়া এবং আইনি নথি নয়।", en: "This is a draft and not a legal document." }]} draft={true} />,
});
