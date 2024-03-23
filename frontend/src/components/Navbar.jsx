import React from 'react'
import logo from "../assets/tindev-logo-2.png";
import avatar from "../assets/avatar.jpg";
import { Link } from 'react-router-dom';


const Navbar = () => {

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
                <div className='absolute right-0 pr-12'>
                    <img src={avatar} className='flex size-8 rounded-3xl' />
                </div>
            </div>

        </>
    )
}

export default Navbar