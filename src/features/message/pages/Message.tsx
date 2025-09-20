import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import Chat from '../components/chat/Chat'
import './Message.css'
import { useParams } from "react-router-dom";

const Message = () => {
  const { studentId, requestId } = useParams();
  return (
    <div className='message-container'>
      <Sidebar />
      <Header title="Tin nhắn" script="Trò chuyện với các bạn sinh viên" />
      <div className='main-content-message'>
        <Chat id = {studentId} requestId = {requestId}/>
      </div>
    </div>
  )
}

export default Message