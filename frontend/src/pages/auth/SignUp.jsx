import { useState } from 'react'
import { Link } from 'react-router'
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../App.jsx';

const SignUp = () => {
    const { setUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({ fullname: '', username: '', password: '', confirm_password: '' });

    const handelInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const handelSingUp = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post('api/auth/signup', formData);
            if (res.status === 201) {
                setUser(res.data);
                toast('Sign Up success', {
                    duration: 4000,
                    position: 'top-right',
                    type: 'success',
                });
            }
        } catch (error) {
            toast(error.response.data.error || 'something went wrong', {
                duration: 4000,
                position: 'top-right',
                type: 'error',
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='h-screen w-full dark:bg-gray-900 bg-gray-200'>
            <div className='flex justify-center items-center h-full' onSubmit={e => handelSingUp(e)}>
                <form className='bg-white w-[350px] dark:bg-gray-800 shadow-md rounded px-8 pt-4 pb-8 mb-4 flex flex-col'>
                    <h4 className='text-center dark:text-gray-400 text-gray-700'>Remember username and password for next login.</h4>
                    <h3 className='text-2xl text-center dark:text-gray-400 text-gray-700 font-bold mb-4'>Sign Up account 😉</h3>
                    <div className='mb-4'>
                        <label className='block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2' htmlFor='fullname'>
                            Full Name
                        </label>
                        <input
                            onChange={(e) => handelInputChange(e)}
                            name='fullname'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline' id='fullname' type='text' placeholder='Full Name' />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2' htmlFor='username'>
                            Username
                        </label>
                        <input
                            onChange={(e) => handelInputChange(e)}
                            name='username'
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline' id='username' type='text' placeholder='Username' />
                    </div>
                    <div className='mb-0'>
                        <label className='block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input
                            onChange={(e) => handelInputChange(e)}
                            name='password'
                            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='******************' />
                    </div>

                    <div className='mb-4'>
                        <label className='block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2' htmlFor='confirm_password'>
                            Confirm Password
                        </label>
                        <input
                            onChange={(e) => handelInputChange(e)}
                            name='confirm_password'
                            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='confirm_password' type='password' placeholder='******************' />
                    </div>

                    <div className='flex items-center justify-center'>
                        <button className='btn-primary min-w-[65px]' type='submit'>
                            {loading ? <span className="loading loading-dots loading-xs"></span> : 'Sign Up'}
                        </button>
                    </div>

                    <div className='flex items-center justify-center mt-4'>
                        <Link to={"/login"} className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800' href='#'>
                            Already have an account? Sign In
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp