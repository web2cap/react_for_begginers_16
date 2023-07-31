import { createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import api from '../api/posts'
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";


const DataContext = createContext({})

export const DataProvider = ({ children }) => {
    const [posts, setPosts] = useState([])
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')
    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')

    const navigate = useNavigate()
    const { width } = useWindowSize()
    const { data, fetchError, isLoading } = useAxiosFetch(
        'http://localhost:3500/posts'
    )

    useEffect(() => {
        setPosts(data)
    }, [data])

    useEffect(() => {
        const filterResults = posts.filter(post =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
        setSearchResults(filterResults.reverse())
    }, [posts, search])

    const handleSubmit = async (e) => {
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
            console.log(allPosts)
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
        <DataContext.Provider value={{
            handleSubmit,
            handleEdit,
            handleDelete,
            isLoading,
            fetchError,
            posts,
            postTitle,
            setPostTitle,
            postBody,
            setPostBody,
            editTitle,
            setEditTitle,
            editBody,
            setEditBody,
            search,
            setSearch,
            searchResults,
            width,
        }}>
            {children}
        </DataContext.Provider>
    )
}

export default DataContext