import React, { useState } from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import Chat from '../components/chat/Chat'
import './Message.css'
import { useParams } from "react-router-dom";
import { useResponsive } from '../../../useResponsive'

const Message = () => {
  const { studentId, requestId } = useParams();
  const isMobile = useResponsive(1024);
    const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className='message-container'>
      {!isMobile && <Sidebar />} 
      <Header title="Tin nhắn" script="Trò chuyện với các bạn sinh viên" onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile}/>
        {isMobile && (
        <>
          <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
            <Sidebar isMobile={true} />
          </div>
          {sidebarOpen && (
            <div className="overlay" onClick={() => setSidebarOpen(false)} />
          )}
        </>
      )}
      <div className='main-content-message'>
        <Chat id = {studentId} />
      </div>
    </div>
  )
}

export default Message