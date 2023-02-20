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
export const deletePost = createAsyncThunk("posts/deletePost", async (post) => {
  return axios
    .delete(`${POST_URI}/${post.id}`)
    .then((res) => {
      console.log("dddddd", res?.status, res);
      return res?.status === 200 ? post : `${res.status}: ${res.statusText}`;
    })
    .catch((err) => err.message);
});

export const deletePostReducer = (state, action) => {
  if (!action.payload?.id) {
    console.log("Delete could not complete");
    console.log(action.payload);
    return;
  }

  const { id } = action.payload;
  action.payload.date = new Date().toISOString();
  const posts = state.posts.filter((post) => post.id !== id);
  state.posts = posts;
};
