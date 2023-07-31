import { useEffect, useContext, useState } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"

import api from './api/posts'
import DataContext from './context/DataContext'

const EditPost = () => {
    const { posts, setPosts } = useContext(DataContext)

    const [editTitle, setEditTitle] = useState('')
    const [editBody, setEditBody] = useState('')

    const navigate = useNavigate()
    const { id } = useParams()
    const post = posts.find(post => (post.id).toString() === id)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

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

    return (
        <main className='NewPost'>
            {editTitle &&
                <>
                    <h2>Edit Post</h2>
                    <form
                        className='newPostForm'
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <label htmlFor='postTitle'>Title:</label>
                        <input
                            id='postTitle'
                            type='text'
                            required
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                        />
                        <label htmlFor='postBody'>Post:</label>
                        <textarea
                            id='postBody'
                            required
                            value={editBody}
                            onChange={(e) => setEditBody(e.target.value)}
                        />
                        <button
                            type='submit'
                            onClick={() => handleEdit(post.id)}
                        > Submit</button>
                    </form>
                </>
            }
            {!editTitle &&
                <>
                    <h2>Post not found</h2>
                    <p>
                        <Link to="/">Homepage</Link>
                    </p>
                </>
            }
        </main >
    )
}
export default EditPost