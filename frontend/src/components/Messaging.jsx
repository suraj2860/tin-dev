import React from 'react'
import Navbar from './Navbar'
import avatar from '../assets/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { faPaperclip } from '@fortawesome/free-solid-svg-icons'

const Messaging = () => {
  return (
    <div className='h-screen'>
      <Navbar />
      <div className='mt-20 bg-black rounded-lg border border-rose-500 mx-24 h-5/6 flex'>
        <div className='border-r border-rose-500 w-3/6 flex flex-col  item-center'>
          <div className='text-center border-b border-rose-500 h-12 flex justify-center items-center'>Messaging</div>
          <div>
            <ul>
              <li className='flex cursor-pointer border-b border-rose-500'>
                <div className='ml-4 mt-2 mb-2 w-12 h-12 overflow-hidden rounded-full'>
                  <img src={avatar} className='w-full h-full object-cover' />
                </div>
                <div className='ml-6 mt-4 flex'>
                  <div>
                    <h3 className='hover:text-rose-400'>Jack Doe</h3>
                    <h5 className='text-xs'>Hey!! How you doing?</h5>
                  </div>
                  <div className='right-px text-right w-56 text-xs text-grey-'>
                    <h5>09:51</h5>
                  </div>
                </div>
              </li>
              <li className='flex cursor-pointer border-b border-rose-500'>
                <div className='ml-4 mt-2 mb-2 w-12 h-12 overflow-hidden rounded-full'>
                  <img src={avatar} className='w-full h-full object-cover' />
                </div>
                <div className='ml-6 mt-4 flex'>
                  <div>
                    <h3 className='hover:text-rose-400'>Jane Doe</h3>
                    <h5 className='text-xs'>Hey!! How you doing?</h5>
                  </div>
                  <div className='right-px text-right w-56 text-xs text-grey-'>
                    <h5>09:51</h5>
                  </div>
                </div>
              </li>
              <li className='flex cursor-pointer border-b border-rose-500'>
                <div className='ml-4 mt-2 mb-2 w-12 h-12 overflow-hidden rounded-full'>
                  <img src={avatar} className='w-full h-full object-cover' />
                </div>
                <div className='ml-6 mt-4 flex'>
                  <div>
                    <h3 className='hover:text-rose-400'>John Doe</h3>
                    <h5 className='text-xs'>Hey!! How you doing?</h5>
                  </div>
                  <div className='right-px text-right w-56 text-xs text-grey-'>
                    <h5>09:51</h5>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className='w-full flex flex-col justify-between'>
          <div className='border-b border-rose-500 h-12 flex items-center'>
            <div className='ml-4 mt-2 mb-2 w-8 h-8 overflow-hidden rounded-full mr-4'>
              <img src={avatar} className='w-full h-full object-cover' />
            </div>
            <h3>Jack Doe</h3>
          </div>
          <div className='flex justify-center items-center'>
            <h3>messages</h3>
          </div>
          <div className='border-t border-rose-500 h-16'>
            <FontAwesomeIcon icon={faPaperclip} className='size-6 cursor-pointer ml-4' />
            <input type="text" placeholder='Enter your message...' className='w-5/6 m-3 ml-4 pl-2 rounded-lg bg-neutral-800 h-10' />
            <FontAwesomeIcon icon={faPaperPlane} className='size-6 cursor-pointer ml-4' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Messaging