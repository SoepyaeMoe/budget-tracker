import Nav from "../components/Nav.jsx";
import SideBar from "../components/SideBar";

const Layout = ({ children }) => {
    return (
        <div className="bg-base-300 min-h-screen flex">
            <SideBar />
            <div className="w-full">
                <Nav />
                {children}
            </div>
        </div >
    )
}

export default Layout