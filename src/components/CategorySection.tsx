"use client";

import { useState } from "react";
import { LazyChartCard } from "@/components/LazyChartCard";
import { IndicatorCategory, INDICATORS_MAP } from "@/constants/indicators";

interface CategorySectionProps {
  category: IndicatorCategory;
  countryCodes: string[];
  startYear: number;
  endYear: number;
  categoryIndex: number;
  defaultOpen?: boolean;
}

export function CategorySection({
  category,
  countryCodes,
  startYear,
  endYear,
  categoryIndex,
  defaultOpen = false,
}: CategorySectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="w-full flex flex-col gap-0">
      {/* Collapsible header */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center gap-4 py-5 text-left group cursor-pointer transition-colors hover:bg-card/30 rounded-none -mx-2 px-2"
        aria-expanded={isOpen}
        aria-controls={`category-${category.id}`}
      >
        {/* Chevron */}
        <span
          className="text-muted-foreground transition-transform duration-300 flex-shrink-0"
          style={{ transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 4L13 10L7 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>

        <div className="flex flex-col gap-1 min-w-0">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
            {category.title}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {category.description}
          </p>
        </div>

        {/* Indicator count badge */}
        <span className="ml-auto flex-shrink-0 text-xs font-medium text-muted-foreground bg-muted px-2.5 py-1 rounded-full tabular-nums">
          {category.indicators.length}
        </span>
      </button>

      {/* Collapsible content with smooth animation */}
      <div
        id={`category-${category.id}`}
        className="category-collapse-body"
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 400ms cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full pt-4 pb-2">
            {category.indicators.map((indicatorCode, index) => {
              const config = INDICATORS_MAP[indicatorCode];
              if (!config) return null;

              return (
                <LazyChartCard
                  key={indicatorCode}
                  indicatorCode={indicatorCode}
                  config={config}
                  countryCodes={countryCodes}
                  startYear={startYear}
                  endYear={endYear}
                  animationDelay={(categoryIndex * 3 + index) * 60}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
