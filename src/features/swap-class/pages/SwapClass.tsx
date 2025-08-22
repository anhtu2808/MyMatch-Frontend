import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import Navbar from '../components/navbar/Navbar'
import Filter from '../components/filter/Filter'
import './SwapClass.css'
import MyRequest from '../components/my-request/MyRequest'

function SwapClass() {
  return (
    <div className='swap-class'>
        <Sidebar />
        <Header title="Đổi chéo lớp" script="Quản lý yêu cầu chuyển lớp một cách dễ dàng" />
        <div className='main-content'>
          <Navbar />
          <Filter />
          <MyRequest/>
        </div>
    </div>
  )
}

export default SwapClass