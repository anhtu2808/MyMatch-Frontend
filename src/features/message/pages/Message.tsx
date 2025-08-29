import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import Chat from '../components/chat/Chat'
import './Message.css'

const Message = () => {
  return (
    <div className='message-container'>
      <Sidebar />
      <Header title="Tin nhắn" script="Trò chuyện với các bạn sinh viên" />
      <div className='main-content-message'>
        <Chat />
      </div>
    </div>
  )
}

export default Message