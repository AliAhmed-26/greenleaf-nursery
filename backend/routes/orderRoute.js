import express from "express"
import auth_middleware from "../middleware/userMiddleware.js"
import Order from "../models/orderModel.js"
import Cart from "../models/cartModel.js"
import User from "../models/userModel.js"

const router = express.Router()

// ======================================================
// Place Order
// Creates a new order using the current user's cart items
// ======================================================

router.post("/place-order", auth_middleware, async (req, res) => {

    try {

        // <------- Get all products currently in the logged-in user's cart ------->
        // <------- populate() replaces productId with the complete Product document ------->

        const find_cart = await Cart.find({
            userId: req.user.id
        }).populate("productId")

        // <----- Prevent placing an order if the cart is empty ------>

        if (find_cart.length === 0) {
            return res.json({
                message: "Add something to cart"
            })
        }

        // <------- Convert cart items into the structure required for storing inside the Order collection ----->

        const find_cart_map = find_cart.map((item) => {
            return ({
                productId: item.productId._id,
                price: item.productId.price,
                qty: item.qty,
                image: item.productId.image,
                title: item.productId.title

            })
        })

        // <------------- Calculations ------------>

        const total = find_cart.reduce((sum, item) => {
            return (sum + (item.qty * item.productId.price))
        }, 0)

        const shipping = 5.99
        const totalTax = (total * 7.5 / 100).toFixed(2)
        const totalAmount = (total + shipping + totalTax * 1)


        const totalItems = find_cart.reduce((sum, item) => {
            return (sum + item.qty)
        }, 0)

        // <------ Fetch logged-in user's information so name and email can be saved with the order ------>

        const user_datails = await User.findOne({ _id: req.user.id })

        if (!user_datails) {
            return res.status(404).json({
                message: "User not found"
            })
        }



        if (!req.body.phone) {
            return res.status(400).json({
                message: "Phone and country are required"
            });
        }


        const place_order = await Order.create({
            userId: req.user.id,
            items: find_cart_map,
            totalItems: totalItems,
            totalAmount: totalAmount,
            name: user_datails.name,
            email: user_datails.email,
            phone: req.body.phone,
            country: req.body.country,
        })

        // Empty the user's cart after a successful order

        const cart_empty = await Cart.deleteMany({
            userId: req.user.id
        })

        return res.status(201).json({
            message: "Order placed successfully",
            order: place_order
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
})

// ======================================================
// Get all orders of the logged-in user
// ======================================================

router.post('/my-orders', auth_middleware, async (req, res) => {
    const my_orders = await Order.find({
        userId: req.user.id
    })

    // <------- Return an empty array if no orders exist -------->

    if (my_orders.length === 0) {
        return res.status(200).json([])
    }

    // <--------- Send all orders to the frontend -------->

    return res.status(200).json(my_orders);
})

export default router

