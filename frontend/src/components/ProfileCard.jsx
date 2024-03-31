import React from 'react'
import avatar from '../assets/user-avatar.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const ProfileCard = ({ user }) => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    return (
        <>
            <div className='bg-black h-60 w-96 rounded-lg transition-transform hover:scale-100 hover:border hover:border-rose-500 relative'>
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
                        {user?.skills?.slice(0, 8).map(skill => (
                            <li key={skill} className='px-2 m-1 bg-rose-500 text-black rounded font-medium'>{skill}</li>
                        ))}
                    </ul>
                </div>
                <div className='flex mt-auto justify-center absolute bottom-5 left-0 right-0 space-x-6'>
                    {user?.email && (   
                        <Link
                            to={isAuthenticated ? `mailto:${user.email}` : "/login"}
                            target={isAuthenticated ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faEnvelope} className='size-6  transition-transform hover:scale-125 cursor-pointer' />
                        </Link>
                    )}
                    {user?.github && (
                        <Link
                            to={isAuthenticated ? user.github : "/login"}
                            target={isAuthenticated ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faGithub} className='size-6  transition-transform hover:scale-125 cursor-pointer' />
                        </Link>
                    )}
                    {user?.linkedin && (
                        <Link
                            to={isAuthenticated ? user.linkedin : "/login"}
                            target={isAuthenticated ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faLinkedin} className='size-6  text-sky-600 transition-transform hover:scale-125 cursor-pointer' />
                        </Link>
                    )}
                    {user?.twitter && (
                        <Link
                            to={isAuthenticated ? user.twitter : "/login"}
                            target={isAuthenticated ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faXTwitter} className='size-6  transition-transform hover:scale-125 cursor-pointer' />
                        </Link>
                    )}
                    {user?.youtube && (
                        <Link
                            to={isAuthenticated ? user.youtube : "/login"}
                            target={isAuthenticated ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faYoutube} className='size-6  text-red-600 transition-transform hover:scale-125 cursor-pointer' />
                        </Link>
                    )}
                    {user?.otherLink && (
                        <Link
                            to={isAuthenticated ? user.otherLink : "/login"}
                            target={isAuthenticated ? "_blank" : "_self"}
                            rel="noopener noreferrer"
                        >
                            <FontAwesomeIcon icon={faLink} className='size-6 transition-transform hover:scale-125 cursor-pointer' />
                        </Link>
                    )}
                </div>
            </div>
        </>


    )
}

export default ProfileCard;