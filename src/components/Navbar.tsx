import Link from "next/link";
import { Github, Coffee, Activity } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import SvgIcon from "./icons/svg-icon";
import { Separator } from "@base-ui/react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl mx-auto items-center justify-between px-6 md:px-12 xl:px-16">
        <div className="flex h-full items-stretch gap-4">
          <Link href="/" className="flex h-full items-center px-4 gap-2 group hover:bg-muted/70 transition-colors">
            <div className="bg-primary/10 p-1.5 rounded-none group-hover:bg-primary/20 transition-colors">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold sm:inline-block tracking-tight text-lg">
              Statsman
            </span>
          </Link>

          <Separator orientation="vertical" className="h-6 w-px bg-border/80 ml-2 self-center" />

          <div className="flex h-full items-stretch gap-0">
            <Link
              href="/explore"
              className="flex items-center px-4 h-full gap-2 font-semibold text-muted-foreground hover:text-foreground rounded-none bg-background/50 hover:bg-muted/70 transition-colors"
            >
              <span className="hidden xl:inline-block">Explore Data</span>
              <span className="xl:hidden">Explore</span>
            </Link>

            <Link
              href="/india"
              className="flex items-center px-4 h-full gap-2 font-semibold text-muted-foreground hover:text-foreground rounded-none bg-background/50 hover:bg-muted/70 transition-colors"
            >
              <SvgIcon className="h-5 w-5" icon={"IndiaFlag"} />
              <span className="hidden sm:inline-block">India</span>
            </Link>
          </div>

        </div>

        <nav className="flex h-full items-stretch gap-0 text-sm font-medium">

          <ThemeToggle />

          <Link
            href="https://github.com/shenoy-anurag/statsman"
            target="_blank"
            rel="noreferrer"
            className="flex items-center px-4 h-full gap-2 text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
          >
            <SvgIcon className="h-5 w-5" icon={"Github"} />
            <span className="hidden sm:inline-block">GitHub</span>
          </Link>
          <Link
            href="https://buymeacoffee.com/anuragshenoy"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 bg-primary/5 text-muted-foreground hover:text-secondary hover:bg-primary/80 transition-colors px-6 h-full rounded-none"
          >
            <Coffee className="h-4 w-4" />
            <span className="hidden sm:inline-block font-semibold">Support</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
