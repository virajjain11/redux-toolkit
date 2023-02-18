import {
  createAsyncThunk,
  createSlice,
  current,
  nanoid,
} from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";
const initialReactionsState = {
  thumbsUp: 0,
  wow: 0,
  heart: 0,
  rocket: 0,
  coffee: 0,
};
// const initialState = [
//   {
//     id: "1",
//     title: "Learning Redux Toolkit",
//     content: "I've heard good things.",
//     date: sub(new Date(), { minutes: 10 }).toISOString(),
//     reactions: initialReactionsState,
//   },
//   {
//     id: "2",
//     title: "Slices...",
//     content: "The more I say slice, the more I want pizza.",
//     date: sub(new Date(), { minutes: 5 }).toISOString(),
//     reactions: initialReactionsState,
//   },
// ];
const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

let POST_URI = "https://jsonplaceholder.typicode.com/posts";
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return axios
    .get(POST_URI)
    .then((res) => res.data)
    .catch((err) => err.response);
});

const postSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    createPost: {
      reducer: (state, action) => {
        console.log("first", current(state));
        state.posts.push(action.payload);
        console.log("second", current(state));
      },
      prepare: ({ title, content, userId }) => {
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
      const findPostsById = state.posts.find((post) => post.id === postId);

      if (findPostsById) {
        // updating the state
        findPostsById.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        console.log("ddddddd", action);
        state.status = "success";
        let min = 1;
        const modifiedPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = initialReactionsState;
          return post;
        });

        state.posts = state.posts.concat(modifiedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { createPost, addReactions } = postSlice.actions;
export const allPosts = (state) => state.posts.posts;
export const postStatus = (state) => state.posts.status;
export const error = (state) => state.posts.error;
export default postSlice.reducer;
