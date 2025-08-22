import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <div className='navbar'>
      <nav className='nav-links'>
        <button className='nav-btn'>
        📋 Yêu Cầu Chuyển Của tôi
      </button>
      <button className='nav-btn'>
        📄 Yêu cầu gửi tới tôi
      </button>
      <button className='nav-btn'>
        📰 Bản tin chuyển lớp
      </button>
      </nav>
    </div>
  )
}

export default Navbar
