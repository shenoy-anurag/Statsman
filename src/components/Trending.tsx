import Link from "next/link";
import { getTrendingComparisons } from "@/lib/analytics";

export async function TrendingComparisons() {
  const trends = await getTrendingComparisons();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-sm font-bold text-foreground uppercase tracking-wider text-muted-foreground flex items-center gap-2">
        <span className="text-primary animate-pulse">🔥</span> Trending
      </h3>
      <div className="flex flex-col gap-3">
        {trends.map(trend => (
          <Link
            key={trend.id}
            href={`/?indicator=${trend.indicator}&countries=${trend.countries}&start=${trend.start}&end=${trend.end}`}
            className="flex flex-col gap-1 p-3 rounded-none border border-border/50 bg-background hover:bg-muted/30 hover:border-border transition-all group text-left"
          >
            <span className="font-semibold text-sm group-hover:text-primary transition-colors leading-tight">{trend.title}</span>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <span className="font-medium text-primary/70">{trend.views.toLocaleString()} views</span>
              <span className="opacity-50">•</span>
              <span className="uppercase tracking-wider">{trend.countries.split(',').join(' vs ')}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
