import type { LucideIcon } from "lucide-react";
import { Home, Library, BookOpen, User } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
};

export type BottomNavTab = {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
};

export const topNav: NavItem[] = [
  { title: "Home", href: "/" },
  { title: "Library", href: "/library" },
  { title: "Categories", href: "/categories" },
];

export const bottomNavTabs: BottomNavTab[] = [
  { id: "home", label: "Home", href: "/", icon: Home },
  { id: "library", label: "Library", href: "/library", icon: Library },
  { id: "read", label: "Read", href: "/library", icon: BookOpen },
  { id: "profile", label: "Profile", href: "/settings", icon: User },
];
