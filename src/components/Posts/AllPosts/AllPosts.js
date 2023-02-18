import PostAuthor from "../Author/PostAuthor";
import PostReactions from "../Reactions/PostReactions";
import PostTime from "../TimeStamp/PostTime";

const AllPosts = ({ post }) => {
  return (
    <article>
      <h3>{post.title}</h3>
      <p>{post.body.substring(0, 100)}</p>
      <p className="postCredit">
        <PostAuthor userId={post.userId} />
        <PostTime timestamp={post.date} />
        <PostReactions post={post} />
      </p>
    </article>
  );
};

export default AllPosts;
