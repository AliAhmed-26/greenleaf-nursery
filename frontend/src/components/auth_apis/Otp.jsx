import { useState } from "react";
import "./Otp.css";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { Toaster, toast } from "react-hot-toast";


const Otp = () => {
    const location = useLocation()

    if (!location.state) {
        return <Navigate to='/login' />
    }

    const navigate = useNavigate()
    const [otp, setOtp] = useState("");
    const [otpError, setOtpError] = useState("")
    const [loading_otp, setloading_otp] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setloading_otp(true)

        console.log("Frontend", otp);

        let request_otp = await fetch("http://localhost:3000/auth/verification", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: location.state.email,
                name: location.state.name,
                password: location.state.password,
                otp: otp
            })
        })
        let response_otp = await request_otp.json()
        if (!request_otp.ok) {
            setOtpError(response_otp.message)
            console.log(response_otp.message)
            setloading_otp(false)
            return
        }
        else {
            setOtpError("")
            toast.success("Your account created successfully")
            navigate("/login")
            setloading_otp(false)
        }
    };

    return (
        <div className="login-signup-container">
            <form className="login-signup-form" onSubmit={handleSubmit}>

                <h2>Verify Your Email</h2>

                <p>
                    Enter the 6-digit verification code sent to your email address.
                </p>
                <input
                    type="text"
                    placeholder="Enter OTP"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={6}
                    value={otp}
                    onChange={(e) =>{ setOtp(e.target.value)
                        setOtpError("")
                    }}
                />
                {otpError && <p className="error-ui">{otpError}</p>}

                <button disabled={loading_otp} type="submit">
                    {loading_otp ? "Verifying..." : "Verify OTP"}
                </button>

            </form>
        </div>
    );
};

export default Otp;