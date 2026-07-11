
// <------------ registerUser ----------->

import apiRequest from "./fetch_api"

export const registerUser = async (name, email, password,confirm_password) => {

    // ------ REQUEST_SIGN------

    const request_sign = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            email,
            password,
            confirm_password
        })
    })


    // ------------ RESPONSE_SIGN- -----------

    const response_sign = await request_sign.json()


    if (request_sign.ok) {
        console.log("Success")
        return null
    }
    else {
        console.log("Failed")
        console.log(response_sign.message)
        return response_sign.message
    }
}





// <------------ handleLogin ----------->

// export const loginUser = async (email, password, navigate) => {

//     // --------- REQUEST_LOGIN ------
//     const request_login = await fetch("http://localhost:3000/auth/login", {

//         method: "POST",
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             email,
//             password
//         }
//         )
//     })
//     // --------- RESPONSE_LOGIN ------

//     const response_login = await request_login.json()
//     if (request_login.ok) {
//         console.log("Success")
//         console.log(response_login)
//         localStorage.setItem("token", response_login.accessToken)



//         // let request_check_user = await fetch("http://localhost:3000/auth/me", {
//         //     method: "POST",
//         //     headers: {

//         //         Authorization: `Bearer ${localStorage.getItem("token")}`
//         //     }
//         // })

//         let request_check_user = await apiRequest("/auth/me", {
//             method: "POST",

//         })
//         let response_check_user = await request_check_user.json()



//         console.log("User printing")
//         console.log(response_check_user)

//         console.log(localStorage.getItem("token"));
//         console.log(response_check_user)

//         if (response_check_user.user.role === "admin") {
//             console.log("'/admin/dashboard'")
//             navigate('/admin/dashboard')
//         }
//         else {

//             navigate('/app/home')
//         }



//         return null
//     }
//     else {
//         console.log("Failed")
//         return response_login.message
//     }

// }





export const loginUser = async (email, password, navigate, setToken) => {
    try {
        const request_login = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password
            })
        })

        const response_login = await request_login.json()

        if (request_login.ok) {
            localStorage.setItem("token", response_login.accessToken)

            setToken(response_login.accessToken)

            let request_check_user = await apiRequest("/auth/me", {
                method: "POST",
            })

            // ✅ YEH CHECK ADD KAR
            if (!request_check_user) {
                return "Session expired during login"
            }

            let response_check_user = await request_check_user.json()

            if (response_check_user?.user?.role === "admin") {
                navigate('/admin/dashboard')
            } else {
                navigate('/app/home')
            }

            return null
        } else {
            return response_login.message || "Login failed"
        }
    } catch (error) {
        console.error("Login error:", error)
        return "Login error"
    }
}