import { NextRequest, NextResponse } from "next/server";
import staticResults from "@/app/results.json";

const PREDICTHQ_EVENTS_URL = "https://api.predicthq.com/v1/events/";
const SAVED_LOCATION_ID = "yoiyb0gPGMHUGkfX0M80Fw";

/**
 * Proxies event search to PredictHQ using a server-side key so the credential
 * never reaches the browser. When no key is configured (e.g. local/demo) or the
 * upstream call fails (rate limit, network), it degrades gracefully to the
 * bundled sample data instead of erroring.
 */
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q") ?? "";
  const apiKey = process.env.PREDICTHQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ results: staticResults, source: "static" });
  }

  try {
    const url = `${PREDICTHQ_EVENTS_URL}?saved_location.location_id=${SAVED_LOCATION_ID}&q=${encodeURIComponent(
      query
    )}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${apiKey}` },
    });

    if (!response.ok) {
      throw new Error(`PredictHQ responded with ${response.status}`);
    }

    const json = await response.json();
    return NextResponse.json({ results: json.results ?? [], source: "api" });
  } catch (error) {
    console.error("Falling back to static events:", error);
    return NextResponse.json({
      results: staticResults,
      source: "static",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
