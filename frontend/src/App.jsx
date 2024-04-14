import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Register from './components/Register'
import Login from './components/Login'
import ProfilePage from './components/ProfilePage';
import { login } from './redux/authSlice';
import { useDispatch } from 'react-redux';
import Settings from './components/Settings'
import Messaging from './components/Messaging'


function App() {

  const dispatch = useDispatch();

  useEffect(() => {

    const cookies = document.cookie.split('; ');

    const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));

    let accessToken = '';
    if (accessTokenCookie) {
      accessToken = accessTokenCookie.split('=')[1];

      fetch("http://localhost:8000/api/v1/users/current-user", {
        method: 'GET',
        headers: {
          'Authorization': accessToken,
          'Content-Type': 'application/json' // Specify JSON content type
        }
      }).then(res => res.json())
        .then(res => {
          if (res.success) {

            dispatch(login(res.data));

            // document.cookie = `accessToken=${res.data.accessToken}; path=/`;
            // document.cookie = `refreshToken=${res.data.refreshToken}; path=/`;

            //navigate('/');
          }
        }).catch(err => console.log(err.message));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/messaging' element={<Messaging />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App