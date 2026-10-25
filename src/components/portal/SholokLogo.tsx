import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function SholokMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="11" className="fill-primary" />
      <path
        d="M26.5 13.2c-1.6-1.5-3.8-2.3-6.2-2.3-3.9 0-6.6 2-6.6 5 0 3.3 3 4.2 6.3 4.9 2.8.6 4.3 1.1 4.3 2.6 0 1.5-1.6 2.4-3.9 2.4-2.3 0-4.3-.9-5.8-2.4"
        fill="none"
        strokeWidth="3.2"
        strokeLinecap="round"
        className="stroke-primary-foreground"
      />
      <circle cx="29" cy="29" r="3" className="fill-brand-accent" />
    </svg>
  );
}

export function SholokLogo({ size = "md", className }: { size?: "sm" | "md" | "lg"; className?: string }) {
  const s = { sm: "h-7 w-7", md: "h-9 w-9", lg: "h-12 w-12" }[size];
  const t = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" }[size];
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2 rounded-lg focus-visible:outline-2 focus-visible:outline-ring", className)} aria-label="Sholok home">
      <SholokMark className={s} />
      <span className={cn("font-sans font-extrabold tracking-tight text-primary", t)} lang="en">
        sholok<span className="text-brand-accent">.</span>
      </span>
    </Link>
  );
}
