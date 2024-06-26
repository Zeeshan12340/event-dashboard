import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
export interface QueryState {
  value: string;
  finished: boolean;
}

// Define the initial state using that type
const initialState: QueryState = {
  value: "web development",
  finished: false,
};
// as CounterState

export const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    qUpdate: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    qClear: (state) => {
      state.value = "";
    },
    qFinish: (state, action: PayloadAction<boolean>) => {
      state.finished = action.payload;
    }
  },
});

export const { qUpdate, qClear, qFinish } = querySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectQuery = (state: RootState) => state.query.value;
export default querySlice.reducer;
