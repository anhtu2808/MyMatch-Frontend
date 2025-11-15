import React, { useEffect, useState } from 'react'
import { getCoinAPI } from '../apis'
import "./Coin.css"
import { useAppSelector } from '../../../store/hooks'
import { useNavigate } from 'react-router-dom'

interface Coin {
    id: number,
    coin: number
}

const Coin: React.FC = () => {
    const navigation = useNavigate()
    const wallet = useAppSelector((state) => state.user.wallet);
  return (
    <button className="coin-button" onClick={() => navigation("/payment")}>
      <div className="coin-text">
        {/* {coins?.coin?.toLocaleString()} <br /> */}
        {wallet !== null ? wallet?.toLocaleString() : '...'} <br />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
    </button>
  )
}

export default Coin