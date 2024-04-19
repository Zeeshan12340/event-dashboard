import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

interface entity {
  entity_id: string;
  name: string;
  type: string;
  formatted_address: string;
}
export interface entities {
  [key: number]: entity;
}

// Define a type for event
type Event = [
  {
    title: string;
    start: string;
    timezone: string;
    entities: entities;
  }
];

// Define a type for the slice state
export interface EventState {
  value: Event;
}

// Define the initial state using that type
const initialState: EventState = {
  value: [
    {
      title: "",
      start: "",
      timezone: "",
      entities: {},
    },
  ],
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
      state.value = [
        {
          title: "",
          start: "",
          timezone: "",
          entities: {},
        },
      ];
    },
  },
});

export const { eUpdate, eClear } = eventSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectEvents = (state: RootState) => state.event.value;
export default eventSlice.reducer;
