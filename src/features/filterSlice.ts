import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./store";

// Define a type for the slice state
export interface FilterState {
  category: string; // "all" or a category value such as "performing-arts"
  from: string; // yyyy-mm-dd, or "" for no lower bound
  to: string; // yyyy-mm-dd, or "" for no upper bound
}

// Define the initial state using that type
const initialState: FilterState = {
  category: "all",
  from: "",
  to: "",
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setDateFrom: (state, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    setDateTo: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
    clearFilters: () => initialState,
  },
});

export const { setCategory, setDateFrom, setDateTo, clearFilters } =
  filterSlice.actions;

export const selectFilter = (state: RootState) => state.filter;
export default filterSlice.reducer;
