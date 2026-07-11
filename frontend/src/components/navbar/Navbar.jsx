import React, { useState, useRef, useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import './Navbar.css'
import Logo_And_Text from './Logo_And_Text';
import { Cart_Context } from '../context/context';
import { useNavigate } from 'react-router-dom';
import apiRequest from '../auth_apis/fetch_api';
const Navbar = ({ links }) => {
    const { token, setToken } = useContext(Cart_Context)
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false)
    const handleHamburger = () => {
        setIsOpen(!isOpen)
    }

    const closeMenu = () => {
        setIsOpen(false)
    }

    const logoutt = async () => {
        const confirmedd = confirm("Are you sure")
        if (confirmedd) {

            // let request_logout = await fetch("http://localhost:3000/auth/logout", {
            //     method: "POST",
            //     credentials: "include",
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem("token")}`
            //     }
            // })
            let request_logout = await apiRequest("/auth/logout", {
                method: "POST",
            })



            let response_logout = await request_logout.json()
            if (request_logout.ok) {
                localStorage.removeItem("token")

                console.log("You are going to logged out")
                setToken(null)
                navigate("/login")
                console.log("You are logged out")

            }
            else {
                console.log("lkj")
                console.log(response_logout.message)
                console.log(request_logout.status);
                console.log(request_logout.ok);
                console.log(response_logout);
            }

        }

    }
    const { totalItem } = useContext(Cart_Context)
    return (
        <>

            <nav className="navbar">
                <div className="main">



                    <div className="logo-div-flex">

                        <Logo_And_Text color='var(--primary-dark)' />
                    </div>
                    <ul className={`unordered-list ${isOpen ? "show" : ""}`}>

                        {links.map((link, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <li key={index}
                                        className="list"><NavLink onClick={closeMenu} className={({ isActive }) => (isActive ? "active-nav" : "")} to={link.path}>{link.title}
                                            {link.cart_span && <span className="absolute-span">
                                                {totalItem}
                                            </span>}
                                        </NavLink></li>



                                </React.Fragment>
                            )
                        })}
                        <li className="list"><button onClick={() => {
                            closeMenu()
                            logoutt()
                        }} className='logout-btn'>Logout</button></li>
                    </ul>
                    <div onClick={handleHamburger} className="hamsburger-div">
                        <RxHamburgerMenu size={28} />
                    </div>
                </div>
            </nav>

        </>
    )
}

export default Navbar