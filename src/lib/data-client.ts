export interface IndicatorData {
  countryCode: string;
  year: number;
  value: number | null;
}

/**
 * Fetches indicator data utilizing a dual-strategy (Offline JSON + REST API).
 * By default it dynamically imports the local optimized datastore first.
 */
export async function fetchIndicatorData(
  indicatorCode: string,
  countryCodes: string[],
  startYear: number,
  endYear: number,
  useOffline: boolean = true
): Promise<IndicatorData[]> {
  const results: IndicatorData[] = [];

  if (useOffline) {
    try {
      // Load the appropriate dataset based on the indicator code
      let localCache: any;

      if (indicatorCode === "PV.TER.DTHS") {
        localCache = (await import('../data/terrorism-deaths-grouped.json')).default;
      } else if (indicatorCode === "PV.TER.INCD") {
        localCache = (await import('../data/terrorism-attacks-grouped.json')).default;
      } else {
        localCache = (await import('../data/world-development-indicators-grouped.json')).default;
      }

      if (localCache && localCache[indicatorCode]) {
        const indicatorData = localCache[indicatorCode].data;

        for (const code of countryCodes) {
          const countryTimeline = indicatorData[code];

          if (countryTimeline) {
            for (let y = startYear; y <= endYear; y++) {
              const val = countryTimeline[y.toString()];
              // If the year is recorded (even if null), push it formally
              if (val !== undefined) {
                results.push({
                  countryCode: code,
                  year: y,
                  value: val
                });
              }
            }
          }
        }

        // If the static datastore perfectly fulfilled the required data vectors, return instantly!
        if (results.length > 0) {
          return results;
        }
      }
    } catch (error) {
      console.warn("Offline dataset not found or failed to load. Falling back to World Bank REST API.", error);
    }
  }

  // Fallback gracefully back to World Bank REST API if cache completely misses
  const countryString = countryCodes.join(";");
  const url = `https://api.worldbank.org/v2/country/${countryString}/indicator/${indicatorCode}?date=${startYear}:${endYear}&format=json&per_page=1000`;

  try {
    const response = await fetch(url, { next: { revalidate: 86400 } }); // Cache for 24 hours
    if (!response.ok) throw new Error("Failed to fetch from World Bank API");

    const data = await response.json();

    // The World Bank API returns an array where the second element contains the actual data
    if (!data || !data[1]) return [];

    return data[1].map((item: any) => ({
      countryCode: item.countryiso3code || item.country.id,
      year: parseInt(item.date, 10),
      value: item.value, // value can be null explicitly
    }));
  } catch (error) {
    console.error("Error fetching World Bank data:", error);
    return [];
  }
}
