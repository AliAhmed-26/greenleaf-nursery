import React from 'react'
import { useState } from 'react'
import apiRequest from '../components/auth_apis/fetch_api'
const useOrders = () => {


    const [nameError, setNameError] = useState("")


    const [myOrder, setMyOrder] = useState([])

    const my_order_func = async () => {
        // let request_my_order = await fetch("http://localhost:3000/order/my-orders", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${localStorage.getItem("token")}`
        //     },
        // })
        let request_my_order = await apiRequest("/order/my-orders", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })

        let response_my_order = await request_my_order.json()
        if (!request_my_order.ok) {
            setNameError(response_my_order.message);
            return;
        }

        setMyOrder(response_my_order)
    }
    return {
        nameError, setNameError, myOrder, setMyOrder, my_order_func
    }
}

export default useOrders