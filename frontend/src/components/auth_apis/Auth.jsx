
import React, { useState } from 'react'
import "./Auth.css"
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from './auth_backend_call'
import { useContext } from 'react'
import { Cart_Context } from '../context/context'
import Login from './Login'


const Login_SignUp = () => {

  const { cart_func, setToken } = useContext(Cart_Context)

  // <------------ States ----------->
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const clearInputs = () => {
    setName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
  }

  // <------------ handleSubmit ----------->

  const handleSubmit = async () => {

    // --------- Validation -----
    setLoading(true)
    if (isLogin) {
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

    }
    else {
      const error_messsage_sign = await registerUser(name, email, password,confirmPassword)
      if (!email || !name || !password || !confirmPassword || password.length < 5 || password !== confirmPassword) {

        setError(error_messsage_sign)

      }
      if (error_messsage_sign) {
        setError(error_messsage_sign)
      }
      else {
        setError("")
        clearInputs()
        setIsLogin(true)
      }

    }

    setLoading(false)
    await cart_func()



  }



  return (
    <Login/>
    // <div className='logo-body'>
    //   <div className="login-sign-div">
    //     <h1 className="welcom-login">
    //       {isLogin ? 'Welcome Back' : "Create Account"}
    //     </h1>

    //     {!isLogin && <div className='username-login'>
    //       <input type="text" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
    //     </div>}

    //     <div className='email-login'>
    //       <input type="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
    //     </div>

    //     <div className='password-login'>
    //       <input type="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />


    //     </div>
    //     {
    //       !isLogin && <div className='confirm-password-login'>
    //         <input type="password" placeholder='Enter your confirmed password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
    //       </div>
    //     }

    //     {error && <p className="error-ui">{error}</p>}

    //     <button className="sign-up" onClick={handleSubmit} disabled={loading}>
    //       {
    //         !loading
    //           ?
    //           (isLogin) ?
    //             'Login'
    //             : 'Sign Up'
    //           :
    //           (isLogin && !error) ?
    //             'Logging in.....'
    //             : 'Signning up.....'
    //       }

    //     </button>

    //     <p className='dont-have-account'>
    //       {isLogin ? "Don't have an account?" : "Already have an account?"}

    //       <span onClick={() => {
    //         setIsLogin(!isLogin)
    //         setError("")
    //         clearInputs()
    //       }} style={{ cursor: 'pointer', color: 'blue' }}>{isLogin ? "Sign Up" : "Login"}</span>
    //     </p>
    //   </div>
    // </div>
  )
}

export default Login_SignUp