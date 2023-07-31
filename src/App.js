
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";


import Layout from "./Layout";
import Home from "./Home";
import NewPost from "./NewPost";
import EditPost from "./EditPost";
import PostPage from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import api from './api/posts'
import useWindowSize from "./hooks/useWindowSize";

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')

  const navigate = useNavigate()
  const { width } = useWindowSize()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch (err) {
        err.response
          ? console.log(err.response.status)
          : console.log(err.message)
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const filterResults = posts.filter(post =>
      ((post.body).toLowerCase()).includes(search.toLowerCase())
      || ((post.title).toLowerCase()).includes(search.toLowerCase())
    )
    setSearchResults(filterResults.reverse())
  }, [posts, search])


  const handleSubmit = async (e) => {
    console.log("Edit")
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 10
    const datetime = new Date()
    const formattedDate = datetime.toLocaleDateString('en-GB')
    const newPost = {
      id,
      title: postTitle,
      datetime: formattedDate,
      body: postBody
    }
    try {
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate(`/post/${id}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleEdit = async (id) => {
    const datetime = new Date()
    const formattedDate = datetime.toLocaleDateString('en-GB')
    const updatePost = {
      id,
      title: editTitle,
      datetime: formattedDate,
      body: editBody
    }
    try {
      const response = await api.put(`/posts/${id}`, updatePost)
      const updatedPosts = posts.map(
        post => post.id === id ? { ...response.data } : post
      )
      setPosts(updatedPosts)
      setEditTitle('')
      setEditBody('')
      navigate(`/post/${id}`)
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`/posts/${id}`)
      const postsList = posts.filter(post => post.id !== id)
      setPosts(postsList)
      navigate('/')
    } catch (err) {
      console.log(err.message)
    }

  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout
            search={search}
            setSearch={setSearch}
            width={width}
          />
        }
      >
        <Route index element={<Home posts={searchResults} />} />
        <Route path="post">
          <Route
            index
            element={<NewPost
              handleSubmit={handleSubmit}
              postTitle={postTitle}
              setPostTitle={setPostTitle}
              postBody={postBody}
              setPostBody={setPostBody}
            />}
          />
          <Route
            path=":id"
            element={<PostPage
              posts={posts}
              handleDelete={handleDelete}
            />}
          />
          <Route
            path="edit/:id"
            element={<EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />}
          />
        </Route>

        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
