import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, UserRound, Globe } from "lucide-react";
import { useI18n, type Lang } from "@/lib/i18n";
import { SholokLogo } from "./SholokLogo";
import { SignInDialog } from "./SignInDialog";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const { lang, setLang } = useI18n();
  const opts: { id: Lang; label: string }[] = [
    { id: "bn", label: "বাংলা" },
    { id: "en", label: "English" },
  ];
  return (
    <div role="group" aria-label="Language" className="inline-flex items-center rounded-full border bg-background p-0.5 text-xs">
      <Globe className="mx-1.5 h-3.5 w-3.5 text-muted-foreground" aria-hidden />
      {opts.map((o) => (
        <button
          key={o.id}
          onClick={() => setLang(o.id)}
          aria-pressed={lang === o.id}
          className={`rounded-full px-2.5 py-1 transition-colors ${lang === o.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [signIn, setSignIn] = useState(false);
  const links = [
    { to: "/about" as const, label: t("about") },
    { to: "/services" as const, label: t("services") },
    { to: "/help" as const, label: t("help") },
  ];
  return (
    <header className="border-b bg-background">
      <div className="container-portal flex h-14 items-center justify-between gap-4">
        <SholokLogo size="sm" />
        <nav className="hidden items-center gap-5 text-sm md:flex">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="text-muted-foreground hover:text-primary" activeProps={{ className: "text-primary font-semibold" }}>
              {l.label}
            </Link>
          ))}
          <LanguageSwitcher />
          <Button size="sm" onClick={() => setSignIn(true)}>
            <UserRound className="h-4 w-4" /> {t("myAccount")}
          </Button>
        </nav>
        <button
          className="rounded-md p-2 text-foreground hover:bg-accent md:hidden"
          aria-label={t("menu")}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="animate-in slide-in-from-top-2 fade-in border-t md:hidden">
          <nav className="container-portal flex flex-col gap-1 py-3">
            {[{ to: "/" as const, label: t("home") }, ...links].map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="rounded-md px-3 py-2 hover:bg-accent hover:text-primary">
                {l.label}
              </Link>
            ))}
            <div className="flex items-center justify-between px-3 pt-2">
              <LanguageSwitcher />
              <Button size="sm" onClick={() => { setOpen(false); setSignIn(true); }}>
                {t("myAccount")}
              </Button>
            </div>
          </nav>
        </div>
      )}
      <SignInDialog open={signIn} onOpenChange={setSignIn} />
    </header>
  );
}
