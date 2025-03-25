import Layout from '../Layout.jsx';


const Profile = () => {
    return (
        <Layout>
            <div className='m-4 bg-base-100 rounded-sm py-1'>
                <div className='m-4'>
                    <h2 className='text-lg font-bold mb-4'>Account</h2>
                    <div className=''>
                        <div className='flex flex-col gap-2'>
                            <label className="input">
                                <span className="label">Full Name</span>
                                <input type="text" className='font-semibold' placeholder="Full Name" />
                            </label>
                            <label className="input">
                                <span className="label">Username</span>
                                <input type="text" className='font-semibold' placeholder="Username" />
                            </label>
                        </div>
                        <button className='btn-primary mt-3'>Save</button>
                        <button className='btn-danger mt-3'>Cancel</button>
                    </div>
                </div>
                <div className='border-b-2 border-base-300'></div>
                <div className='m-4'>
                    <h2 className='text-lg font-bold mb-4'>Change Password</h2>
                    <div className='flex flex-col gap-2'>
                        <label className="input">
                            <span className="label">Current Password</span>
                            <input type="password" placeholder="********" />
                        </label>

                        <label className="input">
                            <span className="label">New Password</span>
                            <input type="password" placeholder="********" />
                        </label>

                        <label className="input">
                            <span className="label">Confirm Password</span>
                            <input type="password" placeholder="********" />
                        </label>
                    </div>
                    <button className='btn-primary mt-3'>Change</button>
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
                    <button className='btn-danger mt-3'>Delete Account</button>
                </div>
            </div>
        </Layout>
    )
}

export default Profile