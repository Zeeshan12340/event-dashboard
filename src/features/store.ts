import { configureStore } from '@reduxjs/toolkit'
import queryReducer from '../features/querySlice'
import eventReducer from '../features/eventSlice'
import pageReducer from '../features/pageSlice'

export const store = configureStore({
  reducer: {
    query: queryReducer,
    event: eventReducer,
    page: pageReducer,
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch