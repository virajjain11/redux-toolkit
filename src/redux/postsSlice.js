import { createSlice, current, nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
const initialReactionsState = {
  thumbsUp: 0,
  wow: 0,
  heart: 0,
  rocket: 0,
  coffee: 0,
};
const initialState = [
  {
    id: "1",
    title: "Learning Redux Toolkit",
    content: "I've heard good things.",
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: initialReactionsState,
  },
  {
    id: "2",
    title: "Slices...",
    content: "The more I say slice, the more I want pizza.",
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: initialReactionsState,
  },
];
const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: {
      reducer(state, action) {
        console.log("first", current(state));
        state.push(action.payload);
        console.log("second", current(state));
      },
      prepare({ title, content, userId }) {
        return {
          payload: {
            id: nanoid(),
            title,
            content,
            userId,
            date: new Date().toISOString(),
            reactions: initialReactionsState,
          },
        };
      },
    },
    addReactions(state, action) {
      const { postId, reaction } = action.payload;
      const findPostsById = state.find((post) => post.id === postId);

      if (findPostsById) {
        // updating the state
        findPostsById.reactions[reaction]++;
      }
    },
  },
});

export const { createPost, addReactions } = postSlice.actions;
export const allPosts = (state) => state.posts;
export default postSlice.reducer;
