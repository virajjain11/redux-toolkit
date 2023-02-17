import React from "react";
import { useSelector } from "react-redux";
import { allPosts } from "../../redux/postsSlice";
import PostAuthor from "./Author/PostAuthor";
import CreatePosts from "./createPosts/CreatePosts";
import PostReactions from "./Reactions/PostReactions";
import PostTime from "./TimeStamp/PostTime";

const PostLists = () => {
  const posts = useSelector(allPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const Posts = orderedPosts?.map((post) => {
    return (
      <>
        <article key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content.substring(0, 100)}</p>
          <p className="postCredit">
            <PostAuthor userId={post.userId} />
            <PostTime timestamp={post.date} />
            <PostReactions post={post} />
          </p>
        </article>
      </>
    );
  });
  return (
    <section>
      <h3>Posts</h3>
      <CreatePosts />
      {Posts}
    </section>
  );
};

export default PostLists;
