import React from "react";
import { useSelector } from "react-redux";
import { allPosts } from "../../redux/postsSlice";

const PostLists = () => {
  const posts = useSelector(allPosts);
  const Posts = posts?.map((post) => {
    return (
      <>
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}</p>
        </article>
      </>
    );
  });
  return (
    <section>
      <h3>Posts</h3>
      {Posts}
    </section>
  );
};

export default PostLists;
