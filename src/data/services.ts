import {
  Search, Mail, Newspaper, PenLine, Coffee, ShoppingBag, Store, Wallet, Map, MessageCircleQuestion,
  BookOpen, Library, Tv, Music, Languages, BookA, LineChart, Trophy, CloudSun, UserRound, LayoutGrid,
  type LucideIcon,
} from "lucide-react";

export type ServiceStatus = "active" | "preview" | "soon";
export type ServiceCategory = "discovery" | "community" | "shopping" | "utilities" | "entertainment" | "personal";

export interface Service {
  id: string;
  en: string;
  bn: string;
  descEn: string;
  descBn: string;
  icon: LucideIcon;
  category: ServiceCategory;
  status: ServiceStatus;
  to?: "/" | "/search" | "/news" | "/blog" | "/services";
  shortcut?: number;
}

export const categories: { id: ServiceCategory; en: string; bn: string }[] = [
  { id: "discovery", en: "Discovery", bn: "আবিষ্কার" },
  { id: "community", en: "Communication & Community", bn: "যোগাযোগ ও কমিউনিটি" },
  { id: "shopping", en: "Shopping & Payments", bn: "শপিং ও পেমেন্ট" },
  { id: "utilities", en: "Location & Utilities", bn: "লোকেশন ও ইউটিলিটি" },
  { id: "entertainment", en: "Entertainment", bn: "বিনোদন" },
  { id: "personal", en: "Information & Personal", bn: "তথ্য ও ব্যক্তিগত" },
];

export const services: Service[] = [
  { id: "search", en: "Search", bn: "সার্চ", descEn: "Search across Sholok's sample content.", descBn: "সলোকের নমুনা কন্টেন্টে খুঁজুন।", icon: Search, category: "discovery", status: "active", to: "/search", shortcut: 1 },
  { id: "news", en: "News", bn: "নিউজ", descEn: "Category-wise headlines (demo).", descBn: "বিভাগভিত্তিক শিরোনাম (ডেমো)।", icon: Newspaper, category: "discovery", status: "active", to: "/news", shortcut: 2 },
  { id: "blog", en: "Blog", bn: "ব্লগ", descEn: "Stories and guides from writers.", descBn: "লেখকদের গল্প ও গাইড।", icon: PenLine, category: "discovery", status: "active", to: "/blog", shortcut: 4 },
  { id: "mail", en: "Mail", bn: "মেইল", descEn: "Fast, secure email.", descBn: "দ্রুত ও নিরাপদ ইমেইল।", icon: Mail, category: "community", status: "soon", shortcut: 3 },
  { id: "cafe", en: "Cafe", bn: "ক্যাফে", descEn: "Interest-based communities.", descBn: "আগ্রহভিত্তিক কমিউনিটি।", icon: Coffee, category: "community", status: "soon", shortcut: 5 },
  { id: "kin", en: "Knowledge iN", bn: "প্রশ্ন-উত্তর", descEn: "Ask and answer questions.", descBn: "প্রশ্ন করুন, উত্তর দিন।", icon: MessageCircleQuestion, category: "community", status: "soon", shortcut: 8 },
  { id: "shopping", en: "Shopping", bn: "শপিং", descEn: "Browse illustrative products.", descBn: "নমুনা পণ্য দেখুন।", icon: ShoppingBag, category: "shopping", status: "preview", to: "/", shortcut: 6 },
  { id: "smartstore", en: "Smart Store", bn: "স্মার্ট স্টোর", descEn: "Open your own online shop.", descBn: "নিজের অনলাইন দোকান খুলুন।", icon: Store, category: "shopping", status: "soon" },
  { id: "pay", en: "Pay", bn: "পেমেন্ট", descEn: "Simple digital payments.", descBn: "সহজ ডিজিটাল পেমেন্ট।", icon: Wallet, category: "shopping", status: "soon" },
  { id: "maps", en: "Maps", bn: "ম্যাপ", descEn: "Places and directions.", descBn: "স্থান ও দিকনির্দেশনা।", icon: Map, category: "utilities", status: "soon", shortcut: 7 },
  { id: "translator", en: "Translator (Papago)", bn: "অনুবাদ", descEn: "Bangla ⇄ English translation.", descBn: "বাংলা ⇄ ইংরেজি অনুবাদ।", icon: Languages, category: "utilities", status: "soon" },
  { id: "dictionary", en: "Dictionary", bn: "অভিধান", descEn: "Word meanings and usage.", descBn: "শব্দের অর্থ ও ব্যবহার।", icon: BookA, category: "utilities", status: "soon" },
  { id: "weather", en: "Weather", bn: "আবহাওয়া", descEn: "Forecast preview (demo data).", descBn: "পূর্বাভাস প্রিভিউ (ডেমো)।", icon: CloudSun, category: "utilities", status: "preview", to: "/" },
  { id: "webtoon", en: "Webtoon", bn: "ওয়েবটুন", descEn: "Digital comics.", descBn: "ডিজিটাল কমিকস।", icon: BookOpen, category: "entertainment", status: "soon", shortcut: 9 },
  { id: "series", en: "Series (eBooks & Web Novels)", bn: "সিরিজ", descEn: "eBooks and web novels.", descBn: "ই-বুক ও ওয়েব উপন্যাস।", icon: Library, category: "entertainment", status: "soon" },
  { id: "tv", en: "TV/Videos", bn: "ভিডিও", descEn: "Clips and shows.", descBn: "ক্লিপ ও অনুষ্ঠান।", icon: Tv, category: "entertainment", status: "soon" },
  { id: "music", en: "Music (Vibe)", bn: "মিউজিক", descEn: "Stream music.", descBn: "গান শুনুন।", icon: Music, category: "entertainment", status: "soon" },
  { id: "finance", en: "Finance", bn: "ফাইন্যান্স", descEn: "Market preview (demo data).", descBn: "বাজার প্রিভিউ (ডেমো)।", icon: LineChart, category: "personal", status: "preview", to: "/" },
  { id: "sports", en: "Sports", bn: "স্পোর্টস", descEn: "Scores and sports news.", descBn: "স্কোর ও খেলার খবর।", icon: Trophy, category: "personal", status: "soon" },
  { id: "account", en: "My Account", bn: "আমার একাউন্ট", descEn: "Profile and settings (demo).", descBn: "প্রোফাইল ও সেটিংস (ডেমো)।", icon: UserRound, category: "personal", status: "preview" },
];

export const allServicesShortcut = { id: "all", en: "All Services", bn: "সকল সেবা", icon: LayoutGrid };
