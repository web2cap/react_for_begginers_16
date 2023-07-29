import { Outlet } from 'react-router-dom';

import Header from './Header'
import Nav from './Nav'
import Footer from "./Footer";

const Layout = () => {
    return (
        <div className="App">
            <Header />
            <Nav />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout