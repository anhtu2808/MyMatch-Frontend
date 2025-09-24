import React, { useState } from 'react'
import Member from '../components/member/Member'
import Group from '../components/group/Group'
import "./FindingForum.css"

function FindingForum() {
  const [activeTab, setActiveTab] = useState(0)
  const renderTabContent = () => {
    switch(activeTab) {
      case 0:
        return <Member />
      case 1:
        return  <Group />
      default:
        return <Member />
    }
  }
  return (
    <div className='finding-forum-container'>
      <div className='finding-option-title'>
        <button
          className={`finding-option ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => setActiveTab(0)}
        >
          Member
        </button>
        <button
          className={`finding-option ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => setActiveTab(1)}
        >
          Group
        </button>
      </div>

      {renderTabContent()}
    </div>
  )
}

export default FindingForum