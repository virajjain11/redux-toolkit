import { nanoid } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { createPost } from "../../../redux/postsSlice";
import { addNewPost } from "../../../redux/postsSliceActions";
import { users } from "../../../redux/usersSlice";

const CreatePosts = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState("");
  const [addReqStatus, setAddReqStatus] = useState("idle");

  const usersList = useSelector(users);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  const onAuthorChanged = (e) => setUserId(e.target.value);

  const canSave =
    [title, content, userId].every(Boolean) && addReqStatus === "idle";
  const savePost = () => {
    if (canSave) {
      try {
        setAddReqStatus("pending");
        setTitle("");
        setContent("");
        setUserId("");
        dispatch(addNewPost({ title, body: content, userId })).unwrap();
      } catch (error) {
        console.error("post not added", error.message);
      } finally {
        setAddReqStatus("idle");
      }
    }
  };
  // const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const usersOptions = usersList.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {usersOptions}
        </select>
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <button type="button" onClick={savePost} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default CreatePosts;
