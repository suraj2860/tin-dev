import React from 'react'
import avatar from '../assets/user-avatar.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'

const ProfileCard = ({ user }) => {
    return (
        <>
            <div className='bg-black h-60 w-96 rounded-lg transition-transform hover:scale-105 relative'>
                <div className='flex'>
                    <div className='ml-4 mt-4 mb-2 w-20 h-20 overflow-hidden rounded-full'>
                        <img src={user?.avatar} className='w-full h-full object-cover' />
                    </div>
                    <div className='mt-8 m-4'>
                        <h1 className='text-lg'>{user?.fullName}</h1>
                        <h3 className='text-xs text-gray-400'>{user?.bio}</h3>
                        <h3 className='text-gray-400 text-xs'><FontAwesomeIcon icon={faLocationDot} /> {`${user?.state}, ${user?.country}`}</h3>
                    </div>
                </div>
                <div className='flex m-2'>
                    <h1 className='text-sm mx-2'>Skills:</h1>
                    <ul className='text-xs flex flex-wrap'>
                        {user?.skills?.map(skill => (
                            <li key={skill} className='px-2 m-1 bg-rose-500 text-black rounded font-medium'>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex mt-auto justify-center absolute bottom-3 left-0 right-0'>
                    {user?.github && (
                        <a href={user.github} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faGithub} className='size-6 px-4 transition-transform hover:scale-125 cursor-pointer' />
                        </a>
                    )}
                    {user?.linkedin && (
                        <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} className='size-6 px-4 text-sky-600 transition-transform hover:scale-125 cursor-pointer' />
                        </a>
                    )}
                    {user?.twitter && (
                        <a href={user.twitter} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faXTwitter} className='size-6 px-4 transition-transform hover:scale-125 cursor-pointer' />
                        </a>
                    )}
                    {user?.youtube && (
                        <a href={user.youtube} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faYoutube} className='size-6 px-4 text-red-600 transition-transform hover:scale-125 cursor-pointer' />
                        </a>
                    )}
                    {user?.otherLink && (
                        <a href={user.otherLink} target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLink} className='size-6 px-4  transition-transform hover:scale-125 cursor-pointer' />
                        </a>
                    )}
                </div>
            </div>
        </>


    )
}

export default ProfileCard;