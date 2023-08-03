import { useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import { useStoreActions, useStoreState } from "easy-peasy"

const EditPost = () => {
    const { id } = useParams()
    const editTitle = useStoreState((state) => state.editTitle)
    const setEditTitle = useStoreActions((actions) => actions.setEditTitle)
    const editBody = useStoreState((state) => state.editBody)
    const setEditBody = useStoreActions((actions) => actions.setEditBody)
    const editPost = useStoreActions((actions) => actions.editPost)
    const getPostById = useStoreState((state) => state.getPostById)

    const navigate = useNavigate()
    const post = getPostById(id)

    useEffect(() => {
        if (post) {
            setEditTitle(post.title)
            setEditBody(post.body)
        }
    }, [post, setEditTitle, setEditBody])

    const handleEdit = (id) => {
        const datetime = new Date()
        const formattedDate = datetime.toLocaleDateString('en-GB')
        const updatePost = {
            id,
            title: editTitle,
            datetime: formattedDate,
            body: editBody
        }
        editPost(updatePost)
        navigate(`/post/${id}`)
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
                            type='button'
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