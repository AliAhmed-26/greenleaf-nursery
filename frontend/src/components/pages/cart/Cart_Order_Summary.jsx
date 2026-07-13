import React, { useContext } from 'react'
import { Cart_Context } from '../../context/context.js'
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import { useLocation } from "react-router-dom";
import Checkout from './Checkout.jsx';


const Cart_Order_Summary = () => {
    const navigate = useNavigate();
    const { my_order_func, placeOrder, setNameError, cart, setCart, addToCart, removeOne, deleteAll, totalItem, totalAmount, shipping, totalTax, bigTotal } = useContext(Cart_Context)

    const location = useLocation();
    const isCheckout = location.pathname === "/app/cart/checkout";
    

    const handlePlaceOrder = async () => {
        const success = await placeOrder();

        if (success) {
            navigate("/app/my-orders");
        }
        
    }

    

    return (
        <div className="summary-cart">
            <h2 className="order-summary">
                Order Summary
            </h2>
            <div className="expense-detail-cart">
                <div className="subtotal">
                    <p className="subtotal-para">

                        Subtotal
                    </p>
                    <p className="subtotal-amount">

                        {`$${(totalAmount).toFixed(2)}`}
                    </p>
                </div>
                <div className="shipping">
                    <p className="shipping-para">

                        Shipping
                    </p>
                    <p className="shipping-amount">

                        {`$${shipping}`}
                    </p>
                </div>
                <div className="tax">
                    <p className="tax-para">

                        Tax
                    </p>
                    <p className="tax-amount">

                        {`$${totalTax}`}
                    </p>
                </div>
                <div className="line-cart">

                </div>
                <div className="total-amount">
                    <h2 className="total-amount-para">

                        Total
                    </h2>
                    <h2 className="total-amount-amount">

                        {`$${bigTotal.toFixed(2)}`}
                    </h2>
                </div>
                {
                    !isCheckout ? (cart.length > 0 ? (<button onClick={() => {
                        navigate("checkout")
        
                    }} className="proceed-to-checkout">Proceed to Checkout</button>) : (<button onClick={() => navigate("checkout")} className="proceed-to-checkout-disable proceed-to-checkout" disabled={true}>Proceed to Checkout</button>))
                        : (<button className="proceed-to-checkout" onClick={() => {
                            handlePlaceOrder()   
                        }} >Place the order</button>)

                }
            </div>
        </div >
    )
}

export default Cart_Order_Summary