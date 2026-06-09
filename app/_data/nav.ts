import type { LucideIcon } from "lucide-react";
import {
  Home,
  Library,
  Search,
  Tag,
  Upload,
  MessageCircle,
  Star,
  Highlighter,
  BookOpen,
  User,
} from "lucide-react";
import { books } from "./books";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  locked?: boolean;
};

export type BottomNavTab = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  primary?: boolean;
  dot?: boolean;
};

export const mainNav: NavItem[] = [
  { title: "Home", href: "/", icon: Home },
  { title: "Library", href: "/library", icon: Library },
  { title: "Search", href: "/search", icon: Search, badge: "⌘K" },
  { title: "Categories", href: "/categories", icon: Tag },
];

export const gatedNav: NavItem[] = [
  { title: "Add book", href: "/add", icon: Upload, locked: true },
  { title: "AI Companion", href: "/companion", icon: MessageCircle, locked: true },
  { title: "My Vocabulary", href: "/vocabulary", icon: Star, locked: true },
  { title: "Highlights", href: "/highlights", icon: Highlighter, locked: true },
];

const continueBook = books.find((book) => book.progress) ?? books[0];

export const bottomNavTabs: BottomNavTab[] = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "library", label: "Library", href: "/library", icon: Library },
  {
    id: "read",
    label: "Read",
    href: `/read/${continueBook.id}`,
    icon: BookOpen,
    primary: true,
  },
  { id: "profile", label: "Profile", href: "/settings", icon: User },
];
