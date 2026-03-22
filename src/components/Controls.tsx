"use client";

import { useQueryState } from "nuqs";
import { INDICATORS } from "@/constants/indicators";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ControlsProps {
  initialIndicator: string;
  initialCountries: string;
  initialStart: number;
  initialEnd: number;
}

export function Controls({ initialIndicator, initialCountries, initialStart, initialEnd }: ControlsProps) {
  // shallow: false means changing these will perform a shallow navigation which Next.js App router handles
  // and re-runs the Server Component `page.tsx`, automatically fetching the new data.
  const [indicator, setIndicator] = useQueryState("indicator", { defaultValue: initialIndicator, shallow: false });
  const [countries, setCountries] = useQueryState("countries", { defaultValue: initialCountries, shallow: false });
  const [startYear, setStartYear] = useQueryState("start", { defaultValue: initialStart.toString(), shallow: false });
  const [endYear, setEndYear] = useQueryState("end", { defaultValue: initialEnd.toString(), shallow: false });

  const availableCountries = [
    { code: "IND", name: "India" },
    { code: "CHN", name: "China" },
    { code: "USA", name: "United States" },
    { code: "GBR", name: "United Kingdom" },
    { code: "DEU", name: "Germany" },
    { code: "JPN", name: "Japan" },
    { code: "FRA", name: "France" },
    { code: "ITA", name: "Italy" },
    { code: "RUS", name: "Russian Federation" },
    { code: "CAN", name: "Canada" },
    { code: "AUS", name: "Australia" },
    { code: "BGD", name: "Bangladesh" },
    { code: "PAK", name: "Pakistan" },
  ];

  const handleCountryToggle = (code: string) => {
    let currentList = countries.split(",").filter(Boolean);
    if (currentList.includes(code)) {
      currentList = currentList.filter(c => c !== code);
      // Optionally gracefully remove tied SARs if China is fully unselected
      if (code === "CHN") {
        currentList = currentList.filter(c => c !== "MAC" && c !== "HKG");
      }
    } else {
      currentList.push(code);
      // Automatically inject Special Administrative Regions when China is enabled for composite tracking
      if (code === "CHN") {
        if (!currentList.includes("MAC")) currentList.push("MAC");
        if (!currentList.includes("HKG")) currentList.push("HKG");
      }
    }
    setCountries(currentList.join(","));
  };

  return (
    <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground">Indicator</label>
        <Select value={indicator} onValueChange={(val) => setIndicator(val)}>
          <SelectTrigger className="w-full bg-background">
            <SelectValue placeholder="Select Indicator" />
          </SelectTrigger>
          <SelectContent className="w-full bg-background">
            {INDICATORS.map(ind => (
              <SelectItem key={ind.id} value={ind.id}>
                {ind.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-3">
        <label className="text-sm font-semibold text-foreground">Countries to Compare</label>
        <div className="flex flex-col gap-2">
          {availableCountries.map(country => {
            const isSelected = countries.includes(country.code);
            return (
              <button
                key={country.code}
                onClick={() => handleCountryToggle(country.code)}
                className={`flex items-center gap-3 px-3 py-2 rounded-none border transition-all text-sm text-left group
                  ${isSelected ? 'bg-primary/5 border-primary text-primary font-medium shadow-sm' : 'hover:bg-muted bg-background text-muted-foreground'}
                `}
              >
                <div className={`w-4 h-4 rounded-none border flex items-center justify-center transition-colors ${isSelected ? 'border-primary bg-primary' : 'group-hover:border-foreground/40'}`}>
                  {isSelected && <div className="w-1.5 h-1.5 bg-background rounded-none" />}
                </div>
                <span className="flex-1">{country.name}</span>
                <span className="text-xs opacity-60 uppercase">{country.code}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-foreground">Time Range</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(e.target.value)}
            className="w-full flex h-10 rounded-none border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            min="1950" max="2025"
          />
          <span className="text-muted-foreground text-sm">to</span>
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(e.target.value)}
            className="w-full flex h-10 rounded-none border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            min="1950" max="2025"
          />
        </div>
      </div>
    </div>
  );
}
