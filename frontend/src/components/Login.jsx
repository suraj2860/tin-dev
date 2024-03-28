import React, { useState } from 'react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router';
import {useDispatch} from 'react-redux';
import { login } from '../redux/authSlice.js';

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const handleLogin = () => {
    fetch("http://localhost:8000/api/v1/users/login", {
      method: 'POST',
      body: JSON.stringify({
        username: username,
        password: password
      }),
      headers: {
        'Content-Type': 'application/json' // Specify JSON content type
      }
    }).then(res => res.json())
      .then(res => {
        if (res.success) {

          dispatch(login(res.data));

          document.cookie = `accessToken=${res.data.accessToken}; path=/`;
          document.cookie = `refreshToken=${res.data.refreshToken}; path=/`;

          navigate('/');
        }
      }).catch(err => console.log(err.message));
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  }

  return (
    <>
      <Navbar />
      <div className='flex justify-center mt-16'>
        <div className='bg-black w-2/6 h-200 rounded-lg flex flex-col justify-center items-center text-white border border-rose-500'>
          <h1 className='my-6 text-rose-400 text-xl font-semibold'>Login</h1>
          <div className='flex flex-col '>
            <label htmlFor="" className='mb-2'>Username</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              className='text-sm h-8 w-96 py-1 px-2 rounded border border-white bg-neutral-800' />
          </div>
          <div className='flex flex-col mt-4'>
            <label htmlFor="" className='mb-2'>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
              className=' text-sm h-8 w-96 py-1 px-2 rounded border border-white bg-neutral-800' />
          </div>
          <button className='mt-10 bg-rose-500 text-black rounded w-80 mb-12 w-24 h-8' onClick={handleLogin}>Login</button>
        </div>
      </div>
    </>

  )
}

export default Login