import React from 'react'
import avatar from '../assets/user-avatar.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const ProfileCard = () => {
    return (
        <>
            <div className='bg-black h-60 w-96 rounded-lg transition-transform hover:scale-105'>
                <div className='flex'>
                    <div className='ml-4 mt-4 mb-2 w-20 h-20 overflow-hidden rounded-full '>
                        <img src={avatar} className='w-full h-full object-cover' />
                    </div>
                    <div className='mt-8 m-4'>
                        <h1 className='text-lg'>Suraj Kumar</h1>
                        <h3 className='text-xs text-gray-400'>Web Developer | Blockchain Developer</h3>

                        <h3 className='text-gray-400 text-xs'><FontAwesomeIcon icon={faLocationDot} /> Uttarakhand, IN</h3>
                    </div>
                </div>
                <div className='flex m-2'>
                    <h1 className='text-sm mx-2'>Skills:</h1>
                    <ul className='text-xs flex flex-wrap'>
                        <li className='px-2  m-1 bg-rose-500 text-black rounded font-medium'>.NET</li>
                        <li className='px-2 m-1 bg-rose-500 text-black rounded font-medium'>JavaScript</li>
                        <li className='px-2 m-1 bg-rose-500 text-black rounded font-medium'>Node.js</li>
                        <li className='px-2 m-1 bg-rose-500 text-black rounded font-medium'>React</li>
                        <li className='px-2 m-1 bg-rose-500 text-black rounded font-medium'>Express</li>
                        <li className='px-2 m-1 bg-rose-500 text-black rounded font-medium'>MongoDB</li>
                    </ul>
                </div>
                <div className='flex mt-6 justify-center'>
                    <FontAwesomeIcon icon={faGithub} className='size-6 px-4 transition-transform hover:scale-125 cursor-pointer' />
                    <FontAwesomeIcon icon={faLinkedin} className='size-6 px-4 text-sky-600 transition-transform hover:scale-125 cursor-pointer' />
                    <FontAwesomeIcon icon={faXTwitter} className='size-6 px-4 transition-transform hover:scale-125 cursor-pointer' />
                    <FontAwesomeIcon icon={faYoutube} className='size-6 px-4 text-red-600 transition-transform hover:scale-125 cursor-pointer' />
                    <FontAwesomeIcon icon={faLink} className='size-6 px-4  transition-transform hover:scale-125 cursor-pointer' />
                </div>
            </div>
        </>
    )
}

export default ProfileCard