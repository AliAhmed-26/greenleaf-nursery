import { createBrowserRouter, Navigate, RouterProvider, useNavigate } from 'react-router-dom'
import './App.css'
import { useState, useEffect } from 'react'
import { Cart_Context } from './components/context/context'
import { Toaster, toast } from "react-hot-toast";
import router from './routes/Router'
import useProducts from './hooks/useProducts';
import useCarts from './hooks/useCarts';
import useOrders from './hooks/useOrders';
import useCheckout from './hooks/useCheckout';
import useAdminDashboard from './hooks/useAdminDashboard';
import { jwtDecode } from "jwt-decode"
import apiRequest from './components/auth_apis/fetch_api';

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"))
  let role = null;

  try {
    if (token) {
      role = jwtDecode(token).role
    }
  } catch (error) {
    console.log(error)

  }


  const { hi, active_button, setActive_button, shop_array_state, setShop_array_state, allproducts, setAllproducts, handleAll, handleIndoor, handleOutdoor, handleFlowering, handlSucculent } = useProducts()


  const { cart, setCart, addToCart, removeOne, deleteAll, totalItem, totalAmount, cart_func, shipping, totalTax, bigTotal } = useCarts()



  const { nameError, setNameError, myOrder, setMyOrder, my_order_func } = useOrders()


  const { checkout_func, formData, setFormData } = useCheckout()



  const { dashboard, dashboard_summary_admin, change_status_func, stats } = useAdminDashboard(token,role)


  useEffect(() => {
    if (token) {

      cart_func()
    }
  }, [token])



  const placeOrder = async () => {
    let request_order = await apiRequest("/order/place-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({
        phone: formData.phone
      })

    })
    let response_order = await request_order.json()
    if (!request_order.ok) {
      setNameError(response_order.message);
      return false
    }

    toast.success(response_order.message);
    setCart([])
    return true
  }
  return (
    <>
      <Cart_Context.Provider value={{ token, setToken, role, dashboard, dashboard_summary_admin, change_status_func, stats, hi, allproducts, setAllproducts, my_order_func, myOrder, setMyOrder, placeOrder, formData, setFormData, nameError, setNameError, checkout_func, cart_func, cart, setCart, shop_array_state, setShop_array_state, active_button, setActive_button, handleAll, handleIndoor, handleOutdoor, handleFlowering, handlSucculent, addToCart, removeOne, deleteAll, totalItem, totalAmount, shipping, totalTax, bigTotal }}>


        <RouterProvider router={router}>
        </RouterProvider>
        <Toaster
          position="top-right"
          containerStyle={{
            top: "50%",
            right: "20px",
            transform: "translateY(-50%)",
          }}
          toastOptions={{
            style: {
              background: "var(--primary)",
              color: "White",
              height: "60px",
              animation: "slideFromRight 0.7s ease-out",
            },
          }}
        />
      </Cart_Context.Provider>

    </>
  )
}

export default App
