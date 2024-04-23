import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
export interface PageState {
  expandEvents: boolean;
  likedEvents: boolean;
}

// Define the initial state using that type
const initialState: PageState = {
  expandEvents: false,
  likedEvents: false,
};
// as CounterState

export const pageSlice = createSlice({
  name: "page",
  initialState,
  reducers: {
    expandEvents: (state) => {
      state.expandEvents = !state.expandEvents;
    },
    likedEvents: (state) => {
      state.likedEvents = !state.likedEvents;
    },
  },
});

export const { expandEvents, likedEvents } = pageSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPage = (state: RootState) => state.page;
export default pageSlice.reducer;
