import { useState } from "react";
import { Info } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/lib/i18n";
import { SholokMark } from "./SholokLogo";

export function SignInDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errors, setErrors] = useState<{ email?: string; pass?: string }>({});
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: typeof errors = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) er.email = t("invalidEmail");
    if (pass.length < 6) er.pass = t("shortPass");
    setErrors(er);
    setDone(Object.keys(er).length === 0);
    setPass("");
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { onOpenChange(o); if (!o) { setDone(false); setErrors({}); } }}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="items-center text-center">
          <SholokMark className="h-11 w-11" />
          <DialogTitle className="text-primary">{t("signIn")}</DialogTitle>
          <DialogDescription>{t("demoMode")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-3" noValidate>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="si-email">{t("email")}</label>
            <Input id="si-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errors.email} />
            {errors.email && <p className="mt-1 text-xs text-brand-accent">{errors.email}</p>}
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="si-pass">{t("password")}</label>
            <Input id="si-pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} aria-invalid={!!errors.pass} />
            {errors.pass && <p className="mt-1 text-xs text-brand-accent">{errors.pass}</p>}
          </div>
          {done && (
            <p className="flex gap-2 rounded-lg bg-primary-soft p-3 text-xs text-primary-dark" role="status">
              <Info className="h-4 w-4 shrink-0" /> {t("demoSignIn")}
            </p>
          )}
          <Button type="submit" className="w-full">{t("signIn")}</Button>
          <div className="flex justify-between text-xs">
            <button type="button" className="text-primary hover:underline" onClick={() => setDone(true)}>{t("createAccount")}</button>
            <button type="button" className="text-muted-foreground hover:text-primary" onClick={() => setDone(true)}>{t("forgot")}</button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
