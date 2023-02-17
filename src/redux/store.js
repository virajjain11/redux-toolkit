import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import postsReducer from "./postsSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    posts: postsReducer,
  },
});
