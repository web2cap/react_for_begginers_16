import { useContext } from 'react'
import { useParams, Link, useNavigate } from "react-router-dom"

import api from './api/posts'
import DataContext from './context/DataContext'

const PostPage = () => {
    const { posts, setPosts } = useContext(DataContext)
    const { id } = useParams()

    const navigate = useNavigate()

    const post = posts.find(post => (post.id).toString() === id)

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
        <main className="PostPage">
            <article className="post">
                {post &&
                    <>
                        <h2>{post.title}</h2>
                        <p className="postDate">{post.datetime}</p>
                        <p className="postBody">{post.body}</p>
                        <Link to={`/post/edit/${post.id}`}>
                            <button className="editButton">Edit post</button></Link>
                        <button className="deleteButton" onClick={() => handleDelete(post.id)}>
                            Delete post
                        </button>
                    </>
                }
                {!post &&
                    <>
                        <h2>Post not found</h2>
                        <p><Link to='/'>Homepage</Link></p>

                    </>
                }
            </article>
        </main>
    )
}

export default PostPage