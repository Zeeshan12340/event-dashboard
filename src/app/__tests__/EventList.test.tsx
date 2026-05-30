import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "@/features/querySlice";
import eventReducer, { Event } from "@/features/eventSlice";
import pageReducer from "@/features/pageSlice";
import filterReducer, { setCategory, clearFilters } from "@/features/filterSlice";
import EventList from "../EventList";

const events: Event[] = [
  {
    title: "Magic Mike Live",
    start: "2025-01-16T21:30:00Z",
    timezone: "Europe/London",
    entities: {},
    description: "x",
    category: "performing-arts",
  },
  {
    title: "Laugh Night",
    start: "2025-01-16T20:00:00Z",
    timezone: "Europe/London",
    entities: {},
    description: "y",
    category: "comedy",
  },
];

async function setup() {
  const store = configureStore({
    reducer: {
      query: queryReducer,
      event: eventReducer,
      page: pageReducer,
      filter: filterReducer,
    },
    preloadedState: {
      event: { value: events },
      query: { value: "x", finished: true, error: null },
    },
  });
  // Wrap render so the async count fetch resolves inside act().
  await act(async () => {
    render(
      <Provider store={store}>
        <EventList />
      </Provider>
    );
  });
  return store;
}

beforeEach(() => {
  vi.stubGlobal(
    "fetch",
    vi.fn().mockResolvedValue({ ok: true, json: async () => ({ count: 100 }) })
  );
});

describe("EventList filtering", () => {
  it("shows every event when no category filter is active", async () => {
    await setup();
    expect(screen.getByText("Magic Mike Live")).toBeInTheDocument();
    expect(screen.getByText("Laugh Night")).toBeInTheDocument();
  });

  it("filters by the selected category and restores on clear", async () => {
    const store = await setup();

    act(() => {
      store.dispatch(setCategory("comedy"));
    });
    expect(screen.queryByText("Magic Mike Live")).not.toBeInTheDocument();
    expect(screen.getByText("Laugh Night")).toBeInTheDocument();

    act(() => {
      store.dispatch(clearFilters());
    });
    expect(screen.getByText("Magic Mike Live")).toBeInTheDocument();
    expect(screen.getByText("Laugh Night")).toBeInTheDocument();
  });
});
