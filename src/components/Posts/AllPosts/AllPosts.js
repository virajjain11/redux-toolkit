import { Link } from "react-router-dom";
import PostAuthor from "../Author/PostAuthor";
import PostReactions from "../Reactions/PostReactions";
import PostTime from "../TimeStamp/PostTime";

const AllPosts = ({ post }) => {
  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt">
        {" "}
        {post.body.length > 75 ? `${post.body.substring(0, 75)}...` : post.body}
      </p>
      <p className="postCredit">
        <Link to={`post/${post.id}`}>View Post</Link>
        <PostAuthor userId={post.userId} />
        <PostTime timestamp={post.date} />
      </p>
      <PostReactions post={post} />
    </article>
  );
};

export default AllPosts;
