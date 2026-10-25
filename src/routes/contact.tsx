import { createFileRoute } from "@tanstack/react-router";
import { InfoPage, infoMeta } from "@/components/portal/InfoPage";

export const Route = createFileRoute("/contact")({
  head: () => infoMeta("Contact", "How to reach the Sholok team."),
  component: () => <InfoPage title={{ bn: "যোগাযোগ", en: "Contact" }} body={[{ bn: "যোগাযোগের মাধ্যম শীঘ্রই এখানে যোগ করা হবে।", en: "Contact details will be added here soon." }]} draft={true} />,
});
