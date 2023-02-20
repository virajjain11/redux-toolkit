import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./redux/store";
import "./index.css";
import { fetchUsers } from "./redux/usersSlice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { fetchPosts } from "./redux/postsSliceActions";
// import {}

store.dispatch(fetchUsers());
store.dispatch(fetchPosts());
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
  </Provider>
);
