import { describe, it, expect } from "vitest";
import reducer, { expandEvents, likedEvents } from "../pageSlice";

describe("pageSlice", () => {
  it("expandEvents toggles its flag", () => {
    let state = reducer(undefined, expandEvents());
    expect(state.expandEvents).toBe(true);
    state = reducer(state, expandEvents());
    expect(state.expandEvents).toBe(false);
  });

  it("likedEvents toggles independently of expandEvents", () => {
    const state = reducer(
      { expandEvents: true, likedEvents: false },
      likedEvents()
    );
    expect(state.likedEvents).toBe(true);
    expect(state.expandEvents).toBe(true);
  });
});
