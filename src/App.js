import "./App.css";
import Counter from "./components/Counter/Counter";
import PostLists from "./components/Posts/PostLists";
import CreatePosts from "./components/Posts/createPosts/CreatePosts";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/UI/Layout";
import IndividualPost from "./components/Posts/IndividualPostDetails/IndividualPost";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<PostLists />} />

        <Route path="post">
          <Route index element={<CreatePosts />} />
          <Route path=":postId" element={<IndividualPost />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
