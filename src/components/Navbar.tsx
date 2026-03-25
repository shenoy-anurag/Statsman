"use client";

import Link from "next/link";
import { Coffee, Activity, Menu, X, Search } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import SvgIcon from "./icons/svg-icon";
import { Separator } from "@base-ui/react";
import { useState } from "react";
import { useKBar } from "kbar";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { query } = useKBar();


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 max-w-7xl mx-auto items-center justify-between px-6 md:px-12 xl:px-16">
        <div className="flex h-full items-stretch gap-4">
          <Link href="/" className="flex h-full items-center px-4 gap-2 group hover:bg-muted/70 transition-colors">
            <div className="bg-primary/10 p-1.5 rounded-none group-hover:bg-primary/20 transition-colors">
              <Activity className="h-5 w-5 text-primary" />
            </div>
            <span className="font-bold inline-block tracking-tight text-lg">
              Statsman
            </span>
          </Link>

          <Separator orientation="vertical" className="h-6 w-px bg-border bg-muted-foreground/25 ml-2 self-center hidden md:block" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex h-full items-stretch gap-0">
            <Link
              href="/explore"
              className="flex items-center px-4 h-full gap-2 font-semibold text-muted-foreground hover:text-foreground rounded-none hover:bg-muted/70 transition-colors"
            >
              <span className="hidden xl:inline-block">Explore Data</span>
              <span className="xl:hidden">Explore</span>
            </Link>

            <Link
              href="/india"
              className="flex items-center px-4 h-full gap-2 font-semibold text-muted-foreground hover:text-foreground rounded-none hover:bg-muted/70 transition-colors"
            >
              <SvgIcon className="h-5 w-5" icon={"IndiaFlag"} />
              <span className="hidden sm:inline-block">India</span>
            </Link>
          </div>
        </div>

        {/* Global Controls & Mobile Toggle */}
        <div className="flex h-full items-stretch gap-2">
          {/* Desktop Right Nav Items */}
          <nav className="hidden md:flex h-full items-stretch gap-0 text-sm font-medium">
            <button
              onClick={() => query.toggle()}
              className="flex h-full w-14 items-center justify-center rounded-none hover:bg-muted/70 text-muted-foreground hover:text-foreground transition-all group border-r border-border/20"
              aria-label="Search"
            >
              <Search className="h-[1.1rem] w-[1.1rem]" />
            </button>
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

          {/* Mobile Theme Toggle & Menu Toggle */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => query.toggle()}
              className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
              aria-label="Search"
            >
              <Search className="h-6 w-6" />
            </button>
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-center p-2 text-muted-foreground hover:text-foreground hover:bg-muted/70 transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden border-t border-border/40 bg-background/95 backdrop-blur-md animate-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col p-4 gap-2">
            <Link
              href="/explore"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 gap-3 font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <Activity className="h-5 w-5" />
              <span>Explore Data</span>
            </Link>
            <Link
              href="/india"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 gap-3 font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <SvgIcon className="h-5 w-5" icon={"IndiaFlag"} />
              <span>India Dashboard</span>
            </Link>
            <Separator className="h-px w-full bg-border my-2" />
            <Link
              href="https://github.com/shenoy-anurag/statsman"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 gap-3 text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
            >
              <SvgIcon className="h-5 w-5" icon={"Github"} />
              <span>GitHub Repository</span>
            </Link>
            <Link
              href="https://buymeacoffee.com/anuragshenoy"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="flex items-center p-3 gap-3 text-primary hover:text-secondary hover:bg-primary/10 transition-colors font-semibold"
            >
              <Coffee className="h-5 w-5" />
              <span>Support Development</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
