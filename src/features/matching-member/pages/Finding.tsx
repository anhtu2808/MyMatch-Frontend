import React, { useState } from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import FindingForum from './FindingForum'
import MyGroup from '../components/my-group/MyGroup'
import MyProfile from '../components/my-profile/MyProfile'
import FindingNavbar from '../components/navbar/FindingNavbar'
import "./Finding.css"
import ProfileModal from '../components/modal/ProfileModal'
import GroupDetailModalChange from '../components/modal/GroupDetailModalChange'

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

  const [openGroup, setOpenGroup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false)
          const handleOpenModalGroup = () => {
          setOpenGroup(true);
          }
  
        const  handleOpenModalProfile = () => {
          setOpenProfile(true)
        }
  return (
    <div className='finding-container'>
        <Header title='Tìm nhóm' script='Kết nối với học sinh dựa trên kỹ năng, sở thích và môn học'/>
        <Sidebar />
        <div className='main-content-finding'>
            <FindingNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className='add-info-finding'>
          <div>
            <h3>Yêu cầu của bạn</h3>
            <p>Quản lý các yêu cầu tìm kiếm đồng đội</p>
          </div>
          <div className='button-action-finding-nav'>
          <button className='create-btn-finding' onClick={handleOpenModalGroup}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
             Tạo yêu cầu tìm nhóm
             </button>
          <button className='create-btn-finding' onClick={handleOpenModalProfile}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
             Tạo yêu cầu tìm thành viên</button>
             </div>
          </div>
            {renderTabContent()}
            <ProfileModal open={openProfile} onClose={() => setOpenProfile(false)} />
            <GroupDetailModalChange open={openGroup} onClose={() => setOpenGroup(false)} />
        </div>
    </div>
  )
}

export default Finding