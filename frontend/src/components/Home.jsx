import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ProfileCard from './ProfileCard'

const Home = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8000/api/v1/users")
            .then((res) => res.json())
            .then((res) => setUsers(res.data));
    }, []);

    return (
        <>
            <Navbar />
            <div className='flex justify-center pt-4 flex-wrap'>
                {users.map(user => (
                    <div key={user._id} className='m-4'>
                        <ProfileCard user={user} />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home