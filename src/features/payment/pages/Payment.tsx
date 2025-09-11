import React from 'react'
import Header from '../../../components/header/Header'
import Sidebar from '../../../components/sidebar/Sidebar'
import Banking from '../components/Banking'
import "./Payment.css"

function Payment() {
  return (
    <div className='payment-container'>
        <Header title="Thanh toán" script='Thanh toán để quy đổi ra Coin'/>
        <Sidebar /> 
        <div className='main-content-payment'>
            <Banking />
        </div>
    </div>
  )
}

export default Payment