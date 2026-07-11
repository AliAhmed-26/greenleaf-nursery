import React from 'react'
import './Cart.css'
import Underline from '../../navbar/Underline'
import Cart_Main from './Cart_Main'

const Cart = () => {
  return (
    <div className='light-bg-cart'>
      <h1 className="heading-cart">Your Shopping Cart</h1>
      <Underline />
      <Cart_Main/>
    </div>
  )
}

export default Cart