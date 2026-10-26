import { useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, UserRound, Globe, LayoutGrid, Bell } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { SholokLogo } from "./SholokLogo";
import { SignInDialog } from "./SignInDialog";
import { MainSearch } from "./MainSearch";
import { QuickServices } from "./QuickServices";
import { ServiceDirectory } from "./ServiceDirectory";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const opts: { id: Lang; label: string }[] = [
    { id: "bn", label: "বাংলা" },
    { id: "en", label: "EN" },
  ];
  return (
    <div role="group" aria-label="Language" className="inline-flex items-center gap-0.5 text-xs">
      <Globe className="mr-1 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {opts.map((o, i) => (
        <span key={o.id} className="flex items-center">
          {i > 0 && <span className="mx-1 h-2.5 w-px bg-border" aria-hidden />}
          <button
            onClick={() => setLang(o.id)}
            aria-pressed={lang === o.id}
            className={`px-0.5 transition-colors ${lang === o.id ? "font-semibold text-primary" : "text-muted-foreground hover:text-foreground"}`}
          >
            {o.label}
          </button>
        </span>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [menu, setMenu] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const loc = useRouterState({ select: (s) => s.location });
  const q = loc.pathname === "/search" ? String((loc.search as { q?: string }).q ?? "") : "";
  const links = [
    { to: "/about" as const, label: t("about") },
    { to: "/services" as const, label: t("services") },
    { to: "/help" as const, label: t("help") },
  ];
  return (
    <header className="border-b bg-background">
      {/* A. Utility row */}
      <div className="container-portal flex h-10 items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <button onClick={() => setMenu(true)} aria-label={t("allServices")} className="-ml-1.5 rounded p-1.5 text-foreground hover:bg-muted">
            <Menu className="h-4 w-4" />
          </button>
          <nav className="hidden items-center gap-3 text-muted-foreground sm:flex">
            {links.map((l) => (
              <Link key={l.to} to={l.to} className="hover:text-foreground" activeProps={{ className: "font-semibold text-primary" }}>{l.label}</Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <button onClick={() => setSignIn(true)} className="relative hidden rounded p-1 text-muted-foreground hover:text-foreground sm:block" aria-label="Notifications">
            <Bell className="h-4 w-4" />
            <span className="absolute right-0.5 top-0.5 h-1.5 w-1.5 rounded-full bg-brand-accent" aria-hidden />
          </button>
          <button onClick={() => setSignIn(true)} className="inline-flex items-center gap-1 rounded-md border px-2 py-1 font-medium text-foreground hover:border-primary hover:text-primary">
            <UserRound className="h-3.5 w-3.5" /> {t("myAccount")}
          </button>
        </div>
      </div>

      {/* B. Search row */}
      <div className="container-portal flex flex-col items-center gap-3 py-4 md:flex-row md:justify-center md:gap-6 md:py-6">
        <SholokLogo size="md" />
        <div className="w-full md:max-w-[720px] md:flex-1">
          <MainSearch initial={q} />
        </div>
        <div className="hidden w-[118px] lg:block" aria-hidden />
      </div>

      {/* C. Service shortcut row */}
      <div className="border-t">
        <div className="container-portal flex items-center gap-2">
          <div className="min-w-0 flex-1"><QuickServices /></div>
          <button onClick={() => setMenu(true)} className="flex shrink-0 flex-col items-center gap-1 px-2 py-2.5 text-xs text-muted-foreground hover:text-primary">
            <LayoutGrid className="h-[22px] w-[22px]" strokeWidth={1.7} />
            <span>{t("allServices")}</span>
          </button>
        </div>
      </div>

      <Sheet open={menu} onOpenChange={setMenu}>
        <SheetContent side="left" className="w-full overflow-y-auto sm:max-w-2xl">
          <SheetHeader><SheetTitle className="text-primary">{t("allServices")}</SheetTitle></SheetHeader>
          <div className="px-4 pb-6" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) setMenu(false); }}>
            <ServiceDirectory compact />
          </div>
        </SheetContent>
      </Sheet>
      <SignInDialog open={signIn} onOpenChange={setSignIn} />
    </header>
  );
}
