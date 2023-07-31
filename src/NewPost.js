import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import api from './api/posts'
import DataContext from './context/DataContext'

const NewPost = () => {
    const { posts, setPosts } = useContext(DataContext)

    const [postTitle, setPostTitle] = useState('')
    const [postBody, setPostBody] = useState('')

    const navigate = useNavigate()

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
            setPostTitle('')
            setPostBody('')
            navigate(`/post/${id}`)
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <main className='NewPost'>
            <h2>NewPost</h2>
            <form className='newPostForm' onSubmit={handleSubmit} >
                <label htmlFor='postTitle'>Title:</label>
                <input
                    id='postTitle'
                    type='text'
                    required
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                />
                <label htmlFor='postBody'>Post:</label>
                <textarea
                    id='postBody'
                    required
                    value={postBody}
                    onChange={(e) => setPostBody(e.target.value)}
                />
                <button type='submit'>Submit</button>
            </form>
        </main>
    )
}

export default NewPost