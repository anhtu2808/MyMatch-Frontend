import React, { useState } from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import FindingForum from './FindingForum'
import MyGroup from '../components/my-group/MyGroup'
import MyProfile from '../components/my-profile/MyProfile'
import FindingNavbar from '../components/navbar/FindingNavbar'
import "./Finding.css"
import ProfileModalForm from '../components/modal/ProfileModalForm'
import GroupModalForm from '../components/modal/GroupModalForm'
import { useResponsive } from '../../../useResponsive'

function Finding() {
    const [activeTab, setActiveTab] = useState(0)
    const renderTabContent = () => {
    switch(activeTab) {
      case 0:
        return <FindingForum reload={reload}/>
      case 1:
        return  <MyGroup />
      case 2:
        return <MyProfile />
      default:
        return <FindingForum reload={reload}/>
    }
  }
  const [reload, setReload] = useState(false);
  const [openGroup, setOpenGroup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false)
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);
          const handleOpenModalGroup = () => {
          setOpenGroup(true);
          }
  
        const  handleOpenModalProfile = () => {
          setOpenProfile(true)
        }
  return (
    <div className='finding-container'>
       {!isMobile && <Sidebar />}
        <Header title='Tìm nhóm' script='Kết nối với học sinh dựa trên kỹ năng, sở thích và môn học' onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile}/>
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
             Tạo yêu cầu nhóm
             </button>
          <button className='create-btn-finding' onClick={handleOpenModalProfile}> 
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
             Tạo yêu cầu cá nhân</button>
             </div>
          </div>
            {renderTabContent()}
            <ProfileModalForm open={openProfile} onClose={() => setOpenProfile(false)} onReload={() => setReload(prev => !prev)}/>
            <GroupModalForm open={openGroup} onClose={() => setOpenGroup(false)} onReload={() => setReload(prev => !prev)}/>
        </div>
    </div>
  )
}

export default Finding