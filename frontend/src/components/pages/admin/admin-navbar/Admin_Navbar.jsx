import React, { useState, useRef, useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
// import './Admin_Navbar.css'
// import Logo_And_Text from '../../navbar/Logo_And_Text';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../navbar/Navbar';
import Footer from '../../../navbar/Footer'
const Admin_Navbar = () => {
    return (
        <>
            <Navbar
                circle={false}
                links={[
                    { title: "Dashboard", path: "/admin/dashboard" },
                    { title: "Products", path: "/admin/products" },
                    { title: "Visit Store", path: "/app/home" },
                    
                ]}
            />
            

        </>
    )
}
export default Admin_Navbar;