import type { Metadata } from "next";
import { Geist, Geist_Mono, Libre_Baskerville, Recursive, Roboto, IBM_Plex_Mono } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const libreBaskerville = Libre_Baskerville({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
});

const recursive = Recursive({
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-recursive",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["300", "400", "500", "700"],
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Statsman | Political & Economic Metrics",
  description: "Visualize economic and social indicators alongside political leadership eras. See how countries performed under different leaders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${libreBaskerville.variable} ${recursive.variable} ${roboto.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className={`${recursive.className} min-h-full flex flex-col bg-background text-foreground`} style={{ "--font-future": "'Future', 'Futura', sans-serif" } as React.CSSProperties}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NuqsAdapter>
            <TooltipProvider>
              <Navbar />
              <div className={`flex-1 w-full flex flex-col`}>
                {children}
              </div>
              <Footer />
            </TooltipProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  );
}
