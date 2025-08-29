import React from 'react'
import './Navbar.css'

interface NavbarProps {
  activeTab: number
  setActiveTab: (index: number) => void
}

const Navbar = ({ activeTab, setActiveTab }: NavbarProps) => {
  const handleTabClick = (index: number) => {
    setActiveTab(index)
  }

  return (
    <div className='navbar'>
      <nav className='nav-links'>
        <button
          className={`nav-btn ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => handleTabClick(0)}
        >
          📋 Yêu Cầu Chuyển Của tôi
        </button>
        <button
          className={`nav-btn ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          📄 Yêu cầu gửi tới tôi
        </button>
        <button
          className={`nav-btn ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => handleTabClick(2)}
        >
          📰 Bản tin chuyển lớp
        </button>
      </nav>
    </div>
  )
}

export default Navbar
