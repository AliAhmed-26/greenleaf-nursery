import React, { useContext, useEffect } from 'react'
import './My_Orders.css'
import { Cart_Context } from '../../context/context'
const My_Orders = () => {

    const { my_order_func, myOrder, setMyOrder } = useContext(Cart_Context)


    useEffect(() => {
        my_order_func()
    }, [])


    console.log(`My order printing `)
    console.log(myOrder)


    return (
        <div>
            <div className="my-orders">

                <h1>My Orders</h1>
                <p className="subtitle">
                    View all your previous purchases.
                </p>
                {myOrder.map((orders, index) => {

                    return (

                        <div className="order-card-my-order">
                            <h2 className="total-item-my-order">
                                Cart Items ({orders.totalItems})
                            </h2>

                            <div className="order-header">


                                <h4>
                                    {`Date: ${new Date(orders.createdAt).toLocaleString()}`}
                                </h4>

                                <span className="pending">
                                    {orders.status}
                                </span>

                            </div>

                            {orders.items.map((item) => {
                                return (

                                    <>

                                        <div key={index} className="card-cart">

                                            <div className="card-image-div-cart">

                                                <img src={`http://localhost:3000/images/${(item.image)}`} className="card-image-cart" />
                                            </div>

                                            <div className="card-info-cart">
                                                <h3 className="card-heading-of-home-shop-hi">{item.title}</h3>
                                                <h3 className="price-of-home-shop-hi">
                                                    {`$${item.price}`}
                                                </h3>
                                                <p className="card-description-of-home-shop-hi">{item.para}</p>
                                                <div className="button-div-cart">


                                                    <p>
                                                        {(`x ${item.qty}`)}
                                                    </p>

                                                    <h3 className="remove-cart">
                                                    </h3>
                                                </div>
                                            </div>
                                            <h3 className="amount-per-item">
                                                {`$${(item.qty * item.price).toFixed(2)}`}
                                            </h3>
                                        </div>
                                    </>
                                )
                            })}

                            <div className="order-footer">

                                <div>
                                    <h3>Order #{orders._id.slice(-6)}</h3>
                                </div>
                                <div>

                                    <h3>{`Total : $${orders.totalAmount.toFixed(2)}`}</h3>



                                </div>

                            </div>

                        </div>

                    )
                })}
            </div>
        </div>
    )
}

export default My_Orders