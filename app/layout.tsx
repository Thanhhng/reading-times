import type { Metadata } from "next";
import { Fraunces, Literata, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "./components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { DesktopSidebar } from "./_components/layout/DesktopSidebar";
import { MobileSidebar } from "./_components/layout/MobileSidebar";
import { MobileHeader } from "./_components/layout/MobileHeader";

const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  variable: "--font-literata",
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-bevietnam",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Reading Time",
  description: "Turn wasted time into wonderful time.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        fraunces.variable,
        literata.variable,
        beVietnamPro.variable,
      )}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider>
            <DesktopSidebar />
            <main className="flex min-w-0 flex-1 flex-col bg-background @container/main">
              <MobileHeader />
              {children}
            </main>
            <MobileSidebar />
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
