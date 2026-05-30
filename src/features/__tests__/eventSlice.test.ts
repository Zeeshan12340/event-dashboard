import { describe, it, expect } from "vitest";
import reducer, {
  eUpdate,
  eLike,
  eOpen,
  eClose,
  eClear,
  Event,
} from "../eventSlice";

const sample: Event[] = [
  {
    title: "Magic Mike Live",
    start: "2025-01-16T21:30:00Z",
    timezone: "Europe/London",
    entities: {},
    description: "A show",
  },
  {
    title: "SIX The Musical",
    start: "2025-01-16T20:00:00Z",
    timezone: "Europe/London",
    entities: {},
    description: "Another show",
  },
];

describe("eventSlice", () => {
  it("eUpdate replaces the event list", () => {
    const state = reducer(undefined, eUpdate(sample));
    expect(state.value).toHaveLength(2);
    expect(state.value[0].title).toBe("Magic Mike Live");
  });

  it("eLike toggles the liked flag for the given index", () => {
    let state = reducer({ value: sample }, eLike(0));
    expect(state.value[0].liked).toBe(true);
    state = reducer(state, eLike(0));
    expect(state.value[0].liked).toBe(false);
  });

  it("eOpen and eClose set the open flag", () => {
    let state = reducer({ value: sample }, eOpen(1));
    expect(state.value[1].open).toBe(true);
    state = reducer(state, eClose(1));
    expect(state.value[1].open).toBe(false);
  });

  it("eClear resets to a single empty placeholder event", () => {
    const state = reducer({ value: sample }, eClear());
    expect(state.value).toHaveLength(1);
    expect(state.value[0].title).toBe("");
  });
});
