import { useState } from 'react';
import Layout from '../Layout.jsx';
import { useAuthContext } from '../../App.jsx';
import AccountDeleteConfirmModal from '../../components/modal/AccountDeleteConfirmModal.jsx';
import axios from 'axios';
import toast from 'react-hot-toast';


const Profile = () => {

    const { user } = useAuthContext();
    const [username, setUsername] = useState(user.username);
    const [fullname, setFullname] = useState(user.fullname);

    const [accountLoading, setAccountLoading] = useState(false);
    const [changePasswordLoading, setChangePasswordLoading] = useState(false);

    const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === 'fullname') {
            setFullname(value);
        } else if (name === 'username') {
            setUsername(value);
        }
    }

    const handleAccountUpdate = async () => {
        try {
            setAccountLoading(true);
            const res = await axios.put('/api/auth/user', { fullname, username });
            if (res.status === 200) {
                toast('Account updated', {
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
            setAccountLoading(false);
        }
    }

    const restForm = () => {
        setFullname(user.fullname);
        setUsername(user.username);
    }

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordForm({ ...passwordForm, [name]: value });
    }

    const changePassword = async () => {
        try {
            setChangePasswordLoading(true);
            const res = await axios.post('/api/auth/change-password', passwordForm);
            if (res.status === 200) {
                toast('Password updated', {
                    duration: 4000,
                    position: 'top-right',
                    type: 'success',
                });
                setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
            }
        } catch (error) {
            toast(error.response.data.error || 'something went wrong', {
                duration: 4000,
                position: 'top-right',
                type: 'error',
            });
        } finally {
            setChangePasswordLoading(false);
        }
    }


    return (
        <Layout>
            <div className='m-4 bg-base-100 rounded-sm py-1'>
                <div className='m-4'>
                    <h2 className='text-lg font-bold mb-4'>Account</h2>
                    <div className=''>
                        <div className='flex flex-col gap-2'>
                            <label className="input">
                                <span className="label">Full Name</span>
                                <input
                                    onChange={handleInputChange}
                                    type="text" name='fullname' className='font-semibold' placeholder="Full Name" value={fullname} />
                            </label>
                            <label className="input">
                                <span className="label">Username</span>
                                <input
                                    onChange={handleInputChange}
                                    type="text" name='username' className='font-semibold' placeholder="Username" value={username} />
                            </label>
                        </div>
                        <button className='btn-primary mt-3 min-w-[65px]' onClick={handleAccountUpdate}>{accountLoading ? <span className="loading loading-dots loading-xs"></span> : 'Save'}</button>
                        <button className='btn-danger mt-3' onClick={restForm}>Cancel</button>
                    </div>
                </div>
                <div className='border-b-2 border-base-300'></div>
                <div className='m-4'>
                    <h2 className='text-lg font-bold mb-4'>Change Password</h2>
                    <div className='flex flex-col gap-2'>
                        <label className="input">
                            <span className="label">Current Password</span>
                            <input
                                onChange={handlePasswordInputChange}
                                name='currentPassword'
                                type="password" placeholder="********" />
                        </label>

                        <label className="input">
                            <span className="label">New Password</span>
                            <input
                                onChange={handlePasswordInputChange}
                                name='newPassword'
                                type="password" placeholder="********" />
                        </label>

                        <label className="input">
                            <span className="label">Confirm Password</span>
                            <input
                                onChange={handlePasswordInputChange}
                                name='confirmPassword'
                                type="password" placeholder="********" />
                        </label>
                    </div>
                    <button onClick={changePassword} className='btn-primary mt-3 min-w-[65px]'>{changePasswordLoading ? <span className="loading loading-dots loading-xs"></span> : 'Change'}</button>
                </div>
                <div className='border-b-2 border-base-300'></div>
                <div className='m-4'>
                    <h2 className='text-lg font-semibold mb-4'>Delete Account</h2>
                    <div role="alert" className="alert alert-warning">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <span>Delete your account is permanent and cannot be undone and you will lose all your data. Please make sure you want to delete your account.</span>
                    </div>
                    <button
                        onClick={() => { document.getElementById('delete_user_modal').showModal() }}
                        className='btn-danger mt-3'>Delete Account</button>
                </div>
                <AccountDeleteConfirmModal id={'delete_user_modal'} />
            </div>
        </Layout>
    )
}

export default Profile
