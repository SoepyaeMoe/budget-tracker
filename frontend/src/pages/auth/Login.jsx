import { useState } from 'react';
import { Link } from 'react-router';
import axios from "axios";
import { toast } from 'react-hot-toast';
import { useAuthContext } from '../../App.jsx';

const Login = () => {
    const { setUser } = useAuthContext();
    const [loading, setLoading] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            return toast('Please provide in all fields.', {
                duration: 4000,
                position: 'top-right',
                type: 'error',
            });
        }

        try {
            setLoading(true);
            const res = await axios.post('api/auth/login', { username, password });
            if (res.status === 200) {
                setUser(res.data);
                toast('Login success', {
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
            <div className='flex justify-center items-center h-full'>
                <form onSubmit={handleLogin} className='bg-white w-[350px] dark:bg-gray-800 shadow-md rounded px-8 pt-4 pb-8 mb-4 flex flex-col'>
                    <h4 className='text-center dark:text-gray-400 text-gray-700'>Login your account.</h4>
                    <h3 className='text-2xl text-center dark:text-gray-400 text-gray-700 font-bold mb-4'>Welcome Back 😄</h3>
                    <div className='mb-4'>
                        <label className='block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2' htmlFor='username'>
                            Username
                        </label>
                        <input
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 leading-tight focus:outline-none focus:shadow-outline' id='username' type='text' placeholder='Username' />
                    </div>
                    <div className='mb-6'>
                        <label className='block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2' htmlFor='password'>
                            Password
                        </label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 dark:text-gray-200 mb-3 leading-tight focus:outline-none focus:shadow-outline' id='password' type='password' placeholder='******************' />
                    </div>

                    <div className='flex items-center justify-center'>
                        <button
                            type='submit'
                            className='btn-primary min-w-[65px] h-10'>
                            {loading ? <span className="loading loading-dots loading-xs"></span> : 'Sign In'}
                        </button>
                    </div>

                    <div className='flex items-center justify-center mt-4'>
                        <Link to={"/signup"} className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800' href='#'>
                            Don't have an account? Sign Up
                        </Link>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login