import apiRequest from "../../auth_apis/fetch_api"

// ---------- Increase Quantity -------
export const decrease_backend = async (productId) => {

    const request_decrease = await apiRequest("/cart/decrease", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId,

        })
    }).catch(() => { console.log("Something went wrong") })

    const response_decrease = await request_decrease.json()

    if (request_decrease.ok) {
        return response_decrease
    }
    else {
        return response_decrease.message
    }

}

// ---------- Decrese Quantity -------


export const add_backend = async (productId) => {
    
    
    const request_add = await apiRequest("/cart/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            productId,

        })
    }).catch(() => { console.log("Something went wrong") })

    const response_add = await request_add.json()

    if (request_add.ok) {
        
        return response_add
    }
    else {
        return response_add.message
    }

}


// ---------- Remove Item -------


export const remove__from_backend = async (productId) => {
    
    const request_remove = await apiRequest("/cart/remove", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            },
        body: JSON.stringify({
            productId,

        })
    }).catch(() => { console.log("Something went wrong") })

    const response_remove = await request_remove.json()

    if (request_remove.ok) {
        
        return response_remove
    }
    else {
        return response_remove.message
    }

}
