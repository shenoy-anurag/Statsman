"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()

  const currentTheme = theme === "system" ? systemTheme : theme;

  return (
    <button
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border/40 bg-background/50 hover:bg-accent hover:text-accent-foreground transition-all group"
      aria-label="Toggle theme"
    >
      <Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-muted-foreground group-hover:text-foreground" />
      <Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-muted-foreground group-hover:text-foreground" />
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}
