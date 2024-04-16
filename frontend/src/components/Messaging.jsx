import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import avatar from '../assets/avatar.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons';
import useGetConversation from '../hooks/useGetConversation';
import { useSelector } from 'react-redux';
import { useSocketContext } from '../contexts/SocketContext';
import { base_url } from '../constants';

const Messaging = () => {
  const { loading, conversations } = useGetConversation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [messageInput, setMessageInput] = useState("");

  const handleSelectedConversation = (receiverId) => {
    const cookies = document.cookie.split('; ');
    const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));
    let accessToken = '';
    if (accessTokenCookie) {
      accessToken = accessTokenCookie.split('=')[1];
    }

    fetch(`${base_url}/api/v1/messages/${receiverId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': accessToken
      }
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setSelectedConversation(res.data);
          setSelectedUser(conversations.find(convo => convo._id === receiverId));
        }
      })
      .catch(err => console.error(err.message));
  };

  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [selectedConversation]);

  const { socket } = useSocketContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      setSelectedConversation([...selectedConversation, newMessage]);
    });

    return () => socket?.off("newMessage");
  }, [socket, setSelectedConversation, selectedConversation]);

  const handleSend = async (message) => {
    try {
      const cookies = document.cookie.split('; ');
      const accessTokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));
      let accessToken = '';
      if (accessTokenCookie) {
        accessToken = accessTokenCookie.split('=')[1];
      }

      const res = await fetch(`${base_url}/api/v1/messages/send/${selectedUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': accessToken
        },
        body: JSON.stringify({ message: messageInput }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setSelectedConversation([...selectedConversation, data.data]);
      setMessageInput("")
    } catch (error) {
      console.error(error.message);
    } finally {
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  }

  return (
    <div className='h-svh pt-24'>
      <Navbar />
      <div className=' bg-black rounded-lg border border-rose-500 mx-24 h-5/6 flex '>
        <div className='border-r border-rose-500 w-3/6 flex flex-col '>
          <div className='text-center border-b border-rose-500 h-12 flex justify-center items-center'>Messaging</div>
          <div className='overflow-auto h-full '>
            {loading ? <span className='animate-spin mx-auto'></span> : null}
            <ul>
              {conversations.map((conversation) => {
                if (conversation._id !== user?.user?._id) {
                  return (
                    <li
                      key={conversation._id}
                      onClick={() => handleSelectedConversation(conversation._id)}
                      className='flex cursor-pointer border-b border-rose-500 hover:text-rose-400 hover:bg-neutral-800'
                    >
                      <div className='ml-4 mt-2 mb-2 w-12 h-12 overflow-hidden rounded-full'>
                        <img src={conversation.avatar} className='w-full h-full object-cover' alt='Avatar' />
                      </div>
                      <div className='ml-6 mt-4 flex'>
                        <div>
                          <h3 className='w-60'>{conversation.fullName}</h3>
                          {/* <h5 className='text-xs'>Hey! How are you doing?</h5> */}
                        </div>
                        <div className='right-px text-right w-20 mr-4 text-xs text-gray-'>
                          <h5>09:51</h5>
                        </div>
                      </div>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
        </div>
        <div className='w-full flex flex-col justify-between '>
          {selectedUser && (
            <div className='border-b border-rose-500 h-12 flex items-center'>
              <div className='ml-4 mt-2 mb-2 w-8 h-8 overflow-hidden rounded-full mr-4'>
                <img src={selectedUser.avatar} className='w-full h-full object-cover' alt='Avatar' />
              </div>
              <h3>{selectedUser.fullName}</h3>
            </div>
          )}
          <div className='flex flex-col h-full overflow-auto'>
            {selectedConversation !== null ? (
              selectedConversation.length === 0 ? (
                <div className='m-56 ml-60'>
                  <h3>You don't have any chats with this user</h3>
                </div>
              ) : (
                <div className='flex flex-col pt-2'>
                  <div className='flex flex-col justify-end h-full '>
                    {selectedConversation.map((msg) => (
                      msg.sender === user.user._id ? (
                        <div className='flex justify-end'>
                          <div className='mr-6 h-10 flex justify-center items-center bg-rose-500 text-black rounded-lg px-2 mb-4 inline-block'>
                            {msg.content}
                          </div>
                        </div>
                      ) : (
                        <div className='flex justify-start'>
                          <div className='ml-6 h-10 flex justify-center items-center bg-rose-500 text-black rounded-lg px-2 mb-4 inline-block'>
                            {msg.content}
                          </div>
                        </div>
                      )
                    ))}
                  </div>
                  <div ref={messagesEndRef}></div>
                </div>
              )
            ) : (
              <div className='m-56 ml-80 '>
                <h3>Start messaging!!</h3>
              </div>
            )}
          </div>
          {selectedUser && <div className='border-t border-rose-500 h-16'>
            <FontAwesomeIcon icon={faPaperclip} className='size-6 cursor-pointer ml-4' />
            <input
              type='text'
              placeholder='Enter your message...'
              className='w-5/6 m-3 ml-4 pl-2 rounded-lg bg-neutral-800 h-10'
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <FontAwesomeIcon icon={faPaperPlane} onClick={handleSend} className='size-6 cursor-pointer ml-4' />
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Messaging;
