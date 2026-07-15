import apiRequest from "./fetch_api"

// <------------ registerUser ----------->
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const registerUser = async (name, email, password, confirm_password) => {

    // ------ REQUEST_SIGN------

    const request_sign = await fetch(`${BASE_URL}/auth/register`, {
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


    // <------------ RESPONSE_SIGN- ----------->

    const response_sign = await request_sign.json()


    if (request_sign.ok) {
        return null
    }
    else {
        return response_sign.message
    }
}

// <------------ handleLogin ----------->

export const loginUser = async (email, password, navigate, setToken) => {
    try {
        // <------------ REQUEST_SIGN- ----------->

        const request_login = await fetch(`${BASE_URL}/auth/login`, {
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
        // <------------ RESPONSE_SIGN- ----------->

        const response_login = await request_login.json()

        if (request_login.ok) {
            localStorage.setItem("token", response_login.accessToken)

            setToken(response_login.accessToken)

            let request_check_user = await apiRequest("/auth/me", {
                method: "POST",
            })
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
        return "Login error"
    }
}