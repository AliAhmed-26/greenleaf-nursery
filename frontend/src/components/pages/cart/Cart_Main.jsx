import React, { useContext } from 'react'
import './Cart_Main.css'
import { Cart_Context } from '../../context/context'
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { add_backend, decrease_backend, remove__from_backend } from './cart_backend_call';
import Cart_Order_Collection from './Cart_Order_Collection';
import Cart_Order_Summary from './Cart_Order_Summary';
const Cart_Main = () => {
  const { cart, addToCart, removeOne, deleteAll, totalItem, totalAmount, shipping, totalTax, bigTotal } = useContext(Cart_Context)


  return (
    <>
      <div className="card-summary-section-cart">
        <Cart_Order_Collection />
        <Cart_Order_Summary showCheckOutBtn = {true} />

      </div>
    </>
  )
}

export default Cart_Main