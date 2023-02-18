import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  allPosts,
  fetchPosts,
  postStatus,
  error,
} from "../../redux/postsSlice";
import AllPosts from "./AllPosts/AllPosts";
import CreatePosts from "./createPosts/CreatePosts";

const PostLists = () => {
  const dispatch = useDispatch();

  const posts = useSelector(allPosts);
  const status = useSelector(postStatus);
  const errorStatus = useSelector(error);

  useEffect(() => {
    if (status === "idle") dispatch(fetchPosts());
  }, [status]);

  // if (status === "loading") return <p>Loading...</p>;
  // if (status === "failed" && errorStatus) return <p>{errorStatus}</p>;

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
  return (
    <section>
      <h3>Posts</h3>
      <CreatePosts />
      {content}
    </section>
  );
};

export default PostLists;
