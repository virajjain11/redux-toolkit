import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { postById } from "../../../redux/postsSlice";
import PostAuthor from "../Author/PostAuthor";
import PostReactions from "../Reactions/PostReactions";
import PostTime from "../TimeStamp/PostTime";

const IndividualPost = () => {
  const { postId } = useParams();
  const post = useSelector((state) => postById(state, +postId));

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  return (
    <article>
      <h2>{post.title}</h2>
      <p className="excerpt"> {post.body}</p>
      <p className="postCredit">
        <Link to={`/post/edit/${post.id}`}>Edit Post </Link>
        <PostAuthor userId={post.userId} />
        <PostTime timestamp={post.date} />
      </p>
      <PostReactions post={post} />
    </article>
  );
};

export default IndividualPost;
