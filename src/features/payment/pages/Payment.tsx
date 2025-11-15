import React, { useEffect, useState } from 'react'
import Header from '../../../components/header/Header'
import Sidebar from '../../../components/sidebar/Sidebar'
import Banking from '../components/Banking'
import "./Payment.css"
import { useResponsive } from '../../../useResponsive'
import { useAppDispatch } from '../../../store/hooks'
import { fetchUserProfile } from '../../../store/Slice'

function Payment() {
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);
  
  return (
    <div className='payment-container'>
      {!isMobile && <Sidebar />} 
        <Header title="Thanh toán" script='Thanh toán để quy đổi ra Coin' onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile}/>
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
        <div className='main-content-payment'>
            <Banking />
        </div>
    </div>
  )
}

export default Payment