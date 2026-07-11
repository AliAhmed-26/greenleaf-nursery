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

  // const navigate = useNavigate() 

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



  const { dashboard, dashboard_summary_admin, change_status_func, stats } = useAdminDashboard(token)


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

    // alert(response_order.message);
    toast.success(response_order.message);
    setCart([])
    return true
  }

  console.log("my order", myOrder)


  // const token = localStorage.getItem("token")


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





// const shop_array = [
//   {
//     'id': 1,
//     'category': "succulent",
//     "image": Echeveria_Succulent,
//     "title": "Echeveria Succulent",
//     "price": 12.99,
//     "para": "Beautiful rosette-shaped succulent perfect for sunny spots."
//   },

//   {
//     'id': 2,
//     'category': "indoor",
//     "image": Snake_Plant,
//     "title": "Snake Plant",
//     "price": 24.99,
//     "para": "Low-maintenance plant that purifies air and thrives in low light."
//   },
//   {
//     'id': 3,
//     'category': "indoor",
//     "image": Fiddle_Leaf_Fig,
//     "title": "Fiddle Leaf Fig",
//     "price": 49.99,
//     "para": "Trendy plant with large, violin-shaped leaves."
//   },
//   {
//     'id': 4,
//     'category': "indoor",
//     "image": Monstera_Deliciosa,
//     "title": "Monstera Deliciosa",
//     "price": 34.99,
//     "para": "Popular tropical plant with distinctive split leaves."
//   },
//   {
//     'id': 5,
//     'category': "indoor",
//     "image": Peace_Lily,
//     "title": "Peace Lily",
//     "price": 29.99,
//     "para": "Elegant flowering plant that helps purify indoor air."
//   },
//   {
//     'id': 6,
//     'category': "outdoor",
//     "image": Lavender,
//     "title": "Lavender",
//     "price": 18.99,
//     "para": "Fragrant purple flowers perfect for sunny gardens"
//   },
//   {
//     'id': 7,
//     'category': "flowering",
//     "image": Rose_Bush,
//     "title": "Rose Bush",
//     "price": 39.99,
//     "para": "Classic flowering shrub with beautiful blooms."
//   },
//   {
//     'id': 8,
//     'category': "indoor",
//     "image": ZZ_Plant,
//     "title": "ZZ Plant",
//     "price": 27.99,

//     "para": "Extremely hardy plant that thrives on neglect."
//   },
//   {
//     'id': 9,
//     'category': "succulent",
//     "image": Aloe_Vera,
//     "title": "Aloe Vera",
//     "price": 16.99,
//     "para": "Medicinal succulent with soothing gel inside leaves."
//   },
//   {
//     'id': 10,
//     'category': "flowering",
//     "image": Hydrangea,
//     "title": "Hydrangea",
//     "price": 42.99,
//     "para": "Stunning flowering shrub with large clusters of blooms"
//   },
//   {
//     'id': 11,
//     'category': "indoor",
//     "image": Spider_Plant,
//     "title": "Spider Plant",
//     "price": 19.99,
//     "para": "Easy-to-grow plant that produces baby plantlets."
//   },
//   {
//     'id': 12,
//     'category': "succulent",
//     "image": Jade_Plant,
//     "title": "Jade Plant",
//     "price": 22.99,
//     "para": "Symbol of good luck, this succulent is easy to care for."
//   },
// ]







// Smart plant matching engine (BEST showcase value)

// User inputs: light conditions, space, experience level, budget
// AI returns personalized matches with explanations
// "Why this plant suits you" reasoning show kar
// Technical: Embeddings, similarity matching, structured output
// Portfolio impact: High. Shows you understand matching logic.


// Inventory forecasting + demand prediction (Backend, but impressive)

// Historical sales data → predict which plants will run out
// Admin dashboard shows: "This plant will stock out in 2 weeks"
// Technical: Time-series, trend analysis
// Portfolio impact: High. Shows data thinking.