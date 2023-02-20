import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { initialReactionsState } from "./postsSlice";

let POST_URI = "https://jsonplaceholder.typicode.com/posts";
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  return axios
    .get(POST_URI)
    .then((res) => res.data)
    .catch((err) => err.response);
});
export const addNewPost = createAsyncThunk("posts/addNewPost", async (post) => {
  return axios
    .post(POST_URI, post)
    .then((res) => res.data)
    .catch((err) => err.message);
});

export const updatePost = createAsyncThunk("posts/updatePost", async (post) => {
  const { id } = post;
  return axios
    .put(`${POST_URI}/${id}`, post)
    .then((res) => res.data)
    .catch((err) => err.message);
});

// export const addNewPostReducer = (state, action) => {
//   console.log("hereee", action.payload);
//   action.payload.userId = +action.payload.userId;
//   action.payload.date = new Date().toISOString();
//   action.payload.reactions = initialReactionsState;
//   state.posts.push(action.payload);
// };
export const updatePostReducer = (state, action) => {
  if (!action.payload?.id) {
    console.log("Update could not complete");
    console.log(action.payload);
    return;
  }
  const { id } = action.payload;
  action.payload.date = new Date().toISOString();
  const posts = state.posts.filter((post) => post.id !== id);
  state.posts = [...posts, action.payload];
};
