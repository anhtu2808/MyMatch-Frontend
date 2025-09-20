import React, { useEffect, useState } from 'react'
import { getCoinAPI } from '../apis'

interface Coin {
    id: number,
    coin: number
}

const Coin: React.FC = () => {
    const [coins, setCoin] = useState<Coin | null>(null) 

    useEffect(() => {
      const token = localStorage.getItem("accessToken");
      if (!token) return; // chưa login thì thôi, không gọi API
        const fetchCoin = async () => {
            const response = await getCoinAPI();
            setCoin(response.result)
        }
        fetchCoin()
    }, [])
  return (
    <div>Coin: {coins?.coin}</div>
  )
}

export default Coin