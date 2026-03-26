import Link from "next/link";
import { Activity } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 py-6 md:py-8 mt-auto flex-shrink-0">
      <div className="container max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6 md:px-12 xl:px-16 text-sm text-muted-foreground">

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Activity className="h-4 w-4 opacity-50" />
            <span className="font-semibold text-foreground tracking-tight opacity-70">Statsman</span>
          </div>
          <span className="hidden md:inline-block opacity-40">|</span>
          <p className="text-center md:text-left">
            &copy; {new Date().getFullYear()} Anurag Shenoy. All rights reserved.
          </p>
        </div>

        <nav className="flex items-center gap-6 font-medium">
          <Link href="/about" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
            About
          </Link>
          <Link href="https://github.com/shenoy-anurag/statsman" target="_blank" rel="noreferrer" className="hover:text-foreground transition-colors underline-offset-4 hover:underline">
            Source Code
          </Link>
        </nav>

      </div>
    </footer>
  );
}
