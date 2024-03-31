import React, { useState } from 'react'
import Navbar from './Navbar'
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice.js';
import { useNavigate } from 'react-router';


const Settings = () => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleChangePassword = () => {

        const cookies = document.cookie.split('; ');
        const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));
        let accessToken = '';
        if (accessTokenCookie) {
            accessToken = accessTokenCookie.split('=')[1];
        }

        fetch("http://localhost:8000/api/v1/users/change-password", {
            method: 'POST',
            body: JSON.stringify({
                oldPassword,
                newPassword
            }),
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json' // Specify JSON content type
            }
        }).then(res => res.json())
            .then(res => {
                if (res.success) {
                    console.log(res);

                    fetch("http://localhost:8000/api/v1/users/logout", {
                        method: 'POST',
                        headers: {
                            'Authorization': accessToken,
                            'Content-Type': 'application/json' // Specify JSON content type
                        }
                    }).then(res => res.json())
                        .then(res => {
                            if (res.success) {
                                console.log(res);
                                dispatch(logout());

                                document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                                document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                                navigate('/login');
                            }
                        }).catch(err => console.log(err.message));
                }
            }).catch(err => console.log(err.message));
    }

    return (
        <>
            <Navbar />
            <div>
                <h1 className='mx-96 mt-8 text-rose-400 text-lg'>Change Password</h1>
                <div className='flex flex-col mx-96 mt-2  h-48 rounded-xl border border-rose-500 w-6/12 bg-black'>
                    <div className='flex  ml-20 mt-6'>
                        <label htmlFor="" className='mb-2 mr-10'> Old Password: </label>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={e => setOldPassword(e.target.value)}
                            className='text-sm h-8 w-96 py-1 px-2 rounded border border-white bg-neutral-800' />
                    </div>
                    <div className='flex  ml-20 mt-4'>
                        <label htmlFor="" className='mb-2 mr-8'>New Password:&nbsp;</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={e => setNewPassword(e.target.value)}
                            className=' text-sm h-8 w-96 py-1 px-2 rounded border border-white bg-neutral-800' />
                    </div>
                    <button className='mt-6 ml-auto mr-40 bg-rose-500 text-black rounded border border-white w-40  w-24 h-8' onClick={handleChangePassword}>change password</button>
                </div>
                <h1 className='mx-96 mt-8 text-rose-400 text-lg'>Delete Account Permanently</h1>
                <div className='flex flex-col mx-96 mt-2  h-56 rounded-xl border border-rose-500 w-6/12 bg-black'>
                    <div className='flex  flex-col ml-20 mt-4'>
                        <h1 htmlFor="" className='mb-2 mr-8'>Are you sure you want to delete this account permanently?</h1>
                        <div className='flex  item-center mt-4'>
                            <label htmlFor="" className='mr-16'>Username: </label>
                            <input
                                type="text"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                className=' text-sm h-8 w-96  py-1 px-2 rounded border border-white bg-neutral-800' />
                        </div>
                        <div className='flex  item-center  mt-4'>
                            <label htmlFor="" className=' mr-16'>Password:&nbsp;</label>
                            <input
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                className=' text-sm h-8 w-96 py-1 px-2 rounded border border-white bg-neutral-800' />
                        </div>
                    </div>
                    <button className='mt-6 ml-auto mr-40 bg-red-500 text-black rounded border border-white w-40  w-24 h-8' onClick={handleChangePassword}>delete account</button>
                </div>
            </div>
        </>
    )
}

export default Settings