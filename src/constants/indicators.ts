export interface IndicatorConfig {
  id: string;
  name: string;
  caveat: string;
  type: string;
}

export const INDICATORS: IndicatorConfig[] = [
  {
    id: "NY.GDP.MKTP.KD.ZG",
    name: "GDP growth (annual %)",
    caveat: "Growth is calculated from constant price GDP year-over-year. Does not account for informal economies or inflation recalculation anomalies.",
    type: "percentage",
  },
  {
    id: "NY.GDP.MKTP.CD",
    name: "GDP (current US$)",
    caveat: "GDP measures formal economic activity and doesn't account for inequality, unpaid labor, or the informal sector prevalent in emerging markets.",
    type: "absolute",
  },
  {
    id: "NY.GDP.PCAP.CD",
    name: "GDP per capita (current US$)",
    caveat: "Averages total economic output by population size. High wealth concentration and inequality can heavily distort this figure from average lived reality.",
    type: "absolute",
  },
  {
    id: "NY.GNP.PCAP.CD",
    name: "GNI per capita, Atlas method (current US$)",
    caveat: "GNI accounts for income from abroad. The Atlas method smooths exchange rate fluctuations, but informal remittances are often underreported.",
    type: "absolute",
  },
  {
    id: "NY.GNS.ICTR.GN.ZS",
    name: "Gross Savings (% of GNI)",
    caveat: "Calculated as GNI minus total consumption. High savings rates can indicate capital accumulation potential, but may also reflect lack of domestic consumption.",
    type: "percentage",
  },
  {
    id: "SI.POV.NAHC",
    name: "Poverty headcount ratio at national poverty lines",
    caveat: "National poverty lines are defined differently by each country based on local economic conditions, making direct cross-country numerical comparisons statistically invalid.",
    type: "percentage",
  },
  {
    id: "SI.POV.LMIC",
    name: "Poverty headcount ratio at $3.65 a day (2017 PPP)",
    caveat: "Standardized metric for lower-middle-income countries using Purchasing Power Parity. Price fluctuations and localized inflation significantly impact real tracking.",
    type: "percentage",
  },
  {
    id: "SI.DST.FRST.20",
    name: "Income share held by lowest 20%",
    caveat: "Relies on rigorous household surveys which are frequently irregular or delayed in developing nations, leading to structural reporting lags.",
    type: "percentage",
  },
  {
    id: "SL.UEM.TOTL.ZS",
    name: "Unemployment, total (% of total labor force)",
    caveat: "Does not count discouraged workers who stopped looking for jobs, nor does it capture underemployment or extremely poor quality informal work.",
    type: "percentage",
  },
  {
    id: "SL.TLF.CACT.ZS",
    name: "Labor force participation rate, total (15+)",
    caveat: "Varies heavily based on cultural norms surrounding women in the workplace and shifts in the retirement or compulsory schooling ages.",
    type: "percentage",
  },
  {
    id: "SE.PRM.ENRR",
    name: "School enrollment, primary (% gross)",
    caveat: "Gross enrollment can exceed 100% due to over-age / under-age students and grade repetition. Does not guarantee quality of education or daily attendance.",
    type: "percentage",
  },
  {
    id: "SE.ADT.1524.LT.ZS",
    name: "Literacy rate, youth total (% of people ages 15-24)",
    caveat: "Methodologies vary greatly; some nations use self-reporting while others use empirical testing. Usually lags behind rapid demographic shifts.",
    type: "percentage",
  },
  {
    id: "SP.DYN.LE00.IN",
    name: "Life expectancy at birth, total (years)",
    caveat: "Highly sensitive to infant mortality rates. Rapid changes in medical infrastructure or epidemic outbreaks can radically alter trajectory estimates.",
    type: "absolute",
  },
  {
    id: "SH.DYN.MORT",
    name: "Mortality rate, under-5 (per 1,000 live births)",
    caveat: "Relies on civil registration systems which are often incomplete in lower-income areas, prompting researchers to use demographic models and estimates.",
    type: "absolute",
  },
  {
    id: "SP.POP.TOTL",
    name: "Population, total",
    caveat: "Relies on decennial census data and mid-year estimates. Margin of error expands the further away a country is from its last comprehensive physical census.",
    type: "absolute",
  },
  {
    id: "EG.ELC.ACCS.ZS",
    name: "Access to electricity (% of population)",
    caveat: "Measures access to the grid but does not account for reliability, brownouts, or affordability of the power actually provided to households.",
    type: "percentage",
  },
  {
    id: "EN.ATM.CO2E.PC",
    name: "CO2 emissions (metric tons per capita)",
    caveat: "Only tracks territorial emissions from fossil fuel burning and cement manufacturing. Does not account for 'imported' emissions embedded in trade goods.",
    type: "absolute",
  },
  {
    id: "AG.LND.FRST.ZS",
    name: "Forest area (% of land area)",
    caveat: "Definition of 'forest' can include commercial plantations depending on the reporting body, sometimes masking real old-growth deforestation.",
    type: "percentage",
  },
  {
    id: "NE.EXP.GNFS.ZS",
    name: "Exports of goods and services (% of GDP)",
    caveat: "High percentages indicate deep integration into the global supply chain but also signify structural vulnerability to global market shocks.",
    type: "percentage",
  },
  {
    id: "BX.KLT.DINV.CD.WD",
    name: "Foreign direct investment, net inflows (BoP)",
    caveat: "Represents net inflows (new investment minus disinvestment). Subject to massive volatility caused by singular mega-deals or sudden geopolitical shifts.",
    type: "absolute",
  }
];

// Provide an easy lookup map for UI rendering context
export const INDICATORS_MAP = INDICATORS.reduce((acc, curr) => {
  acc[curr.id] = curr;
  return acc;
}, {} as Record<string, IndicatorConfig>);

export const TOP_INDICATORS = [
  "NY.GDP.MKTP.CD",      // GDP
  "NY.GDP.PCAP.CD",      // GDP per capita
  "NY.GNS.ICTR.GN.ZS",   // Gross Savings
  "SL.UEM.TOTL.ZS",      // Unemployment
  "SE.PRM.ENRR",         // School enrollment
  "SP.DYN.LE00.IN",      // Life expectancy
  "EG.ELC.ACCS.ZS",      // Electricity access
  "EN.ATM.CO2E.PC",      // CO2 emissions
  "BX.KLT.DINV.CD.WD",   // FDI
  "SP.POP.TOTL"          // Population
];
