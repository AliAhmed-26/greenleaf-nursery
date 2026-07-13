import React, { useContext } from 'react'
import { Cart_Context } from '../context/context'
import { Navigate, Outlet } from 'react-router-dom'
import Admin_Navbar from '../pages/admin/admin-navbar/Admin_Navbar'
import Footer from '../navbar/Footer'

const Admin_Protected_Route = () => {

    const { role, token } = useContext(Cart_Context)

    if (!token) {
        return <Navigate to='/login' />
    }
    if (!role) {
        return
    }
    if (role !== "admin") {
        return <Navigate to='/app/home' replace />
    }
   
    return <>
        <Admin_Navbar />
        <Outlet />
        <Footer />

    </>
}

export default Admin_Protected_Route