"use client";

import * as React from "react";
import {
  KBarProvider,
  KBarPortal,
  KBarPositioner,
  KBarAnimator,
  KBarSearch,
  KBarResults,
  useMatches,
  Action,
} from "kbar";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { INDICATORS } from "@/constants/indicators";
import {
  LayoutDashboard,
  Map,
  Telescope,
  Info,
  Sun,
  Moon,
  TrendingUp,
  BarChart3,
  Search,
  Train,
} from "lucide-react";


export function KBarSearchComponent({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { setTheme, theme, systemTheme } = useTheme();

  const actions: Action[] = [
    {
      id: "home",
      name: "Dashboard Home",
      shortcut: ["h"],
      keywords: "home dashboard index",
      perform: () => router.push("/"),
      icon: <LayoutDashboard className="w-5 h-5 flex-shrink-0" />,
      section: "Navigation",
    },
    {
      id: "india",
      name: "India Dashboard",
      shortcut: ["i"],
      keywords: "india bharat dashboard",
      perform: () => router.push("/india"),
      icon: <Map className="w-5 h-5 flex-shrink-0" />,
      section: "Navigation",
    },
    {
      id: "explore",
      name: "Explore / Indicators Search",
      shortcut: ["e"],
      keywords: "explore search indicators data",
      perform: () => router.push("/explore"),
      icon: <Telescope className="w-5 h-5 flex-shrink-0" />,
      section: "Navigation",
    },
    {
      id: "about",
      name: "About Statsman",
      shortcut: ["a"],
      keywords: "about information project",
      perform: () => router.push("/about"),
      icon: <Info className="w-5 h-5 flex-shrink-0" />,
      section: "Navigation",
    },
    {
      id: "india-railways",
      name: "India Railways Dashboard",
      shortcut: ["r"],
      keywords: "india railways electrification transport",
      perform: () => router.push("/india/railways"),
      icon: <Train className="w-5 h-5 flex-shrink-0" />,
      section: "India Dashboard",
    },
    {
      id: "india-startups",
      name: "India Startups Dashboard",
      shortcut: ["s"],
      keywords: "india startups dpiit companies entrepreneurship",
      perform: () => router.push("/india/startups"),
      icon: <TrendingUp className="w-5 h-5 flex-shrink-0" />,
      section: "India Dashboard",
    },
    {
      id: "theme",
      name: "Toggle Theme",
      shortcut: ["t"],
      keywords: "theme dark light mode",
      perform: () => {
        const currentTheme = theme === "system" ? systemTheme : theme;
        setTheme(currentTheme === "dark" ? "light" : "dark");
      },
      icon: theme === "dark" ? <Sun className="w-5 h-5 flex-shrink-0" /> : <Moon className="w-5 h-5 flex-shrink-0" />,
      section: "System",
    },
    // Dynamically add indicator actions
    ...INDICATORS.map((indicator) => ({
      id: `indicator-${indicator.id}`,
      name: indicator.name,
      subtitle: indicator.shortName,
      keywords: `${indicator.name} ${indicator.shortName} ${indicator.id} indicator data`,
      perform: () => router.push(`/explore?indicator=${indicator.id}&countries=CHN,IND,USA`),
      icon: <BarChart3 className="w-5 h-5 flex-shrink-0" />,
      section: "Data Indicators",
    })),
  ];

  return (
    <KBarProvider actions={actions}>
      <KBarPortal>
        <KBarPositioner className="z-[999999] bg-background/80 backdrop-blur-sm p-4">
          <KBarAnimator className="w-full max-w-[600px] overflow-hidden rounded-none border border-border bg-card shadow-2xl transition-all">
            <div className="flex items-center gap-3 px-4 py-4 border-b border-border shadow-sm">
              <Search className="w-5 h-5 text-muted-foreground ml-1" />
              <KBarSearch className="w-full bg-transparent outline-none text-foreground placeholder:text-muted-foreground py-1 text-lg" placeholder="Type a command or search indicators..." />
              <kbd className="flex items-center gap-1.5 rounded-none border border-border bg-muted/30 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground opacity-60">
                <span className="text-xs">ESC</span>
              </kbd>
            </div>
            <div className="max-h-[450px] overflow-auto pb-4 custom-scrollbar">
              <RenderResults />
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
      {children}
    </KBarProvider>
  );
}

function RenderResults() {
  const { results } = useMatches();

  return (
    <KBarResults
      items={results}
      onRender={({ item, active }) =>
        typeof item === "string" ? (
          <div className="px-5 py-2 text-[11px] font-bold uppercase tracking-widest text-muted-foreground opacity-70 mt-4 first:mt-2">
            {item}
          </div>
        ) : (
          <div
            className={`flex items-center justify-between px-4 py-3.5 mx-2 my-0.5 cursor-pointer rounded-none transition-all duration-200 ${active
              ? "bg-primary/10 text-primary border-l-4 border-primary shadow-inner"
              : "text-muted-foreground hover:bg-muted/40 hover:text-foreground"
              }`}
          >
            <div className="flex items-center gap-4">
              {item.icon && <div className={`${active ? "text-primary" : "text-muted-foreground"} transition-colors`}>{item.icon}</div>}
              <div className="flex flex-col">
                <span className={`text-sm font-semibold ${active ? "text-primary" : "text-foreground"} transition-colors tracking-tight`}>{item.name}</span>
                {item.subtitle && <span className="text-[11px] text-muted-foreground leading-tight">{item.subtitle}</span>}
              </div>
            </div>
            {item.shortcut?.length ? (
              <div aria-hidden className="flex gap-1.5 ml-8 flex-shrink-0">
                {item.shortcut.map((sc) => (
                  <kbd
                    key={sc}
                    className={`flex h-6 min-w-6 items-center justify-center rounded-none px-1.5 border border-border bg-muted/60 text-[11px] font-bold ${active ? "text-primary border-primary/30" : "text-muted-foreground"}`}
                  >
                    {sc.toUpperCase()}
                  </kbd>
                ))}
              </div>
            ) : (
              <div className="text-[10px] text-muted-foreground opacity-0 group-hover:opacity-40 transition-opacity">
                Select
              </div>
            )}
          </div>
        )
      }
    />
  );
}

