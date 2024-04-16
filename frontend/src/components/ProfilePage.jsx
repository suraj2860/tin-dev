import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { faYoutube } from '@fortawesome/free-brands-svg-icons'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import defaultAvatar from '../assets/avatar.jpg'
import { useNavigate } from 'react-router';
import { login } from '../redux/authSlice.js';
import { useDispatch } from 'react-redux';
import { base_url } from '../constants.js';



const ProfilePage = () => {

    const { isAuthenticated, user } = useSelector((state) => state.auth);
    //console.log(user.user.avatar);
    const [edit, setEdit] = useState(false);

    const [username, setUsername] = useState(user?.user?.username);
    const [fullName, setFullName] = useState(user?.user?.fullName);
    const [email, setEmail] = useState(user?.user?.email);
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(user?.user?.avatar);
    const [bio, setBio] = useState(user?.user?.bio);
    const [state, setstate] = useState(user?.user?.state);
    const [country, setCountry] = useState(user?.user?.country);
    const [skills, setSkills] = useState(user?.user?.skills);
    const [github, setGithub] = useState(user?.user?.github);
    const [linkedin, setLinkedin] = useState(user?.user?.linkedin);
    const [twitter, setTwitter] = useState(user?.user?.twitter);
    const [youtube, setYoutube] = useState(user?.user?.youtube);
    const [otherLink, setOtherLink] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [error, setError] = useState("");

    const startEdit = () => {
        setEdit(true);
    }
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) { setAvatar(file); }

        //console.log(avatar);
    };

    useEffect(() => {
        updateAvatar();
    }, [avatar]);

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError(""); // Clear the error message after 5 seconds
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [error]);

    const handleSave = () => {
        try {

            const requestBody = {};

            if (username !== user.user.username) requestBody.username = username;
            if (fullName !== user.user.fullName) requestBody.fullName = fullName;
            if (email !== user.user.email) requestBody.email = email;
            if (bio !== user.user.bio) requestBody.bio = bio;
            if (state !== user.user.state) requestBody.state = state;
            if (country !== user.user.country) requestBody.country = country;
            if (JSON.stringify(skills) !== JSON.stringify(user.user.skills)) {
                if (Array.isArray(skills)) {
                    requestBody.skills = skills.join(',');
                } else {
                    requestBody.skills = skills;
                }
            }
            if (github !== user.user.github) requestBody.github = github;
            if (linkedin !== user.user.linkedin) requestBody.linkedin = linkedin;
            if (twitter !== user.user.twitter) requestBody.twitter = twitter;
            if (youtube !== user.user.youtube) requestBody.youtube = youtube;
            if (otherLink !== user.user.otherLink) requestBody.otherLink = otherLink;

            //const formDataString = Array.from(formData).map(([key, value]) => `${key}=${value}`).join(' & ');
            //console.log(requestBody);

            if (requestBody != {}) {
                const cookies = document.cookie.split('; ');

                const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));

                let accessToken = '';
                if (accessTokenCookie) {
                    accessToken = accessTokenCookie.split('=')[1];
                }

                fetch(base_url + "/api/v1/users/update", {
                    method: "PATCH",
                    headers: {
                        'Authorization': accessToken,
                        'Content-Type': 'application/json' // Specify JSON content type
                    },
                    body: JSON.stringify(requestBody)
                })
                    .then((res) => res.json())
                    .then((res) => {
                        console.log(res);
                        if (res.success) {

                            const updatedUser = {
                                user: res.data.user,
                                accessToken: user?.accessToken,
                                refreshToken: user?.refreshToken
                            }
                            dispatch(login(updatedUser));
                        }
                        else {
                            //console.log(res);
                            setError(res.error);
                        }
                    })
                    .catch(err => console.log(err.message));
            }
            navigate('/profile');
            setEdit(false);

        } catch (error) {
            throw new Error(error.message);
        }
    }

    const updateAvatar = () => {
        if (avatar && typeof avatar === 'object') {
            const formData = new FormData();
            formData.append('avatar', avatar);

            //const formDataString = Array.from(formData).map(([key, value]) => `${key}=${value}`).join(' & ');
            //console.log(formDataString);

            const cookies = document.cookie.split('; ');

            const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));

            let accessToken = '';
            if (accessTokenCookie) {
                accessToken = accessTokenCookie.split('=')[1];
            }

            fetch(base_url + "/api/v1/users/update-avatar", {
                method: "PATCH",
                headers: {
                    'Authorization': accessToken
                },
                body: formData
            })
                .then((res) => res.json())
                .then((res) => {
                    console.log(res);
                    if (res.success) {
                        const updatedUser = {
                            user: res.data.user,
                            accessToken: user?.accessToken,
                            refreshToken: user?.refreshToken
                        }
                        console.log(updatedUser);
                        dispatch(login(updatedUser));
                        setAvatar(res.data.user.avatar);
                    }
                    else {
                        //console.log(res);
                        setError(res.error);
                    }
                })
                .catch(err => console.log(err.message));
        }
    }

    return (
        <>

            {!edit ?
                <>
                    <Navbar />
                    <div className="container mx-auto w-9/12 mt-24 bg-black p-8 rounded-lg border border-rose-500 relative ">
                        <div className="flex  ">
                            <div className='ml-4 mt-4 mb-2 w-32 h-32 overflow-hidden rounded-full '>
                                <img src={avatar} className='w-full h-full object-cover' />
                            </div>
                            <div className="profile-info ml-16 mt-8">
                                <h2 className="text-white mb-1">{user?.user?.fullName} <span className="text-gray-400 text-xs ml-2"> @{user?.user?.username}</span></h2>
                                <p className="text-gray-400 mb-1">{user?.user?.bio}</p>
                                <p className="text-gray-400"><FontAwesomeIcon icon={faLocationDot} className='text-white' /> {user?.user?.state}, {user?.user?.country}</p>
                            </div>
                            <div className='ml-40 mt-8'>
                                <p className="text-white mb-1 flex items-center"><FontAwesomeIcon icon={faEnvelope} className='size-6  transition-transform hover:scale-125 cursor-pointer mr-4' /> {user?.user?.email}</p>
                            </div>
                        </div>
                        <div className="skills mt-4 ml-40">
                            <p className="text-white flex flex-wrap ">Skills:
                                {
                                    user?.user?.skills?.map(skill => (
                                        <span key={skill} className="bg-rose-500 mb-2 text-black px-2 py-1 rounded ml-4">{skill}</span>
                                    ))
                                }
                            </p>
                        </div>
                        <div className='flex mb-8'>
                            <div className="social-links mt-10 ml-24 space-y-4">
                                {user?.user?.github && <p className="text-white flex items-center"><FontAwesomeIcon icon={faGithub} className='size-8  transition-transform hover:scale-125 cursori-ponter' /> <a href="https://github.com/jackdoe" target='_blank' className="text-white ml-12"> <h3 className='hover:text-rose-500'>{user?.user?.github}</h3></a></p>}
                                {user?.user?.twitter && <p className="text-white flex items-center"><FontAwesomeIcon icon={faXTwitter} className='size-8  transition-transform hover:scale-125 cursor-pointer' /> <a href="https://twitter.com/jackdoe" target='_blank' className="text-white ml-12"><h3 className='hover:text-rose-500'>{user?.user?.twitter}</h3></a></p>}
                                {user?.user?.otherLink && <p className="text-white flex items-center"><FontAwesomeIcon icon={faLink} className='size-8 transition-transform hover:scale-125 cursor-pointer' /><a href="https://jackdoe.com" target='_blank' className="text-white ml-12"><h3 className='hover:text-rose-500'>{user?.user?.otherLink}</h3></a></p>}
                            </div>
                            <div className="social-links mt-10 ml-24 space-y-4">
                                {user?.user?.linkedin && <p className="text-gray-400 flex items-center"><FontAwesomeIcon icon={faLinkedin} className='size-8  text-sky-600 transition-transform hover:scale-125 cursor-pointer' /> <a href="https://linkedin.com/jackdoe" target='_blank' className="text-white ml-12"><h3 className='hover:text-rose-500'>{user?.user?.linkedin}</h3></a></p>}
                                {user?.user?.youtube && <p className="text-gray-400 flex items-center"><FontAwesomeIcon icon={faYoutube} className='size-8  text-red-600 transition-transform hover:scale-125 cursor-pointer' /><a href="https://youtube.com/jackdoe" target='_blank' className="text-white ml-12"><h3 className='hover:text-rose-500'  >{user?.user?.youtube}</h3></a></p>}
                            </div>
                        </div>
                        <div className="edit-icon absolute top-0 right-0  border-4 border-blue-500 rounded-full w-12 h-12 flex justify-center align-center py-2 bg-white mt-4 mr-5">
                            <FontAwesomeIcon icon={faPen} onClick={startEdit} className="text-blue-500 size-6 text-lg cursor-pointer" />
                        </div>
                    </div>
                </>
                :
                <>
                    <Navbar />
                    <div className='flex justify-center flex-col  mt-24 bg-black mx-32 rounded-xl border border-rose-400 text-sm'>
                    <div className='absolute mt-24  top-0 w-80 pl-8 rounded bg-red-500 text-black right-0 '>{error}</div>
                        <div className='flex justify-center'>
                            <h1 className='text-xl mt-6 mb-2 text-rose-400'></h1>
                        </div>
                        <div className='flex'>
                            <label htmlFor="avatarInput" className='h-2'>
                                <div className='ml-20 mb-2 w-32 h-32 overflow-hidden rounded-full cursor-pointer'>
                                    <img src={avatar && typeof avatar === 'object' ? URL.createObjectURL(avatar) : avatar ? avatar : user?.user?.avatar ? user?.user?.avatar : defaultAvatar} className='w-full h-full object-cover' />
                                </div>
                                <input
                                    id="avatarInput"
                                    type="file"
                                    accept="image/*"
                                    className='hidden'
                                    onChange={handleImageUpload}
                                />
                            </label>
                            <div className='flex flex-col'>
                                <div className='mt-8 m-2 ml-24'>
                                    <label>Username* </label>
                                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-4 w-96' />
                                </div>
                                <div className='ml-24 m-2'>
                                    <label>Full Name* </label>
                                    <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-4 w-96' />
                                </div>
                                <div className='ml-24 m-2'>
                                    <label>E-mail* </label>
                                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className=' text-sm h-6 bg-neutral-800 rounded border ml-10 w-96' />
                                </div>
                                {/* <div className='ml-24 m-2'>
                                    <label>Password*</label>
                                    <input type="password" onChange={(e) => setPassword(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-6 w-96' />
                                </div> */}
                                <div className='ml-24 m-2'>
                                    <label>Bio*</label>
                                    <input type="text" value={bio} onChange={(e) => setBio(e.target.value)} className=' text-sm h-6 bg-neutral-800 rounded border ml-16 w-96' />
                                </div>
                                <div className='ml-24 m-2'>
                                    <label>State </label>
                                    <input type="text" value={state} onChange={(e) => setstate(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-12 w-60' />
                                    <label className='ml-8'>Country*</label>
                                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-10 w-60' />
                                </div>
                                <div className='ml-24 m-2'>
                                    <label>Skills*</label>
                                    <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-12 w-10/12' />
                                </div>
                            </div>
                        </div>
                        <div className=' align-center ml-40 mt-6'>
                            <label>GitHub </label>
                            <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} className=' text-sm h-6 bg-neutral-800 rounded border ml-10 w-96' />
                            <label className='ml-8'>LinkedIn</label>
                            <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-8 w-96' />
                        </div>
                        <div className=' ml-40 mt-4'>
                            <label> Twitter</label>
                            <input type="text" value={twitter} onChange={(e) => setTwitter(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-10 w-96' />
                            <label className='ml-8'>YouTube </label>
                            <input type="text" value={youtube} onChange={(e) => setYoutube(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-8 w-96' />
                        </div>
                        <div className='flex ml-40 mt-4'>
                            <div className=''>
                                <label>Website </label>
                                <input type="text" value={otherLink} onChange={(e) => setOtherLink(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-8 w-96' />
                            </div>
                            <div className='my-10'>
                                <button className='bg-white text-black rounded w-20 ml-80 w-24 h-8' onClick={() => setEdit(false)}>Cancel</button>
                                <button className='bg-rose-500 text-black rounded w-20 ml-8 w-24 h-8' onClick={handleSave}>Save</button>
                            </div>
                        </div>
                    </div>
                </>
            }

        </>
    )
}

export default ProfilePage