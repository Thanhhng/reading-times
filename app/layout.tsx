import type { Metadata } from "next";
import { Fraunces, Literata, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DesktopSidebar } from "@/components/layout/DesktopSidebar";
import { MobileTopBar } from "@/components/layout/MobileTopBar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { fetchBooks, readableBooks } from "@/app/_data/gutendex";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const featured = readableBooks(await fetchBooks({ sort: "popular" }))[0];
  const readHref = featured ? `/read/${featured.id}` : "/library";
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
        <TooltipProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <DesktopSidebar />
              <div className="flex min-w-0 flex-1 flex-col">
                <MobileTopBar />
                <main className="flex min-w-0 flex-1 flex-col bg-background pb-[calc(var(--space-8)+env(safe-area-inset-bottom,0))] @container/main md:pb-0">
                  {children}
                </main>
              </div>
              <MobileBottomNav readHref={readHref} />
            </SidebarProvider>
          </ThemeProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
