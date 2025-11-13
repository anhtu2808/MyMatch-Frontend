import React, { useState } from 'react'
import Member from '../components/member/Member'
import Group from '../components/group/Group'
import "./FindingForum.css"

interface FindingForumProps {
  reload?: boolean;
}

const FindingForum: React.FC<FindingForumProps> = ({reload = false}) => {
  const [activeTab, setActiveTab] = useState(0)
  const renderTabContent = () => {
    switch(activeTab) {
      case 0:
        return <Member reload={reload}/>
      case 1:
        return  <Group  reload={reload}/>
      default:
        return <Member reload={reload}/>
    }
  }
  return (
    <div className='finding-forum-container'>
      <div className='finding-option-title'>
        <button
          className={`finding-option ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Thành viên
        </button>
        <button
          className={`finding-option ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Nhóm
        </button>
      </div>

      {renderTabContent()}
    </div>
  )
}

export default FindingForum