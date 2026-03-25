import { NextRequest, NextResponse } from "next/server";
import { getMergedChartData } from "@/lib/data-merger";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const indicator = searchParams.get("indicator");
  const countries = searchParams.get("countries");
  const startYear = parseInt(searchParams.get("startYear") || "1976", 10);
  const endYear = parseInt(searchParams.get("endYear") || "2024", 10);

  if (!indicator || !countries) {
    return NextResponse.json(
      { error: "Missing required params: indicator, countries" },
      { status: 400 }
    );
  }

  const countryCodes = countries.split(",").map((c) => c.trim());

  try {
    const data = await getMergedChartData(indicator, countryCodes, startYear, endYear);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching indicator data:", error);
    return NextResponse.json(
      { error: "Failed to fetch indicator data" },
      { status: 500 }
    );
  }
}
