import { useSelector } from "react-redux";
import { allPosts, postStatus, error } from "../../redux/postsSlice";

import AllPosts from "./AllPosts/AllPosts";

const PostLists = () => {
  const posts = useSelector(allPosts);
  const status = useSelector(postStatus);
  const errorStatus = useSelector(error);

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
