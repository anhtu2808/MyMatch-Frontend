import React, { useEffect, useState } from 'react'
import { getCoinAPI } from '../apis'
import "./Coin.css"

interface Coin {
    id: number,
    coin: number
}

const Coin: React.FC = () => {
    const [coins, setCoin] = useState<Coin | null>(null) 

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;
        const fetchCoin = async () => {
          try {
            const response = await getCoinAPI();
            setCoin(response.result)
          } catch (err) {
            console.error("Error fetch coin", err)
          }
        }
        fetchCoin()
    }, [])
  return (
    <div className="coin-button">
      <div className="coin-text">
        {coins?.coin} <br />
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-dollar-sign-icon lucide-circle-dollar-sign"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"/><path d="M12 18V6"/></svg>
    </div>
  )
}

export default Coin