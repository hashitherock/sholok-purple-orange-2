import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "bn" | "en";

const dict = {
  about: { bn: "সলোক সম্পর্কে", en: "About Sholok" },
  services: { bn: "সেবাসমূহ", en: "Services" },
  help: { bn: "সাহায্য", en: "Help" },
  myAccount: { bn: "আমার একাউন্ট", en: "My Account" },
  tagline: { bn: "আপনার প্রয়োজন, সব এক জায়গায়।", en: "Everything You Need, All in One Place." },
  placeholder: { bn: "আপনি কী খুঁজছেন?", en: "What are you looking for?" },
  search: { bn: "খুঁজুন", en: "Search" },
  clear: { bn: "মুছুন", en: "Clear" },
  trending: { bn: "ট্রেন্ডিং", en: "Trending" },
  recent: { bn: "সাম্প্রতিক অনুসন্ধান", en: "Recent searches" },
  clearAll: { bn: "সব মুছুন", en: "Clear all" },
  voiceSoon: { bn: "ভয়েস সার্চ শীঘ্রই আসছে", en: "Voice search coming soon" },
  allServices: { bn: "সকল সেবা", en: "All Services" },
  highlights: { bn: "আজকের গুরুত্বপূর্ণ খবর", en: "Today's Highlights" },
  viewAllNews: { bn: "সব খবর দেখুন", en: "View all news" },
  demoNews: { bn: "ডেমো খবর", en: "Demo news" },
  sample: { bn: "নমুনা কন্টেন্ট", en: "Sample content" },
  discover: { bn: "ব্লগ ও আবিষ্কার", en: "Blogs & Discovery" },
  all: { bn: "সব", en: "All" },
  loadMore: { bn: "আরও দেখুন", en: "Load more" },
  minRead: { bn: "মিনিট পড়া", en: "min read" },
  shopping: { bn: "শপিং বাছাই", en: "Shopping Picks" },
  illustrative: { bn: "পণ্য ও মূল্য উদাহরণমাত্র", en: "Products and prices are illustrative" },
  viewDetails: { bn: "বিস্তারিত", en: "View details" },
  noCheckout: { bn: "এটি একটি ডেমো — কেনাকাটা বা পেমেন্ট সম্ভব নয়।", en: "This is a demo — checkout and payment are not available." },
  welcome: { bn: "সলোকে স্বাগতম", en: "Welcome to Sholok" },
  welcomeText: { bn: "সাইন ইন করে আপনার মেইল, ব্লগ ও পছন্দের সেবা এক জায়গায় পান।", en: "Sign in to bring your mail, blogs and favourite services together." },
  signIn: { bn: "সাইন ইন", en: "Sign in" },
  weather: { bn: "আবহাওয়া", en: "Weather" },
  market: { bn: "বাজার চিত্র", en: "Market snapshot" },
  demoData: { bn: "ডেমো ডেটা", en: "Demo data" },
  quickLinks: { bn: "দ্রুত লিংক", en: "Quick links" },
  active: { bn: "সক্রিয়", en: "Active" },
  preview: { bn: "প্রিভিউ", en: "Preview" },
  soon: { bn: "শীঘ্রই আসছে", en: "Coming Soon" },
  searchServices: { bn: "সেবা খুঁজুন", en: "Search services" },
  noServices: { bn: "কোনো সেবা পাওয়া যায়নি", en: "No services found" },
  demoSearch: { bn: "ডেমো সার্চ — ফলাফল স্থানীয় নমুনা কন্টেন্ট থেকে নেওয়া।", en: "Demo search — results are based on locally available sample content." },
  results: { bn: "ফলাফল", en: "results" },
  noResults: { bn: "কোনো ফলাফল পাওয়া যায়নি", en: "No results found" },
  noResultsHint: { bn: "অন্য শব্দ দিয়ে চেষ্টা করুন, যেমন ‘প্রযুক্তি’ বা ‘travel’।", en: "Try another word, like ‘technology’ or ‘travel’." },
  email: { bn: "ইমেইল", en: "Email" },
  password: { bn: "পাসওয়ার্ড", en: "Password" },
  createAccount: { bn: "একাউন্ট তৈরি করুন", en: "Create account" },
  forgot: { bn: "পাসওয়ার্ড ভুলে গেছেন?", en: "Forgot password?" },
  demoMode: { bn: "ডেমো মোড: কোনো তথ্য পাঠানো বা সংরক্ষণ করা হয় না।", en: "Demo mode: no credentials are sent or stored." },
  demoSignIn: { bn: "ফর্ম ঠিক আছে — তবে এটি ডেমো, তাই আসল সাইন ইন হয়নি।", en: "Form looks valid — but this is a demo, so no real sign-in happened." },
  invalidEmail: { bn: "সঠিক ইমেইল দিন", en: "Enter a valid email" },
  shortPass: { bn: "কমপক্ষে ৬ অক্ষর", en: "At least 6 characters" },
  footerDesc: { bn: "সলোক — বাংলা-ভাষী ব্যবহারকারীদের জন্য সার্চ, খবর ও সেবার একটি পোর্টাল।", en: "Sholok — a search, news and services portal built for Bengali-speaking users." },
  helpCenter: { bn: "সাহায্য কেন্দ্র", en: "Help Center" },
  contact: { bn: "যোগাযোগ", en: "Contact" },
  privacy: { bn: "গোপনীয়তা নীতি", en: "Privacy Policy" },
  terms: { bn: "ব্যবহারের শর্তাবলি", en: "Terms of Service" },
  rights: { bn: "সর্বস্বত্ব সংরক্ষিত।", en: "All rights reserved." },
  menu: { bn: "মেনু", en: "Menu" },
  home: { bn: "হোম", en: "Home" },
  draft: { bn: "খসড়া পৃষ্ঠা", en: "Draft page" },
  bookmarks: { bn: "বুকমার্ক", en: "Bookmark" },
  serviceSoonMsg: { bn: "এই সেবাটি এখনও চালু হয়নি।", en: "This service isn't available yet." },
} as const;

export type TKey = keyof typeof dict;

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string }>({
  lang: "bn",
  setLang: () => {},
  t: (k) => dict[k].bn,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("bn");
  useEffect(() => {
    const s = localStorage.getItem("sholok-lang");
    if (s === "en" || s === "bn") setLangState(s);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("sholok-lang", l);
  };
  return <Ctx.Provider value={{ lang, setLang, t: (k) => dict[k][lang] }}>{children}</Ctx.Provider>;
}

export const useI18n = () => useContext(Ctx);
