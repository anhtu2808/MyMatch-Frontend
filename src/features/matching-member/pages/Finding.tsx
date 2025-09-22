import React, { useState } from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import FindingForum from './FindingForum'
import MyGroup from '../components/my-group/MyGroup'
import MyProfile from '../components/my-profile/MyProfile'
import FindingNavbar from '../components/navbar/FindingNavbar'

function Finding() {
    const [activeTab, setActiveTab] = useState(0)
    const renderTabContent = () => {
    switch(activeTab) {
      case 0:
        return <FindingForum />
      case 1:
        return  <MyGroup />
      case 2:
        return <MyProfile />
      default:
        return <FindingForum />
    }
  }
  return (
    <div className='finding-container'>
        <Header title='Tìm nhóm' script='Kết nối với học sinh dựa trên kỹ năng, sở thích và môn học'/>
        <Sidebar />
        <div className='main-content-finding'>
            <FindingNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
            {renderTabContent()}
        </div>
    </div>
  )
}

export default Finding