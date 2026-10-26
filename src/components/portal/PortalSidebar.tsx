import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { CloudSun, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { trending, markets, toBn } from "@/data/content";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { DemoTag } from "./ui";
import { SignInDialog } from "./SignInDialog";

export function PortalSidebar() {
  const { t, lang } = useI18n();
  const [open, setOpen] = useState(false);
  const num = (s: string) => (lang === "bn" ? toBn(s) : s);
  return (
    <aside className="min-w-0 divide-y border-t md:border-l md:border-t-0 md:pl-4 xl:pl-6">
      <div className="pb-4 pt-1">
        <h3 className="font-bold text-primary">{t("welcome")}</h3>
        
        <Button className="mt-2 h-10 w-full" onClick={() => setOpen(true)}>{t("signIn")}</Button>
      </div>

      <div className="py-3">
        <h3 className="mb-2 flex items-center gap-1.5 font-semibold"><TrendingUp className="h-4 w-4 text-brand-accent" />{t("trending")}</h3>
        <ol className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
          {trending.map((tr, i) => (
            <li key={tr.bn}>
              <Link to="/search" search={{ q: tr[lang], tab: "all" }} className="flex min-w-0 gap-1.5 hover:text-primary">
                <span className={`w-4 font-bold ${i < 3 ? "text-brand-accent" : "text-muted-foreground"}`}>{num(String(i + 1))}</span>{tr[lang]}
              </Link>
            </li>
          ))}
        </ol>
      </div>

      <div className="py-3">
        <div className="mb-2 flex items-center justify-between"><h3 className="font-semibold">{t("weather")}</h3><DemoTag label={t("demoData")} /></div>
        <div className="flex items-center gap-3">
          <CloudSun className="h-10 w-10 text-primary" strokeWidth={1.5} />
          <div>
            <p className="text-xl font-bold">{num("29")}°C</p>
            <p className="text-sm text-muted-foreground">{lang === "bn" ? "ঢাকা (উদাহরণ) · আংশিক মেঘলা" : "Dhaka (example) · Partly cloudy"}</p>
          </div>
        </div>
      </div>

      <div className="py-3">
        <div className="mb-2 flex items-center justify-between"><h3 className="font-semibold">{t("market")}</h3><DemoTag label={t("demoData")} /></div>
        <ul className="space-y-2 text-sm">
          {markets.map((m) => (
            <li key={m.name} className="flex items-center justify-between">
              <span className="text-muted-foreground">{m.name}</span>
              <span className="flex items-center gap-1 font-medium">
                {num(m.value)}
                {m.change >= 0 ? <ArrowUpRight className="h-3.5 w-3.5 text-success" aria-label="up" /> : <ArrowDownRight className="h-3.5 w-3.5 text-muted-foreground" aria-label="down" />}
                <span className={m.change >= 0 ? "text-success" : "text-muted-foreground"}>{num(Math.abs(m.change).toFixed(2))}%</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="py-3">
        <h3 className="mb-2 font-semibold">{t("quickLinks")}</h3>
        <div className="grid grid-cols-3 gap-2">
          {services.filter((s) => s.status !== "soon" && s.to).slice(0, 6).map((s) => {
            const I = s.icon;
            return (
              <Link key={s.id} to={s.to ?? "/services"} className="flex flex-col items-center gap-1 rounded-lg p-2 text-xs hover:bg-accent hover:text-primary">
                <I className="h-5 w-5 text-primary" />{lang === "bn" ? s.bn : s.en}
              </Link>
            );
          })}
        </div>
      </div>
      <SignInDialog open={open} onOpenChange={setOpen} />
    </aside>
  );
}
