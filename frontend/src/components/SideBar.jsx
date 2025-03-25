import { useAuthContext } from "../App.jsx";
import { Link, useLocation, useNavigate } from "react-router";
import axios from "axios";
import toast from 'react-hot-toast';
import ConfirmModal from './modal/ConfirmModal.jsx';


// icons
import { RiHome2Fill } from "react-icons/ri";
import { FaPlusSquare } from "react-icons/fa";
import { FaSquareMinus } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";

const SideBar = () => {
    const { user, setUser } = useAuthContext();
    const location = useLocation();
    const navigate = useNavigate();

    const setActive = (path) => {
        if (location.pathname === path) {
            return 'text-blue-500';
        } else {
            return 'text-gray-700 dark:text-gray-300';
        }
    }

    const logout = () => {
        try {
            axios.post('/api/auth/logout').then(res => {
                if (res.status === 200) {
                    setUser(null);
                    navigate('/login');
                    window.location.reload();
                }
            });
        } catch (error) {
            toast.error('Failed to logout');
        }
    }

    return (
        <div>
            <div className='w-[250px] fixed bg-base-200 h-screen shadow-lg top-0 md:left-0 left-[-100%] z-10 duration-300 ease-linear' id="sidebar">
                <div className="py-4 pl-8 border-b border-base-300">
                    <h3 className="text-2xl dark:text-white text-gray-700 font-semibold">{user.fullname}</h3>
                    <p className="text-sm dark:text-gray-300 text-gray-700">{user.username}</p>
                </div>
                <div className='py-4 pl-8'>
                    <ul>
                        <li className={`py-2 flex items-center gap-2 font-semibold hover:text-blue-500 ${setActive('/')}`}>
                            <RiHome2Fill />
                            <Link to={'/'} >Home</Link>
                        </li>
                        <li className={`py-2 flex items-center gap-2 font-semibold hover:text-blue-500 ${setActive('/income')}`}>
                            <FaPlusSquare />
                            <Link to={'/income'}>Income</Link>
                        </li>
                        <li className={`py-2 flex items-center gap-2 font-semibold hover:text-blue-500 ${setActive('/expense')}`}>
                            <FaSquareMinus />
                            <Link to={'/expense'}>Expense</Link>
                        </li>
                        <li className={`py-2 flex items-center gap-2 font-semibold hover:text-blue-500 ${setActive('/profile')}`}>
                            <IoPersonSharp />
                            <Link to={'/profile'}>Profile</Link>
                        </li>
                    </ul>
                </div>
                <div className='absolute bottom-0 w-full'>
                    <button
                        onClick={() => document.getElementById('logout_confirm_modal').showModal()}
                        className='w-full py-2 text-white bg-blue-500 font-semibold cursor-pointer hover:bg-blue-600'>Logout</button>
                </div>

                <ConfirmModal
                    id={'logout_confirm_modal'}
                    title={'Are you sure?'}
                    description={'You want to logout?'}
                    onConfirm={logout} />
            </div>

            <div className='w-[250px] h-screen hidden md:block'></div>
        </div>
    )
}

export default SideBar