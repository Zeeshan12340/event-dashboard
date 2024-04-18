import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

// Define a type for event
type Event = [{
  id: string;
  title: string;
  description: string;
  timezone: string;
}]

// Define a type for the slice state
export interface EventState {
  value: Event;
}

// Define the initial state using that type
const initialState: EventState = {
  value: [{
    id: "",
    title: "",
    description: "",
    timezone: "",
  }],
};
// as CounterState

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    eUpdate: (state, action: PayloadAction<Event>) => {
      state.value = action.payload;
    },
    eClear: (state) => {
      state.value = [{
        id: "",
        title: "",
        description: "",
        timezone: "",
      }];
    },
  },
});

export const { eUpdate, eClear } = eventSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectEvents = (state: RootState) => state.event.value;
export default eventSlice.reducer;
