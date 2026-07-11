import React, { useContext } from 'react'
import { useState, useEffect } from 'react'
import apiRequest from '../components/auth_apis/fetch_api';
import { Cart_Context } from '../components/context/context';

const useAdminDashboard = (token) => {

    // const {token} = useContext(Cart_Context)

    const [dashboard, setDashboard] = useState({
        total_products_admin: 0,
        total_orders_admin: 0,
        total_users_admin: 0,
        total_pendings_admin: 0,
        recent_users_admin: [],
        low_stock_admin: [],
        recent_orders_admin: [],
    });





    const dashboard_summary_admin = async () => {
        // let request_dashboard = await fetch("http://localhost:3000/admin/dashboard", {
        //     headers: {
        //         Authorization: `Bearer ${localStorage.getItem("token")}`
        //     }
        // })
        let request_dashboard = await apiRequest("/admin/dashboard", {

        })
        let response_dashboard = await request_dashboard.json()

        // if (!response_dashboard) {

        //     setDashboard()
        // }
        setDashboard(response_dashboard)

        // console.log(`response dashboard ${response_dashboard}`)
        console.log("response dashboard")
        console.log(response_dashboard)

    }



    useEffect(() => {
        if (token) {

            dashboard_summary_admin()
        }
    }, [token])



    const change_status_func = async (id, status) => {
        // let request_upd_status = await fetch(`http://localhost:3000/admin/update-action/${id}`, {
        //     method: "PUT",
        //     headers: {
        //         "Content-Type": "application/json",
        //         Authorization: `Bearer ${localStorage.getItem("token")}`
        //     },
        //     body: JSON.stringify({
        //         status: status
        //     })
        // })
        let request_upd_status = await apiRequest(`/admin/update-action/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                status: status
            })
        })

        let reponse_upd_status = await request_upd_status.json()

    }


    const stats = [
        {
            title: "Total Products",
            value: dashboard.total_products_admin
        },
        {
            title: "Total Orders",
            value: dashboard.total_orders_admin
        },
        {
            title: "Total Customers",
            value: dashboard.total_users_admin
        },
        {
            title: "Pending Orders",
            value: dashboard.total_pendings_admin
        }
    ];





    return {
        stats,
        dashboard,
        dashboard_summary_admin,
        change_status_func,
    };
}

export default useAdminDashboard