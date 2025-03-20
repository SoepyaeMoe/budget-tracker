import { useState } from "react";
import { MdLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";

const Nav = () => {

    const isDarkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [theme, setTheme] = useState(isDarkMode ? 'dark' : 'light');

    const toggleTheme = () => {
        if (theme === 'dark') {
            document.querySelector('html').setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
            setTheme('light');
        } else {
            document.querySelector('html').setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            setTheme('dark');
        }
    }

    const toggleSidebar = () => {
        const sidebar = document.getElementById('sidebar');
        const isHidden = sidebar.classList.contains('left-[-100%]');

        if (isHidden) {
            sidebar.classList.remove('left-[-100%]');
            sidebar.classList.add('left-0');
        } else {
            sidebar.classList.remove('left-0');
            sidebar.classList.add('left-[-100%]');
        }

    }

    const handleOutsideClick = (event) => {
        const sidebar = document.getElementById('sidebar');
        const menuIcon = document.getElementById('menuIcon');
        if (!sidebar.contains(event.target) && !menuIcon.contains(event.target)) {
            sidebar.classList.remove('left-0');
            sidebar.classList.add('left-[-100%]');
        }
    }
    document.addEventListener('click', handleOutsideClick);

    return (
        <nav className="bg-base-100 w-full py-4 px-4 shadow flex flex-row items-center justify-between">
            <div className="flex gap-2 justify-center items-center">
                <IoMdMenu
                    onClick={toggleSidebar}
                    className="text-base-content cursor-pointer md:hidden" id="menuIcon" />
                <h3 className="text-xl font-semibold text-base-content block">Dashboard</h3>
            </div>
            <div className="text-2xl dark:text-gray-100 text-gray-800 cursor-pointer" onClick={toggleTheme}>
                {theme === 'dark' && <MdLightMode />}
                {theme === 'light' && <MdDarkMode />}
            </div>
        </nav>
    )
}

export default Nav