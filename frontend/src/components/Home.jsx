import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import ProfileCard from './ProfileCard'
import { base_url } from '../constants'

const Home = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch(base_url + "/api/v1/users")
            .then((res) => res.json())
            .then((res) => setUsers(res.data));
    }, []);

    return (
        <>
            <Navbar />
            <div className='flex justify-center pt-4 flex-wrap mt-16'>
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