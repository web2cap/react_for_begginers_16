
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useStoreActions } from "easy-peasy";

import useAxiosFetch from "./hooks/useAxiosFetch";
import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";


function App() {
  const setPosts = useStoreActions((actions) => actions.setPosts)
  const { data, fetchError, isLoading } = useAxiosFetch(
    'http://localhost:3500/posts'
  )

  useEffect(() => {
    setPosts(data)
  }, [data, setPosts])
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={
          <Home
            isLoading={isLoading}
            fetchError={fetchError}
          />
        } />
        <Route path="post">
          <Route index element={<NewPost />} />
          <Route path=":id" element={<PostPage />} />
          <Route path="edit/:id" element={<EditPost />} />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
