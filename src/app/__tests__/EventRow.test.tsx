import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import queryReducer from "@/features/querySlice";
import eventReducer, { Event } from "@/features/eventSlice";
import pageReducer from "@/features/pageSlice";
import EventRow from "../EventRow";

const event: Event = {
  title: "Magic Mike Live",
  start: "2025-01-16T21:30:00Z",
  timezone: "Europe/London",
  entities: { 0: { entity_id: "1", name: "Hippodrome Casino", type: "venue", formatted_address: "" } },
  description: "A show",
};

function renderRow() {
  const store = configureStore({
    reducer: { query: queryReducer, event: eventReducer, page: pageReducer },
    preloadedState: {
      event: { value: [event] },
    },
  });
  render(
    <Provider store={store}>
      <EventRow event={store.getState().event.value[0]} index={0} />
    </Provider>
  );
  return store;
}

describe("EventRow", () => {
  it("renders the event title, time and location", () => {
    renderRow();
    expect(screen.getByText("Magic Mike Live")).toBeInTheDocument();
    expect(screen.getByText("9:30 PM")).toBeInTheDocument();
    expect(screen.getByText("Hippodrome Casino")).toBeInTheDocument();
  });

  it("toggles the favourite state via the accessible button", async () => {
    const store = renderRow();
    const button = screen.getByRole("button", { name: "Add to favourites" });
    expect(button).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(button);

    expect(store.getState().event.value[0].liked).toBe(true);
  });
});
