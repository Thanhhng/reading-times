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
} from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  locked?: boolean;
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
