import React, { useState } from 'react'
import './Card_Home_Shop.css'
import { Cart_Context } from '../context/context'
import { useContext } from 'react'
import { add_backend } from '../pages/cart/cart_backend_call'
import { IMAGE_URL } from '../../config'

const Card_Home_Shop = ({ item }) => {
    const { addToCart } = useContext(Cart_Context)
    return (
        <>

            <div className="card-of-home-shop">
                <img src={`${IMAGE_URL}/${(item.image)}`} className="card-image-of-home-shop" />

                <div className="div-wrapper-of-home-shop">
                    <h2 className="card-heading-of-home-shop">{item.title}</h2>
                    <h3 className="price-of-home-shop">
                        {`$${item.price}`}
                    </h3>
                    <p className="card-description-of-home-shop">{item.para}</p>
                    <button onClick={async () => {
                        await add_backend(item._id)
                        await addToCart(item)
                    }} className="add-cart-of-home-shop">Add to cart</button>
                </div>
            </div>


        </>
    )
}

export default Card_Home_Shop