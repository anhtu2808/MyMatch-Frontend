import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import Navbar from '../components/navbar/Navbar'
import './SwapClass.css'
import MyRequest from '../components/my-request/MyRequest'
import RequestToMe from '../components/request-to-me/RequestToMe'
import NewsFeed from '../components/news-feed/NewsFeed'

function SwapClass() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(0)

  const handleCreateRequest = () => {
    navigate('/swap_class/create')
  }

  const renderTabContent = () => {
    switch(activeTab) {
      case 0:
        return <MyRequest />
      case 1:
        return  <RequestToMe />
      case 2:
        return <NewsFeed />
      default:
        return <MyRequest />
    }
  }

  return (
    <div className='swap-class'>
        <Sidebar />
        <Header title="Đổi chéo lớp" script="Quản lý yêu cầu chuyển lớp một cách dễ dàng" />
        <div className='main-content-swap-class'>
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          <button className='create-btn' onClick={handleCreateRequest}> + Tạo yêu cầu đổi lớp</button>
          {renderTabContent()}
        </div>
    </div>
  )
}

export default SwapClass