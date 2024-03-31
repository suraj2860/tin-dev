import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import defaultAvatar from '../assets/avatar.jpg'
import { useNavigate } from 'react-router';
import avatar from '../assets/user-avatar.jpg'


const Register = () => {

    const [username, setUsername] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [bio, setBio] = useState("");
    const [state, setstate] = useState("");
    const [country, setCountry] = useState("");
    const [skills, setSkills] = useState("");
    const [github, setGithub] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [twitter, setTwitter] = useState("");
    const [youtube, setYoutube] = useState("");
    const [otherLink, setOtherLink] = useState("");

    const navigate = useNavigate();

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) setAvatar(file);

        //console.log(avatar);
    };

    const handleRegister = () => {
        try {
            const formData = new FormData();
            formData.append('username', username);
            formData.append('fullName', fullName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('avatar', avatar);
            formData.append('bio', bio);
            formData.append('state', state);
            formData.append('country', country);
            formData.append('skills', skills);
            formData.append('github', github);
            formData.append('linkedin', linkedin);
            formData.append('twitter', twitter);
            formData.append('youtube', youtube);
            formData.append('otherLink', otherLink);

            // const formDataString = Array.from(formData).map(([key, value]) => `${key}=${value}`).join(' & ');
            // console.log(formDataString);

            fetch("http://localhost:8000/api/v1/users/register", {
                method: "POST",
                body: formData
            })
                .then((res) => res.json())
                .then((res) => {
                    //console.log(res);
                    if(res.success) {
                        navigate('/');
                    }
                })
                .catch(err => console.log(err.message));
        } catch (error) {
            throw new Error(error.message);
        }
    }

    return (
        <>
            <Navbar />
            <div className='flex justify-center flex-col  mt-8 bg-black mx-32 rounded-xl border border-rose-400 text-sm'>
                <div className='flex justify-center'>
                    <h1 className='text-xl mt-6 mb-2 text-rose-400'>User Registration</h1>
                </div>
                <div className='flex'>
                    <label htmlFor="avatarInput" className='h-2'>
                        <div className='ml-20 mb-2 w-32 h-32 overflow-hidden rounded-full cursor-pointer'>
                            <img src={avatar ? URL.createObjectURL(avatar) : defaultAvatar} className='w-full h-full object-cover' />
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
                            <input type="text" onChange={(e) => setUsername(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-4 w-96' />
                        </div>
                        <div className='ml-24 m-2'>
                            <label>Full Name* </label>
                            <input type="text" onChange={(e) => setFullName(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-4 w-96' />
                        </div>
                        <div className='ml-24 m-2'>
                            <label>E-mail* </label>
                            <input type="email" onChange={(e) => setEmail(e.target.value)} className=' text-sm h-6 bg-neutral-800 rounded border ml-10 w-96' />
                        </div>
                        <div className='ml-24 m-2'>
                            <label>Password*</label>
                            <input type="password" onChange={(e) => setPassword(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-6 w-96' />
                        </div>
                        <div className='ml-24 m-2'>
                            <label>Bio*</label>
                            <input type="text" onChange={(e) => setBio(e.target.value)} className=' text-sm h-6 bg-neutral-800 rounded border ml-16 w-96' />
                        </div>
                        <div className='ml-24 m-2'>
                            <label>State </label>
                            <input type="text" onChange={(e) => setstate(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-12 w-60' />
                            <label className='ml-8'>Country*</label>
                            <input type="text" onChange={(e) => setCountry(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-10 w-60' />
                        </div>
                        <div className='ml-24 m-2'>
                            <label>Skills*</label>
                            <input type="text" onChange={(e) => setSkills(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-12 w-10/12' />
                        </div>
                    </div>
                </div>
                <div className=' align-center ml-40 mt-6'>
                    <label>GitHub </label>
                    <input type="text" onChange={(e) => setGithub(e.target.value)} className=' text-sm h-6 bg-neutral-800 rounded border ml-10 w-96' />
                    <label className='ml-8'>LinkedIn</label>
                    <input type="text" onChange={(e) => setLinkedin(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-8 w-96' />
                </div>
                <div className=' ml-40 mt-4'>
                    <label> Twitter</label>
                    <input type="text" onChange={(e) => setTwitter(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-10 w-96' />
                    <label className='ml-8'>YouTube </label>
                    <input type="text" onChange={(e) => setYoutube(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-8 w-96' />
                </div>
                <div className='flex ml-40 mt-4'>
                    <div className=''>
                        <label>Website </label>
                        <input type="text" onChange={(e) => setOtherLink(e.target.value)} className='text-sm h-6 bg-neutral-800 rounded border ml-8 w-96' />
                    </div>
                    <div className='my-10'>
                        <button className='bg-white text-black rounded w-20 ml-80 w-24 h-8' onClick={() => navigate('/')}>Cancel</button>
                        <button className='bg-rose-500 text-black rounded w-20 ml-8 w-24 h-8' onClick={handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register