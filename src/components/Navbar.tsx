import Link from "next/link";
import { Github, Coffee, Activity } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl mx-auto items-center justify-between px-6 md:px-12 xl:px-16">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary/10 p-1.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Activity className="h-5 w-5 text-primary" />
          </div>
          <span className="font-bold sm:inline-block tracking-tight text-lg">
            Statsman
          </span>
        </Link>

        <nav className="flex items-center gap-3 md:gap-4 text-sm font-medium">

          <Link
            href="/explore"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mr-2"
          >
            <span className="hidden sm:inline-block font-semibold">Explore Data</span>
          </Link>

          <ThemeToggle />

          <Link
            href="https://github.com/shenoy-anurag/statsman"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            <span className="hidden sm:inline-block">GitHub</span>
          </Link>
          <Link
            href="https://buymeacoffee.com/anuragshenoy"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors px-3 py-1.5 rounded-full shadow-sm"
          >
            <Coffee className="h-4 w-4" />
            <span className="hidden sm:inline-block font-semibold">Support</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
