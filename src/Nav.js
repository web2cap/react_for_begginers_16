import { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useStoreState, useStoreActions } from 'easy-peasy'

const Nav = () => {
    const posts = useStoreState((state) => state.posts)
    const search = useStoreState((state) => state.search)
    const setSearch = useStoreActions((actions) => actions.setSearch)
    const setSearchResults = useStoreActions((actions) => actions.setSearchResults)

    useEffect(() => {
        const filterResults = posts.filter(post =>
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase())
        )
        setSearchResults(filterResults.reverse())
    }, [posts, search, setSearchResults])

    return (
        <nav className='Nav'>
            <form className='searchForm'
                onSubmit={(e) => e.preventDefault()}>
                <label htmlFor='search'>Search Post</label>
                <input
                    id='search'
                    type='text'
                    placeholder='Search Post'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </form>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/post">New post</Link></li>
                <li><Link to="/about">About</Link></li>
            </ul>
        </nav>
    )
}

export default Nav