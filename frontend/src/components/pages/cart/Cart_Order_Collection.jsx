import React from 'react'
import { useNavigate } from 'react-router-dom';
import { FaPlus, FaMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useContext } from 'react'
import { Cart_Context } from '../../context/context.js'
import { add_backend, decrease_backend, remove__from_backend } from './cart_backend_call.js';
const Cart_Order_Collection = () => {
    const navigate = useNavigate()
    const { cart, addToCart, removeOne, deleteAll, totalItem, totalAmount, shipping, totalTax, bigTotal } = useContext(Cart_Context)
    return (

        <div className="card-section-cart">

            <h2 className="total-item">
                Cart Items ({totalItem})
            </h2>

            {
                (cart.length === 0) &&
                <div className='empty-cart-collection-div'>

                    <p className='empty-cart-collecton'>Your cart is empty. Start adding some plants!</p>
                    <button onClick={() => { navigate("/app/shop") }} className="browse-plant-button">Browse Plant</button>
                </div>
            }
            {cart.map((item) => {
                return (
                    <React.Fragment key={item.productId._id}>
                        <div className="card-cart">

                            <div className="card-image-div-cart">

                                <img src={`http://localhost:3000/images/${(item.productId.image)}`} className="card-image-cart" />
                            </div>

                            <div className="card-info-cart">
                                <h3 className="card-heading-of-home-shop-hi">{item.productId.title}</h3>
                                <h3 className="price-of-home-shop-hi">
                                    {`$${item.productId.price}`}
                                </h3>
                                <p className="card-description-of-home-shop-hi">{item.productId.para}</p>
                                <div className="button-div-cart">

                                    <button onClick={async () => {
                                        await decrease_backend(item.productId._id)
                                        await removeOne(item)
                                    }} className="circle-btn">
                                        <FaMinus className='minus-cart' />
                                    </button>
                                    <p>
                                        {item.qty}
                                    </p>
                                    <button onClick={async () => {
                                        console.log("PLUS CLICKED");
                                        await add_backend(item.productId._id)
                                        await addToCart(item.productId)
                                    }} className="circle-btn">
                                        <FaPlus className='plus-cart' />
                                    </button>
                                    <h3 className="remove-cart" onClick={async () => {
                                        await remove__from_backend(item.productId._id)
                                        await deleteAll(item.productId)
                                    }}>

                                        <FaTrash className='trash' />
                                        Remove
                                    </h3>
                                </div>
                            </div>
                            <h3 className="amount-per-item">
                                {`$${(item.qty * item.productId.price).toFixed(2)}`}
                            </h3>
                        </div>
                    </React.Fragment>
                )
            })}
        </div>

    )
}

export default Cart_Order_Collection