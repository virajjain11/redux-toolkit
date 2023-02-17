import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./counterSlice";
import postsReducer from "./postsSlice";
import usersReducer from "./usersSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    posts: postsReducer,
    users: usersReducer,
  },
});
