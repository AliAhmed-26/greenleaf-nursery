import React from 'react'
import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { Cart_Context } from '../context/context'

const Public_Route = () => {
    const { token } = useContext(Cart_Context)
    return token ? <Navigate to='app/home' replace /> : <Outlet />

}

export default Public_Route