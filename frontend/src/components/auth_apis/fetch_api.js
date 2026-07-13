// <------------ Helper function for authenticated API requests ----------->

const apiRequest = async (argumental_url, option = {}) => {
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

    let access_token = localStorage.getItem("token")
    try {


        let request_api_request = await fetch(BASE_URL + argumental_url, {
            ...option,
            credentials: "include",
            headers: {
                ...option.headers,
                ...(access_token && { Authorization: `Bearer ${access_token}` })
            },
        })



        if (request_api_request.status === 400) {
            return request_api_request
        }

        // Access token expired ----> generate a new one using refresh token

        else if (request_api_request.status === 401) {


            let request_refresh = await fetch(`${BASE_URL}/auth/refresh-token`, {
                method: "POST",
                credentials: "include",
            })

            let response_refresh = await request_refresh.json()

            // Refresh token also expired ----> force user to login again

            if (!request_refresh.ok) {
                localStorage.removeItem("token")
                window.location.href = "/login"

                throw new Error("Session expired");


            }

            localStorage.setItem("token", response_refresh.accessToken)

            access_token = response_refresh.accessToken


            // Retry the original request with the new access token

            let request_again = await fetch(BASE_URL + argumental_url, {
                ...option,
                credentials: "include",
                headers: {
                    ...option.headers,
                    Authorization: `Bearer ${access_token}`
                }
            })


            return request_again
        }

        else {
            return request_api_request
        }
    } catch (error) {
        console.error("API Error:", error);
        throw error
    }
}

export default apiRequest;
