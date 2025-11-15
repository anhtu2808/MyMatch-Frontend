import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import Navbar from '../components/navbar/Navbar'
import './SwapClass.css'
import MyRequest from '../components/my-request/MyRequest'
import RequestToMe from '../components/request-to-me/RequestToMe'
import NewsFeed from '../components/news-feed/NewsFeed'
import { useResponsive } from '../../../useResponsive'

function SwapClass() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleCreateRequest = () => {
    navigate('/swap_class/create')
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 0:
        return  <NewsFeed />
      case 1:
        return  <MyRequest />
      case 2:
        return <RequestToMe />
      default:
        return <NewsFeed />
    }
  }

  return (
    <div className='swap-class'>
      {!isMobile && <Sidebar />}
        <Header title="Đổi chéo lớp" script="Quản lý yêu cầu chuyển lớp một cách dễ dàng" onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile}/>
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
        <div className='main-content-swap-class'>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className='add-info-request'>
          <div>
            <h3>Yêu cầu của bạn</h3>
            <p>Quản lý các yêu cầu đổi lớp phù hợp</p>
          </div>
          <button className='create-btn-request' onClick={handleCreateRequest}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
             Tạo yêu cầu đổi lớp</button>
          </div>
          {renderTabContent()}
        </div>
    </div>
  )
}

export default SwapClass