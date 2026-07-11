import React, { useContext } from 'react'
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Navbar from '../navbar/Navbar';
import Footer from '../navbar/Footer';
import { Cart_Context } from '../context/context';

const Protected_Route = () => {
    
    const { role ,token} = useContext(Cart_Context)
    const navigate = useNavigate()

    if (!token) {
        return <Navigate to='/login' />
    }
    // if (role !== "admin") {
    //     console.log(role)
    //     return <Navigate to="/app/home" replace />;
    // }

    const links = (role === "user" ? [
        { title: "Home", path: "/app/home" },
        { title: "Shop", path: "/app/shop" },
        { title: "About", path: "/app/about" },
        { title: "Care", path: "/app/care" },
        { title: "My Orders", path: "/app/my-orders" },
        { title: "Cart", path: "/app/cart", cart_span: true },
    ] : [
        { title: "Home", path: "/app/home" },
        { title: "Shop", path: "/app/shop" },
        { title: "About", path: "/app/about" },
        { title: "Care", path: "/app/care" },
        { title: "Admin Panel", path: "/admin/dashboard" },
        // { title: "Cart", path: "/app/cart", cart_span: true },
    ])

    return (
        <>
            <Navbar

                links={links}

            /><Outlet /><Footer />
        </>
    )

}

export default Protected_Route