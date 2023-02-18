import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
