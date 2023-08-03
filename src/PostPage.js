import { useParams, Link, useNavigate } from "react-router-dom"
import { useStoreState, useStoreActions } from "easy-peasy"


const PostPage = () => {
    const { id } = useParams()
    const deletePost = useStoreActions((actions) => actions.deletePost)
    const getPostById = useStoreState((state) => state.getPostById)
    const post = getPostById(id)

    const navigate = useNavigate()

    const handleDelete = (id) => {
        deletePost(id)
        navigate('/')
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