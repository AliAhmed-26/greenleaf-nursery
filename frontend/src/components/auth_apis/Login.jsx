
import React, { useState } from 'react'
import "./Auth.css"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from './auth_backend_call'
import { useContext } from 'react'
import { Cart_Context } from '../context/context'
import toast from 'react-hot-toast'


const Login = () => {

    const { cart_func, setToken } = useContext(Cart_Context)

    // <------------ States ----------->
    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")


    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const clearInputs = () => {
        setEmail("")
        setPassword("")

    }

    // <------------ handleSubmitLogin ----------->

    const handleSubmitLogin = async () => {

        // --------- Validation -----
        setLoading(true)
        const error_message_login = await loginUser(email, password, navigate, setToken)

        if (!email || !password) {
            setError("Enter something")
        }


        if (error_message_login) {
            setError(error_message_login)
            setLoading(false)
            return

        }
        else {
            setError("")
            clearInputs()
        }
        toast.success("Logged in successfull")


        setLoading(false)
        await cart_func()



    }



    return (
        <div className='logo-body'>
            <div className="login-sign-div">
                <h1 className="welcom-login">
                    Welcome Back
                </h1>



                <div className='email-login'>
                    <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className='password-login'>
                    <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />


                </div>

                {error && <p className="error-ui">{error}</p>}

                <button className="sign-up" onClick={handleSubmitLogin} disabled={loading}>
                    {
                        !loading
                            ?

                            'Login'

                            :
                            (!error) &&
                            'Logging in.....'

                    }

                </button>

                <p className='dont-have-account'>
                    Don't have an account?

                    <span onClick={() => {
                        navigate("/sign-up")
                        setError("")
                        clearInputs()
                    }} style={{ cursor: 'pointer', color: 'blue' }}>Signup</span>
                </p>
            </div>
        </div>
    )
}

export default Login