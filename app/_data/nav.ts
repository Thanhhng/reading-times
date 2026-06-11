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

export const bottomNavTabs: BottomNavTab[] = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "library", label: "Library", href: "/library", icon: Library },
  { id: "read", label: "Read", href: "/library", icon: BookOpen },
  { id: "profile", label: "Profile", href: "/settings", icon: User },
];
