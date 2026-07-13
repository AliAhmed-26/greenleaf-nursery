import React from 'react'
import { useState } from 'react';
import { toast } from "react-hot-toast";
import apiRequest from '../components/auth_apis/fetch_api';
const useCarts = () => {

    const [cart, setCart] = useState([])

    const cart_func = async () => {
                
        let request_cart = await apiRequest("/cart/myProducts", {
            method: "POST",
        })

        let response_cart = await request_cart.json()
        
        if (request_cart.ok && Array.isArray(response_cart)) {

            setCart(response_cart)

        }
        else {
            setCart([])

        }
    }


    const addToCart = (item) => {
        const existing = cart.find(e => e._id === item._id);

        if (existing) {
            const update = cart.map(it =>
                it._id === item._id ? { ...it, qty: it.qty + 1 } : it
            );


            toast.success(`${item.title} quantity updated`);
        } else {

            toast.success(`${item.title} added to cart`);
        }
        
        cart_func()
    };

    const removeOne = (item) => {
        if (item.qty > 1) {
            const update = cart.map(it => {
                return it._id === item._id ? { ...it, qty: it.qty - 1 } : { ...it }
            })
        }
        else {
            const remove = cart.filter(i => {
                return i._id !== item._id
            })
        }
        cart_func()

    }

    const deleteAll = (item) => {
        const remove_all = cart.filter(i => {
            return i._id !== item._id
        })
        toast.success(`${item.title} removed from cart`)
        cart_func()

    }
    let totalItem = 0
    let totalAmount = 0;
    try {

        totalItem = cart.reduce((sum, item) => {
            return (sum + item.qty)
        }, 0)

        totalAmount = cart.reduce((sum, item) => {
            return (sum + (item.qty * item.productId.price))
        }, 0)
    } catch (error) {
        console.log(error)
    }


    // const totalItem = 9
    // const totalAmount = 9

    const shipping = 5.99
    const totalTax = (totalAmount * 7.5 / 100).toFixed(2)
    const bigTotal = (totalAmount + shipping + totalTax * 1)


    return {
        cart, setCart, addToCart, removeOne, deleteAll, totalItem, totalAmount, cart_func, shipping, totalTax, bigTotal
    }
}

export default useCarts