import { describe, it, expect } from "vitest";
import reducer, { qUpdate, qClear, qFinish, qError } from "../querySlice";

describe("querySlice", () => {
  it("qUpdate sets the search value", () => {
    const state = reducer(undefined, qUpdate("jazz"));
    expect(state.value).toBe("jazz");
  });

  it("qClear empties the search value", () => {
    const state = reducer(
      { value: "jazz", finished: true, error: null },
      qClear()
    );
    expect(state.value).toBe("");
  });

  it("qFinish toggles the finished flag", () => {
    const state = reducer(undefined, qFinish(true));
    expect(state.finished).toBe(true);
  });

  it("qError sets and clears the error", () => {
    let state = reducer(undefined, qError("boom"));
    expect(state.error).toBe("boom");
    state = reducer(state, qError(null));
    expect(state.error).toBeNull();
  });
});
