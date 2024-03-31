import React, { useState } from 'react'
import logo from "../assets/tindev-logo-2.png";
import avatar from "../assets/avatar.jpg";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice.js';

const Navbar = () => {

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        const cookies = document.cookie.split('; ');

        const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));

        let accessToken = '';
        if (accessTokenCookie) {
            accessToken = accessTokenCookie.split('=')[1];
        }

        fetch("http://localhost:8000/api/v1/users/logout", {
            method: 'POST',
            headers: {
                'Authorization': accessToken,
                'Content-Type': 'application/json' // Specify JSON content type
            }
        }).then(res => res.json())
            .then(res => {
                if (res.success) {

                    dispatch(logout());

                    document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
                    document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

                    navigate('/');
                }
            }).catch(err => console.log(err.message));
    }

    const handleAvatarClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    return (
        <>
            <div className='bg-black h-16 flex items-center relative'>
                <div className='flex justify-center items-center' onClick={() => navigate('/')}>
                    <img src={logo} className='flex h-10 pl-10 pr-4' />
                    <h1 className='text-2xl font-semibold text-rose-400 font-sans cursor-default'>tin</h1><h1 className='cursor-default text-2xl font-semibold '>dev</h1>
                </div>
                <div className='pl-80'>
                    {location.pathname !== '/login' ? <input type="text" placeholder='Search' className='rounded-xl border h-8 w-96 bg-neutral-800 p-2 ' />
                        :
                        <div className='w-96'></div>}

                </div>
                <ul className='flex flex-row px-16 text-gray-200 text-base'>
                    <li className='px-6 transition-transform hover:scale-110'>
                        <Link to={"/"} className='hover:text-rose-400'>Home</Link>
                    </li>
                    <li className='px-6 transition-transform hover:scale-110'>
                        <Link to={"/"} className='hover:text-rose-400'>About</Link>
                    </li>
                    <li className='px-6 transition-transform hover:scale-110'>
                        <Link to={"/"} className='hover:text-rose-400'>Contact</Link>
                    </li>
                </ul>
                {
                    location.pathname === '/login' ?
                        <Link to="/register" className='bg-rose-400 h-8  w-20 rounded border border-white text-medium  text-black flex items-center justify-center'>Register</Link>
                        :
                        isAuthenticated ?
                            <div className='flex ml-10 space-x-4 '>
                                <img src={user?.user?.avatar} className="size-8 rounded-3xl" alt="Avatar" onClick={handleAvatarClick} />
                                {isDropdownOpen && (
                                    <ul className='absolute mt-10 w-24 flex justify-center flex-col cursor-pointer bg-neutral-800 text-white border-l border-t border-r  border-gray-200 shadow-md'>
                                        <li className='px-4 py-1 text-xs  hover:bg-rose-400 cursor-pointer hover:text-black w-full text-left border-b border-white'
                                            onClick={() => navigate('/profile')}
                                        >Profile
                                        </li>
                                        <li className='px-4 py-1 text-xs  hover:bg-rose-400 cursor-pointer hover:text-black w-full text-left border-b border-white'
                                            onClick={() => navigate('/settings')}
                                        >Settings
                                        </li>
                                        <li
                                            className='block px-4 py-1 text-xs hover:bg-rose-400 hover:text-black w-full text-left border-b border-white '
                                            onClick={handleLogout}
                                        >Log out</li>
                                    </ul>
                                )}
                            </div>
                            :
                            <Link to="/login" className='bg-rose-400 w-20 rounded border border-white h-8  text-black flex items-center justify-center'>Login</Link>
                }
            </div>

        </>
    )
}

export default Navbar