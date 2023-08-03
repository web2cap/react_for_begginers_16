import { useStoreState } from "easy-peasy"

const Footer = () => {
    const date = new Date()
    const postCount = useStoreState((state) => state.postCount)
    return (
        <footer className="Footer">
            <p>
                {postCount
                    ? postCount === 1
                        ? "Only one post"
                        : `${postCount} posts`
                    : "Empty blog"
                }
                | &copy; {date.getFullYear()}</p>
        </footer>
    )
}

export default Footer