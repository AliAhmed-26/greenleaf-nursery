import React from 'react'
import { useState } from 'react';
import apiRequest from '../components/auth_apis/fetch_api';
const useCheckout = () => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        country: "",

    });

    const checkout_func = async () => {

        let checkout_request = await fetch("http://localhost:3000/auth/me", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },

        })
        // let checkout_request = await apiRequest("/auth/me", {
        //     method: "GET",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },

        // })

        let checkout_response = await checkout_request.json()

        setFormData({
            ...formData,
            name: checkout_response.user.name,
            email: checkout_response.user.email
        })
        console.log(checkout_response)
    }




    return { checkout_func, formData, setFormData }
}

export default useCheckout