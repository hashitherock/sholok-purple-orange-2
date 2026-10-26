import city from "@/assets/news-city.jpg";
import study from "@/assets/blog-study.jpg";
import tech from "@/assets/product-tech.jpg";
import tea from "@/assets/travel-tea.jpg";

export const images = { city, study, tech, tea };

export const newsCats = [
  { id: "bangladesh", bn: "বাংলাদেশ", en: "Bangladesh" },
  { id: "world", bn: "বিশ্ব", en: "World" },
  { id: "business", bn: "ব্যবসা", en: "Business" },
  { id: "tech", bn: "প্রযুক্তি", en: "Technology" },
  { id: "sports", bn: "খেলাধুলা", en: "Sports" },
  { id: "entertainment", bn: "বিনোদন", en: "Entertainment" },
] as const;

export interface NewsItem { id: number; cat: string; bn: string; en: string; source: string; mins: number; img: string }

const n = (id: number, cat: string, bn: string, en: string, source: string, mins: number, img: string): NewsItem => ({ id, cat, bn, en, source, mins, img });

export const news: NewsItem[] = [
  n(1, "bangladesh", "নদীপথে নতুন যাত্রী সেবা চালুর পরিকল্পনা (নমুনা)", "Sample: New river passenger service being planned", "Sholok Desk", 12, city),
  n(2, "bangladesh", "শহরের পার্কগুলোতে সবুজায়ন উদ্যোগ (নমুনা)", "Sample: Greening drive across city parks", "Demo Daily", 40, tea),
  n(3, "bangladesh", "স্কুলে ডিজিটাল ক্লাসরুম বাড়ছে (নমুনা)", "Sample: More schools adopt digital classrooms", "Sample Times", 75, study),
  n(4, "world", "জলবায়ু সম্মেলনে নতুন প্রতিশ্রুতি (নমুনা)", "Sample: New pledges at a climate summit", "Demo Wire", 20, tea),
  n(5, "world", "বিশ্বজুড়ে নবায়নযোগ্য শক্তির ব্যবহার বাড়ছে (নমুনা)", "Sample: Renewable energy use grows worldwide", "Sholok Desk", 55, city),
  n(6, "business", "ক্ষুদ্র উদ্যোক্তাদের অনলাইন বিক্রি বাড়ছে (নমুনা)", "Sample: Small sellers see online growth", "Demo Business", 18, tech),
  n(7, "business", "চা রপ্তানিতে নতুন বাজারের খোঁজ (নমুনা)", "Sample: Tea exporters explore new markets", "Sample Times", 90, tea),
  n(8, "tech", "বাংলা ভাষায় এআই সহকারীর চাহিদা বাড়ছে (নমুনা)", "Sample: Demand rises for Bangla AI assistants", "Demo Tech", 8, study),
  n(9, "tech", "নতুন ওয়্যারলেস হেডফোনের পর্যালোচনা (নমুনা)", "Sample: Reviewing new wireless headphones", "Gadget Demo", 33, tech),
  n(10, "sports", "যুব ক্রিকেট দলের অনুশীলন শুরু (নমুনা)", "Sample: Youth cricket squad begins training", "Demo Sports", 25, city),
  n(11, "sports", "জেলা ফুটবল লিগের সূচি প্রকাশ (নমুনা)", "Sample: District football league schedule out", "Sholok Desk", 60, tea),
  n(12, "entertainment", "নতুন বাংলা ওয়েব সিরিজের ট্রেলার (নমুনা)", "Sample: Trailer for a new Bangla web series", "Demo Show", 15, study),
  n(13, "entertainment", "লোকসংগীত উৎসবের প্রস্তুতি (নমুনা)", "Sample: Folk music festival preparations", "Sample Times", 80, tea),
];

export const blogCats = [
  { id: "tech", bn: "প্রযুক্তি", en: "Technology" },
  { id: "education", bn: "শিক্ষা", en: "Education" },
  { id: "lifestyle", bn: "লাইফস্টাইল", en: "Lifestyle" },
  { id: "travel", bn: "ভ্রমণ", en: "Travel" },
  { id: "food", bn: "খাবার", en: "Food" },
  { id: "business", bn: "ব্যবসা", en: "Business" },
  { id: "entertainment", bn: "বিনোদন", en: "Entertainment" },
] as const;

export interface BlogPost { id: number; cat: string; bn: string; en: string; exBn: string; exEn: string; author: string; mins: number; img: string }

const b = (id: number, cat: string, bn: string, en: string, exBn: string, exEn: string, author: string, mins: number, img: string): BlogPost => ({ id, cat, bn, en, exBn, exEn, author, mins, img });

export const blogs: BlogPost[] = [
  b(1, "travel", "শ্রীমঙ্গলের চা বাগানে এক সকাল", "A morning in Sreemangal's tea gardens", "কুয়াশা, সবুজ পাহাড় আর সাত রঙের চা।", "Mist, green hills and the famous seven-layer tea.", "রিনা আহমেদ", 6, tea),
  b(2, "education", "অনলাইনে পড়াশোনার ৭টি কৌশল", "7 tips for studying online", "মনোযোগ ধরে রাখার সহজ উপায়।", "Simple ways to stay focused.", "তানভীর হাসান", 5, study),
  b(3, "tech", "বাজেটে সেরা হেডফোন বাছাই", "Choosing headphones on a budget", "কী দেখবেন, কী এড়াবেন।", "What to look for and what to skip.", "Arif K.", 4, tech),
  b(4, "lifestyle", "শহুরে জীবনে ছোট ছোট অভ্যাস", "Small habits for city life", "প্রতিদিন একটু ভালো থাকার চেষ্টা।", "Feeling a little better every day.", "নাদিয়া ইসলাম", 3, city),
  b(5, "food", "ঘরে বসে পারফেক্ট মসলা চা", "Perfect masala tea at home", "আদা, এলাচ আর দারুচিনির সঠিক অনুপাত।", "The right mix of ginger, cardamom and cinnamon.", "Sumi R.", 4, tea),
  b(6, "business", "ছোট ব্যবসার জন্য সোশ্যাল মিডিয়া", "Social media for small businesses", "কম খরচে বেশি গ্রাহক।", "Reach more customers for less.", "মাহমুদ করিম", 7, study),
  b(7, "entertainment", "এই মাসে দেখার মতো ৫টি সিনেমা", "5 films worth watching this month", "পরিবারসহ দেখার উপযোগী তালিকা।", "A family-friendly watch list.", "Priya D.", 5, city),
  b(8, "tech", "ফোনের ব্যাটারি দীর্ঘস্থায়ী করার উপায়", "Making your phone battery last", "সেটিংসে কয়েকটি পরিবর্তন।", "A few settings changes that help.", "রাকিব উদ্দিন", 3, tech),
  b(9, "travel", "বুড়িগঙ্গার সূর্যাস্ত", "Sunset on the Buriganga", "লঞ্চঘাটের কোলাহল আর কমলা আকাশ।", "Busy ferry docks under an orange sky.", "Sadia H.", 4, city),
];

export interface Product { id: number; bn: string; en: string; cat: string; catEn: string; price: number; discount?: number; img: string }

export const products: Product[] = [
  { id: 1, bn: "ওয়্যারলেস হেডফোন", en: "Wireless Headphones", cat: "ইলেকট্রনিক্স", catEn: "Electronics", price: 4500, discount: 15, img: tech },
  { id: 2, bn: "সিলেটি প্রিমিয়াম চা ৫০০গ্রা", en: "Sylhet Premium Tea 500g", cat: "খাবার", catEn: "Groceries", price: 650, img: tea },
  { id: 3, bn: "স্টুডেন্ট ল্যাপটপ ব্যাগ", en: "Student Laptop Bag", cat: "ফ্যাশন", catEn: "Fashion", price: 1800, discount: 10, img: study },
  { id: 4, bn: "ঢাকা সিটি ফটো প্রিন্ট", en: "Dhaka City Photo Print", cat: "ঘর সাজানো", catEn: "Home decor", price: 1200, img: city },
];

export const trending = [
  { bn: "বাংলাদেশ", en: "Bangladesh" },
  { bn: "প্রযুক্তি", en: "Technology" },
  { bn: "শিক্ষা", en: "Education" },
  { bn: "চাকরি", en: "Jobs" },
  { bn: "খেলাধুলা", en: "Sports" },
  { bn: "বিনোদন", en: "Entertainment" },
];

export const markets = [
  { name: "DSEX (demo)", value: "6,214.3", change: 0.42 },
  { name: "DS30 (demo)", value: "2,188.9", change: -0.18 },
  { name: "USD/BDT (demo)", value: "119.50", change: 0.05 },
];

const bnDigits = "০১২৩৪৫৬৭৮৯";
export const toBn = (v: string | number) => String(v).replace(/\d/g, (d) => bnDigits.charAt(+d));
export const fmtNum = (v: number, lang: "bn" | "en") => {
  const s = v.toLocaleString("en-IN");
  return lang === "bn" ? toBn(s) : s;
};
export const fmtAgo = (mins: number, lang: "bn" | "en") =>
  mins < 60
    ? lang === "bn" ? `${toBn(mins)} মিনিট আগে` : `${mins} min ago`
    : lang === "bn" ? `${toBn(Math.floor(mins / 60))} ঘণ্টা আগে` : `${Math.floor(mins / 60)} hr ago`;
