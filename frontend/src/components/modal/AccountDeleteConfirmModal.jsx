import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const AccountDeleteConfirmModal = ({ id }) => {

    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const checkPassword = async () => {
        try {
            setLoading(true);
            const res = await axios.post('/api/auth/check-password', { password });
            if (res.status === 200) {
                setPassword('');
                document.getElementById(id).close();

                const res = await axios.delete('/api/auth/delete-user');
                if (res.status === 200) {
                    toast('User deleted', {
                        duration: 4000,
                        position: 'top-right',
                        type: 'success',
                    });
                    window.location.href = '/';

                } else {
                    toast(res.data.error || 'something went wrong', {
                        duration: 4000,
                        position: 'top-right',
                        type: 'error',
                    });
                }
            }
        } catch (error) {
            toast(error.response?.data.error || 'something went wrong', {
                duration: 4000,
                position: 'top-right',
                type: 'error',
            })
        } finally {
            setLoading(false);
        }
    }

    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <h3 className="font-bold text-lg">Enter your password</h3>
                <input
                    type="password"
                    className='input mt-4'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password' value={password} />
                <div className="modal-action">
                    <button onClick={checkPassword} className='btn-primary min-w-[65px]'>{loading ? <span className="loading loading-dots loading-xs"></span> : 'Confirm'}</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    )
}

export default AccountDeleteConfirmModal