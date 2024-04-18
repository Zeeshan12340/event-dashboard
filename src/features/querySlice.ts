import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
export interface QueryState {
  value: string
}

// Define the initial state using that type
const initialState: QueryState = {
  value: ""
}
// as CounterState

export const querySlice = createSlice({
    name: 'query',
    initialState,
    reducers: {
      qUpdate: (state, action: PayloadAction<string>) => {
        state.value = action.payload
      },
      qClear: (state) => {
        state.value = ""
      }
    }
  })

export const { qUpdate, qClear } = querySlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectQuery = (state: RootState) => state.query.value
export default querySlice.reducer