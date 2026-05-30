import { NextResponse } from "next/server";
import staticCount from "@/app/eventsCount.json";

const PREDICTHQ_COUNT_URL = "https://api.predicthq.com/v1/events/count/";
const SAVED_LOCATION_ID = "yoiyb0gPGMHUGkfX0M80Fw";

/**
 * Returns the total event count from PredictHQ, falling back to the bundled
 * sample count when no key is configured or the upstream call fails.
 */
export async function GET() {
  const apiKey = process.env.PREDICTHQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ count: staticCount.count, source: "static" });
  }

  try {
    const response = await fetch(
      `${PREDICTHQ_COUNT_URL}?saved_location.location_id=${SAVED_LOCATION_ID}`,
      { headers: { Authorization: `Bearer ${apiKey}` } }
    );

    if (!response.ok) {
      throw new Error(`PredictHQ responded with ${response.status}`);
    }

    const json = await response.json();
    return NextResponse.json({ count: json.count, source: "api" });
  } catch (error) {
    console.error("Falling back to static count:", error);
    return NextResponse.json({ count: staticCount.count, source: "static" });
  }
}
