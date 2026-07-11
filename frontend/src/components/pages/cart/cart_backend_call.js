import apiRequest from "../../auth_apis/fetch_api"

// ---------- Increase Quantity -------
export const decrease_backend = async (productId) => {
    // const request_decrease = await fetch("http://localhost:3000/cart/decrease", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`

    //     },
    //     body: JSON.stringify({
    //         productId,

    //     })
    // }).catch(() => { console.log("Something went wrong") })
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
        console.log("ok-decrease")
        return response_decrease
    }
    else {
        console.log("not ok-decrease")
        console.log(response_decrease.message)
        return response_decrease.message
    }

}

// ---------- Decrese Quantity -------


export const add_backend = async (productId) => {
    console.log("Frontend add_backend called");
    // const request_add = await fetch("http://localhost:3000/cart/add", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`
    //     },
    //     body: JSON.stringify({
    //         productId,

    //     })
    // }).catch(() => { console.log("Something went wrong") })
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
        console.log("ok")
        return response_add
    }
    else {
        console.log("not ok")
        console.log(response_add.message)
        return response_add.message
    }

}


// ---------- Remove Item -------


export const remove__from_backend = async (productId) => {
    // const request_remove = await fetch("http://localhost:3000/cart/remove", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("token")}`
    //     },
    //     body: JSON.stringify({
    //         productId,

    //     })
    // }).catch(() => { console.log("Something went wrong") })
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
        console.log("ok-remove")
        return response_remove
    }
    else {
        console.log("not ok")
        console.log(response_remove.message)
        return response_remove.message
    }

}
