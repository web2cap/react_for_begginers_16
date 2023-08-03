import { useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'


const NewPost = () => {
    const posts = useStoreState((state) => state.posts)
    const postTitle = useStoreState((state) => state.postTitle)
    const setPostTitle = useStoreActions((actions) => actions.setPostTitle)
    const postBody = useStoreState((state) => state.postBody)
    const setPostBody = useStoreActions((actions) => actions.setPostBody)
    const savePost = useStoreActions((actions) => actions.savePost)

    const navigate = useNavigate()

    const handleSubmit = (e) => {
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
        savePost(newPost)
        navigate(`/post/${id}`)
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