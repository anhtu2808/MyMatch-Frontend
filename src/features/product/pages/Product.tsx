import React from 'react'
import Header from '../../../components/header/Header'
import Sidebar from '../../../components/sidebar/Sidebar'
import ProductCard from '../components/card/ProductCard'

function Product() {
  return (
    <div className='product-container'>
      <Header title='Sản phẩm' script='Các gói sản phẩm AI' />
      <Sidebar />
      <div className='main-content-product'>
        <ProductCard />
      </div>
    </div>
  )
}

export default Product