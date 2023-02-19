import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allPosts, postStatus, error } from "../../redux/postsSlice";
import { fetchPosts } from "../../redux/postsSliceActions";
import AllPosts from "./AllPosts/AllPosts";

const PostLists = () => {
  const dispatch = useDispatch();

  const posts = useSelector(allPosts);
  const status = useSelector(postStatus);
  const errorStatus = useSelector(error);

  useEffect(() => {
    if (status === "idle") dispatch(fetchPosts());
  }, [status, dispatch]);

  let content;
  if (status === "loading") content = <p>Loading...</p>;
  else if (status === "failed" && errorStatus) content = <p>{errorStatus}</p>;
  else {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date));
    content = orderedPosts?.map((post) => (
      <AllPosts post={post} key={post.id} />
    ));
  }
  return <section>{content}</section>;
};

export default PostLists;
