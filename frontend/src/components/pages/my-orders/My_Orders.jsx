import React, { useContext, useEffect } from 'react'
import './My_Orders.css'
import { Cart_Context } from '../../context/context'
import { useNavigate } from 'react-router-dom'
import Underline from '../../navbar/Underline'
import { IMAGE_URL } from '../../../config'
const My_Orders = () => {
    const navigate = useNavigate()
    const { my_order_func, myOrder, setMyOrder } = useContext(Cart_Context)


    useEffect(() => {
        my_order_func()
    }, [])




    return (
        <div>
            <div className="my-orders">

                <h1>
                    My Orders
                    <Underline />
                </h1>

                {myOrder.length === 0 && (
                    <div className="empty-orders">
                        <h2>No Orders Yet</h2>
                        <p>You haven't placed any orders yet.</p>

                        <button onClick={() => navigate("/app/shop")}>
                            Browse Plants
                        </button>
                    </div>
                )}
                {myOrder.map((orders, index) => {

                    return (

                        <div key={index} className="order-card-my-order">
                            <h2 className="total-item-my-order">
                                Cart Items ({orders.totalItems})
                            </h2>

                            <div className="order-header">


                                <h4>
                                    {`Date: ${new Date(orders.createdAt).toLocaleString()}`}
                                </h4>

                                <span className={`status ${orders.status.toLowerCase()}`}>
                                    {orders.status}
                                </span>

                            </div>

                            {orders.items.map((item, index) => {
                                return (

                                    <React.Fragment key={index}>

                                        <div key={index} className="card-cart">

                                            <div className="card-image-div-cart">

                                                <img src={`${IMAGE_URL}/${(item.image)}`} className="card-image-cart" />
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
                                    </React.Fragment>
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