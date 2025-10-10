import React, { useEffect, useState } from 'react'
// import { getProductAPI } from '../../apis' // Comment tạm thời
import './ProductCard.css'
import { createProductAPI } from '../../apis'
import { getCoinAPI } from '../../../coin/apis'

export interface Product {
  id: number
  name: string
  description: string
  coin: number
  purchaseCount: number
  imageUrl: string
  durationDays: number
}

// Fake data để test giao diện
const fakeProducts: Product[] = [
  {
    id: 1,
    name: "AI Writing Assistant Pro",
    description: "Trợ lý viết AI chuyên nghiệp giúp bạn tạo nội dung chất lượng cao, từ blog, email đến báo cáo kinh doanh.",
    coin: 299000,
    purchaseCount: 1247,
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop&crop=center",
    durationDays: 30
  },
  {
    id: 2,
    name: "AI Image Generator Premium",
    description: "Tạo hình ảnh AI độc đáo và chuyên nghiệp chỉ với mô tả văn bản. Hỗ trợ nhiều phong cách nghệ thuật.",
    coin: 199000,
    purchaseCount: 856,
    imageUrl: "https://images.unsplash.com/photo-1686191128892-4dc8e1c5d27b?w=400&h=300&fit=crop&crop=center",
    durationDays: 7
  }
]

function ProductCard() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setProducts(fakeProducts)
      } catch (err) {
        setError('Không thể tải sản phẩm')
        console.error('Error fetching products:', err)
      } finally {
        setLoading(false)
      }
    }
    
    fetchProduct()
  }, [])

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Đang tải sản phẩm...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <p>{error}</p>
      </div>
    )
  }

  if (!products.length) {
    return (
      <div className="empty-container">
        <p>Không có sản phẩm nào</p>
      </div>
    )
  }

  const formatCoin = (coin: number) => {
    return new Intl.NumberFormat('vi-VN').format(coin)
  }

  const formatDuration = (days: number) => {
    if (days < 30) {
      return `${days} ngày`
    } else if (days < 365) {
      return `${Math.floor(days / 30)} tháng`
    } else {
      return `${Math.floor(days / 365)} năm`
    }
  }

  const handleBuyProduct = async (id: number, coin: number) => {
    const response = await getCoinAPI();
    try{
      if(response?.result.coin >= coin) {
         await createProductAPI(id);
      } else alert("Bạn không đủ Coin để thực hiện thanh toán dịch vụ") 
    } catch(err) {
      console.error("Buy wrong", err);
    }
    

  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div className="product-image-container">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.jpg' // Fallback image
              }}
            />
            <div className="product-badge">
              <span className="purchase-count">{product.purchaseCount} lượt mua</span>
            </div>
          </div>
          
          <div className="product-content">
            <div className="product-header">
              <h3 className="product-name">{product.name}</h3>
              <div className="product-duration">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12,6 12,12 16,14"/>
                </svg>
                thời gian sử dụng: {formatDuration(product.durationDays)}
              </div>
            </div>
            
            <p className="product-description">{product.description}</p>
            
            <div className="product-footer">
              <div className="product-price">
                <span className="price-label">Giá:</span>
                <span className="price-value">{formatCoin(product.coin)} coin</span>
              </div>
              
              <button className="buy-button" onClick={() => handleBuyProduct(product.id, product.coin)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L6 5H5m2 8v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>
                </svg>
                Mua ngay
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCard