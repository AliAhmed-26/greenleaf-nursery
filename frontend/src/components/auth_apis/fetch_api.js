const apiRequest = async (argumental_url, option = {}) => {
    const BASE_URL = "http://localhost:3000"

    let access_token = localStorage.getItem("token")

    let request_api_request = await fetch(BASE_URL + argumental_url, {
        ...option,
        credentials: "include",
        headers: {
            ...option.headers,
            ...(access_token && { Authorization: `Bearer ${access_token}` })
        },
    })

    // let response_api_request = await request_api_request.json()


    if (request_api_request.status === 400) {
        console.log("fetch appi 23")
        return request_api_request
    }
    else if (request_api_request.status === 401) {
        console.log("fetch-api 25")


        let request_refresh = await fetch(`${BASE_URL}/auth/refresh-token`, {
            method: "POST",
            credentials: "include",
        })

        let response_refresh = await request_refresh.json()


        if (!request_refresh.ok) {
            localStorage.removeItem("token")
            window.location.href = "/login"
            console.log("Expiredddddddddddddddddddddd")
            alert("DF")
            throw new Error("Session expired");


        }
        console.log("New access token generated")
        localStorage.setItem("token", response_refresh.accessToken)

        access_token = response_refresh.accessToken

        console.log("DFDFDFSfsd", access_token)


        // Again request

        let request_again = await fetch(BASE_URL + argumental_url, {
            ...option,
            credentials: "include",
            headers: {
                ...option.headers,
                Authorization: `Bearer ${access_token}`
            }
        })

        // let response_again = await request_again.json()

        return request_again
    }

    else {
        return request_api_request
    }
}

export default apiRequest;





// const apiRequest = async (argumental_url, option = {}) => {
//     const BASE_URL = "http://localhost:3000"

//     let access_token = localStorage.getItem("token")

//     let request_api_request = await fetch(BASE_URL + argumental_url, {
//         ...option,
//         credentials: "include",
//         headers: {
//             ...option.headers,
//             ...(access_token && { Authorization: `Bearer ${access_token}` })
//         },
//     })

//     // let response_api_request = await request_api_request.json()

//     if (request_api_request.status !== 401) {
//         console.log("fetch 18")
//         return request_api_request
//     }
//     if (request_api_request.status !== 400) {
    //         console.log("fetch 18euiow")
//         return request_api_request
//     }
    
//     let request_refresh = await fetch(`${BASE_URL}/auth/refresh-token`, {
//         method: "POST",
//         credentials: "include",
//     })

//     let response_refresh = await request_refresh.json()


//     if (!request_refresh.ok) {
//         localStorage.removeItem("token")
//         window.location.href = "/login"
//         console.log("Expiredddddddddddddddddddddd")
//         throw new Error("Session expired");


//     }
//     console.log("New access token generated")
//     localStorage.setItem("token", response_refresh.accessToken)

//     access_token = response_refresh.accessToken



//     // Again request

//     let request_again = await fetch(BASE_URL + argumental_url, {
//         ...option,
//         credentials: "include",
//         headers: {
//             ...option.headers,
//             Authorization: `Bearer ${access_token}`
//         }
//     })

//     // let response_again = await request_again.json()

//     return request_again
// }

// export default apiRequest;








