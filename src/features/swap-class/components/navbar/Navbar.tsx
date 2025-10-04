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
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-navbar-swap lucide lucide-file-search-icon lucide-file-search"><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3"/><path d="m9 18-1.5-1.5"/><circle cx="5" cy="14" r="3"/></svg>
          <span className="nav-btn-text">Yêu cầu chuyển của tôi</span>
        </button>
        <button
          className={`nav-btn ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => handleTabClick(1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-navbar-swap lucide lucide-file-input-icon lucide-file-input"><path d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M2 15h10"/><path d="m9 18 3-3-3-3"/></svg>
           <span className="nav-btn-text">Yêu cầu gửi tới tôi</span>
        </button>
        <button
          className={`nav-btn ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => handleTabClick(2)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon-navbar-swap lucide lucide-file-sliders-icon lucide-file-sliders"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M8 12h8"/><path d="M10 11v2"/><path d="M8 17h8"/><path d="M14 16v2"/></svg>
           <span className="nav-btn-text">Bản tin chuyển lớp</span>
        </button>
      </nav>
    </div>
  )
}

export default Navbar