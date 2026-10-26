import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { SholokLogo } from "./SholokLogo";

export function SiteFooter() {
  const { t, lang } = useI18n();
  const year = new Date().getFullYear();
  const links = [
    { to: "/about" as const, l: t("about") },
    { to: "/services" as const, l: t("allServices") },
    { to: "/help" as const, l: t("helpCenter") },
    { to: "/contact" as const, l: t("contact") },
    { to: "/privacy" as const, l: t("privacy") },
    { to: "/terms" as const, l: t("terms") },
  ];
  return (
    <footer className="mt-10 border-t bg-surface">
      <div className="container-portal grid gap-6 py-8 md:grid-cols-[1fr_2fr]">
        <div>
          <SholokLogo size="sm" />
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">{t("footerDesc")}</p>
        </div>
        <nav className="flex flex-wrap content-start gap-x-6 gap-y-2 text-sm md:justify-end">
          {links.map((x) => <Link key={x.to} to={x.to} className="text-muted-foreground hover:text-primary">{x.l}</Link>)}
        </nav>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">
        © {lang === "bn" ? year.toString().replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯".charAt(+d)) : year} Sholok · sholok.com — {t("rights")}
      </div>
    </footer>
  );
}
