import React from 'react'
import Navbar from '../components/navbar/Navbar'
import Home from '../components/pages/home/Home'
import Shop from '../components/pages/shop/Shop'
import About from '../components/pages/about/About'
import Care from '../components/pages/care/Care'
import Cart from '../components/pages/cart/Cart'
import Footer from '../components/navbar/Footer'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import Auth from '../components/auth_apis/Auth'
import Protected_Route from '../components/protectedroute/Protected_Route'
import Public_Route from '../components/navbar/Public_Route'
import Checkout from '../components/pages/cart/Checkout'
import My_Orders from '../components/pages/my-orders/My_Orders'
import Admin_Dashboard from '../components/pages/admin/admin-dashboared/Admin_Dashboard'
// import Admin_Navbar from '../components/pages/admin/Admin_Navbar'
import Admin_Products from '../components/pages/admin/admin-products/Admin_Products'
import Admin_Navbar from '../components/pages/admin/admin-navbar/Admin_Navbar'
import Admin_Edit from '../components/pages/admin/admin-products/Admin_Edit'
import Admin_Add from '../components/pages/admin/admin-products/Admin_Add'
import Admin_Orders from '../components/pages/admin/admin-orders/Admin_Orders'
import Admin_Protected_Route from '../components/protectedroute/Admin_Protected_Route'
import Login from '../components/auth_apis/Login'
import SignUp from '../components/auth_apis/Sign_Up'
import Otp from '../components/auth_apis/Otp'

const router = createBrowserRouter([

  {
    path: '/',
    element: <Navigate to='/login' replace />
  },
  {
    element: <Public_Route />,
    children: [
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/sign-up",
        element: <SignUp/>,
      },
      {
        path: "/verify-otp",
        element: <Otp/>
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin_Protected_Route />,
    children: [
      {
        path: 'dashboard',
        element: <Admin_Dashboard />
      },
      {
        path: 'products',
        element: <Admin_Products />,
        children: [
          {
            path: '/admin/products/edit/:id',
            element: <Admin_Edit />
          },
          {
            path: '/admin/products/add-product',
            element: <Admin_Add />
          },
        ]

      },
      {
        path: 'orders',
        element: <Admin_Orders />
      }
    ]
  },
  {
    path: '/app',
    element: <Protected_Route />,
    children: [
      {
        // index: true,
        path: "home",
        element: <Home />
      },
      {
        path: 'shop',
        element: <Shop />
      },
      {
        path: 'about',
        element: <About />
      },
      {
        path: 'care',
        element: <Care />
      },
      
      {
        path: 'cart',
        element: <Cart />,

      },
      {
        path: 'my-orders',
        element: <My_Orders />

      },
      {
        path: 'cart/checkout',
        element: <Checkout />
      }
    ],
  }
])

export default router