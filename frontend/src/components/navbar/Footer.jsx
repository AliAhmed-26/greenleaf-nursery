import React from 'react'
import './Footer.css'
import Logo_And_Text from './Logo_And_Text'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { FaPaperPlane } from "react-icons/fa";
const Footer = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseEnter = () => setIsHovered(true)
    const handleMouseLeave = () => setIsHovered(false)

    const handleFooterInput = (e) => {
        setEmail(e.target.value)

    }
    const handleInputSend = () => {
        if (!email.includes("@")) {
            alert("Enter proper email")
        }
        else {

        alert("Email is sent successfully")
        setEmail("")
        }
    }

    return (
        <>
            <div className="main-div-footer">

                <div className="footer-big-div">
                    <div className="green-info">
                        <Logo_And_Text />
                        <p className="para-footer">
                            Bringing the beauty of nature into your home with quality plants and expert care advice since 2010.
                        </p>
                        
                    </div>
                    <div className="quick-link">
                        <h2 className="heading-footer-quick">
                            Quick Links
                        </h2>
                        <Link className='a-footer' to='/'>Home</Link>
                        <Link className='a-footer' to="shop">Shop</Link>
                        <Link className='a-footer' to="about">About</Link>
                        <Link className='a-footer' to="care">Care</Link>
                    </div>
                    <div className="newsletter">
                        <h2 className="newsletter-footer-heading">
                            Newsletter
                        </h2>
                        <p className="para-subscribe-footer">
                            Subscribe to get updates on new arrivals, special offers, and plant care tips.
                        </p>
                        <div>

                            <div className="footer-input-btn-div">

                                <input onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave} className='footer-input' type="text" value={email} onChange={handleFooterInput} placeholder='Enter your email' />
                                <button onClick={handleInputSend} className="footer-email-btn"><FaPaperPlane className='footer-send-icon' /></button>
                            </div>
                            <div>

                                
                                {isHovered && !email.includes("@") && (
                                    <p className="error-text">Please include an '@' in your email address. '{email}' is missing an '@'</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="white-line"></div>
                <div className="copy-right"> © 2026 GreenLeaf Nursery. All rights reserved.</div>
            </div>
        </>
    )
}

export default Footer

