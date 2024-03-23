import React from 'react'
import Navbar from './Navbar'
import ProfileCard from './ProfileCard'

const Home = () => {
    return (
        <>
            <Navbar />
            <div className='flex justify-center pt-4 flex-wrap'>
                <div className='m-4'>
                    <ProfileCard />
                </div>
                <div className='m-4'>
                    <ProfileCard />
                </div>
                <div className='m-4'>
                    <ProfileCard />
                </div>
                <div className='m-4'>
                    <ProfileCard />
                </div>
                <div className='m-4'>
                    <ProfileCard />
                </div>
                <div className='m-4'>
                    <ProfileCard />
                </div>
                <div className='m-4'>
                    <ProfileCard />
                </div>
                <div className='m-4'>
                    <ProfileCard />
                </div>
                <div className='m-4'>
                    <ProfileCard />
                </div>
            </div>
        </>
    )
}

export default Home