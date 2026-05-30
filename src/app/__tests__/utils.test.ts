import { describe, it, expect } from "vitest";
import {
  convertToLocalTime,
  formatNumber,
  matchesFilter,
  humanizeCategory,
} from "../utils";
import type { Event } from "@/features/eventSlice";
import type { FilterState } from "@/features/filterSlice";

const event: Event = {
  title: "Magic Mike Live",
  start: "2025-01-16T21:30:00Z",
  timezone: "Europe/London",
  entities: {},
  description: "A show",
  category: "performing-arts",
};

const noFilter: FilterState = { category: "all", from: "", to: "" };

describe("formatNumber", () => {
  it("returns small numbers unchanged", () => {
    expect(formatNumber(42)).toBe(42);
  });

  it("formats thousands with a K suffix", () => {
    expect(formatNumber(1500)).toBe("1.5K");
    expect(formatNumber(36120)).toBe("36.1K");
  });

  it("formats millions and billions", () => {
    expect(formatNumber(2_000_000)).toBe("2M");
    expect(formatNumber(1_000_000_000)).toBe("1B");
  });
});

describe("convertToLocalTime", () => {
  const iso = "2025-01-16T21:30:00Z";

  it("formats the time in the supplied timezone", () => {
    expect(convertToLocalTime(iso, false, "Europe/London")).toBe("9:30 PM");
  });

  it("formats the full date in the supplied timezone", () => {
    expect(convertToLocalTime(iso, true, "Europe/London")).toBe("Thu, Jan 16");
  });
});

describe("matchesFilter", () => {
  it("matches everything with the default filter", () => {
    expect(matchesFilter(event, noFilter)).toBe(true);
  });

  it("filters by category", () => {
    expect(matchesFilter(event, { ...noFilter, category: "performing-arts" })).toBe(true);
    expect(matchesFilter(event, { ...noFilter, category: "comedy" })).toBe(false);
  });

  it("filters by a date range (inclusive)", () => {
    expect(matchesFilter(event, { ...noFilter, from: "2025-01-16" })).toBe(true);
    expect(matchesFilter(event, { ...noFilter, from: "2025-01-17" })).toBe(false);
    expect(matchesFilter(event, { ...noFilter, to: "2025-01-16" })).toBe(true);
    expect(matchesFilter(event, { ...noFilter, to: "2025-01-15" })).toBe(false);
  });
});

describe("humanizeCategory", () => {
  it("title-cases a slug", () => {
    expect(humanizeCategory("performing-arts")).toBe("Performing Arts");
    expect(humanizeCategory("comedy")).toBe("Comedy");
  });
});
