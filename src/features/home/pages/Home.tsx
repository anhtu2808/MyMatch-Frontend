import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar';
import Header from '../../../components/header/Header';

function Home() {
  return (
    <>
        <Sidebar />
        <Header title="Bảng điều khiển" script="Quản lý hoạt động của bạn" />
    </>
  )
}

export default Home;