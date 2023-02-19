import "./App.css";
// import Counter from "./components/Counter/Counter";
import PostLists from "./components/Posts/PostLists";
// import CreatePosts from "./components/Posts/Forms/CreatePosts";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import IndividualPost from "./components/Posts/IndividualPostDetails/IndividualPost";
import CreatePost from "./components/Posts/Forms/CreatePost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostLists />} />
        <Route path="post">
          <Route index element={<CreatePost />} />
          <Route path=":postId" element={<IndividualPost />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
