export function convertToLocalTime(
  isoString: string,
  fullDate: boolean = false,
  timeZone?: string
) {
  const date = new Date(isoString);

  // When a timeZone is supplied (e.g. the event's own timezone) the value is
  // rendered in that zone; otherwise it falls back to the viewer's local time.
  const zoneOptions = timeZone ? { timeZone } : {};

  if (fullDate) {
    return new Intl.DateTimeFormat("en-US", {
      ...zoneOptions,
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(date);
  }

  return new Intl.DateTimeFormat("en-US", {
    ...zoneOptions,
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  }).format(date);
}

import type { Event } from "@/features/eventSlice";
import type { FilterState } from "@/features/filterSlice";

/**
 * Returns true when an event satisfies the active category and date-range
 * filter. An empty/"all" filter value matches everything.
 */
export function matchesFilter(event: Event, filter: FilterState): boolean {
  if (filter.category !== "all" && event.category !== filter.category) {
    return false;
  }
  if (event.start) {
    const day = event.start.slice(0, 10); // yyyy-mm-dd
    if (filter.from && day < filter.from) return false;
    if (filter.to && day > filter.to) return false;
  }
  return true;
}

/** Turns a raw category slug like "performing-arts" into "Performing Arts". */
export function humanizeCategory(category: string): string {
  return category
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatNumber(num: number) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num;
}
