import React from 'react'
import { useState, useEffect } from 'react'
import apiRequest from '../components/auth_apis/fetch_api'
const useProducts = () => {

    const [active_button, setActive_button] = useState("all")
    const [shop_array_state, setShop_array_state] = useState([])
    const [allproducts, setAllproducts] = useState([])


    const hi = async () => {
        let a = await (apiRequest("/api/my-products"))
        let b = await a.json()
        setAllproducts(b)
        setShop_array_state(b)
    }
    useEffect(() => {
        hi()
    }, [])

    const handleAll = () => {
        setActive_button("all")
        setShop_array_state(allproducts)
    }

    const handleIndoor = () => {
        setActive_button("Indoor")
        setShop_array_state(allproducts.filter(e => {
            
            return e.category === "Indoor"

        }))
    }

    const handleOutdoor = () => {
        setActive_button("Outdoor")
        setShop_array_state(allproducts.filter(e => {
            return e.category === "Outdoor"

        }))
    }

    const handleFlowering = () => {
        setActive_button("Flowering")
        setShop_array_state(allproducts.filter(e => {
            return e.category === "Flowering"
        }))
    }

    const handlSucculent = () => {

        setActive_button("Succulent")
        setShop_array_state(allproducts.filter(e => {
            return e.category === "Succulent"
        }))
    }


    return { hi, active_button, setActive_button, shop_array_state, setShop_array_state, allproducts, setAllproducts, handleAll, handleIndoor, handleOutdoor, handleFlowering, handlSucculent }
}

export default useProducts