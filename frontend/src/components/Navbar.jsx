import React from 'react'
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

    const handleLogout = () => {
        fetch("http://localhost:8000/api/v1/users/logout", {
            method: 'POST',
            headers: {
                'Authorization': user?.accessToken,
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

    return (
        <>
            <div className='bg-black h-16 flex items-center relative'>
                <img src={logo} className='flex h-10 pl-10 pr-4' />
                <h1 className='text-2xl font-semibold text-rose-400 font-sans'>tin</h1><h1 className='text-2xl font-semibold '>dev</h1>
                <div className='pl-80'>
                    <input type="text" placeholder='Search' className='rounded-xl border h-8 w-96 bg-neutral-800 p-2 ' />
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
                        <Link to="/register" className='bg-rose-400 h-8  w-20 rounded border text-medium border-black text-black flex items-center justify-center'>Register</Link>
                        :
                        isAuthenticated ?
                            <div className='flex space-x-4'>
                                <img src={avatar} className="size-8 rounded-3xl" alt="Avatar" />
                                <button className='bg-rose-400 w-20 rounded border border-black text-black' onClick={handleLogout}>Log out</button>
                            </div>
                            :
                            <Link to="/login" className='bg-rose-400 w-20 rounded border h-8 border-black text-black flex items-center justify-center'>Login</Link>
                }
            </div>

        </>
    )
}

export default Navbar