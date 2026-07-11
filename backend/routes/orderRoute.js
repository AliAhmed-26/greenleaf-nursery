import express from "express"
import auth_middleware from "../middleware/userMiddleware.js"
import Order from "../models/orderModel.js"
import Cart from "../models/cartModel.js"
import User from "../models/userModel.js"

const router = express.Router()
router.post("/place-order", auth_middleware, async (req, res) => {

    try {
        const find_cart = await Cart.find({
            userId: req.user.id
        }).populate("productId")


        if (find_cart.length === 0) {
            return res.json({
                message: "Add something to cart"
            })
        }


        const find_cart_map = find_cart.map((item) => {
            return ({
                productId: item.productId._id,
                price: item.productId.price,
                qty: item.qty,
                image: item.productId.image,
                title: item.productId.title

            })
        })

        const totalAmount = find_cart.reduce((sum, item) => {
            return (sum + (item.qty * item.productId.price))
        }, 0)

        const totalItems = find_cart.reduce((sum, item) => {
            return (sum + item.qty)
        }, 0)



        const user_datails = await User.findOne({ _id: req.user.id })

        if (!user_datails) {
            return res.status(404).json({
                message: "User not found"
            })
        }
        console.log("REQ.Body Printing")
        console.log(req.body)

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


router.post('/my-orders', auth_middleware, async (req, res) => {
    const my_orders = await Order.find({
        userId: req.user.id
    })


    if (my_orders.length === 0) {
        return res.status(200).json([])
    }

    return res.status(200).json(my_orders);
})

export default router

// {
//     "user_datails": [
//         {
//             "_id": "6a46393646b2de3f87811e6d",
//             "productId": "6a3fb5b7dd319e668418444d",
//             "qty": 3,
//             "userId": {
//                 "_id": "6a4636fd46b2de3f87811e6b",
//                 "name": "Ali Ahmed",
//                 "email": "ali@gmail.com",
//                 "password": "$2b$10$RAeuSy4TtGLmXgFHwqWVMutt/lZN85eeY47U8kWUi8K/fzaD/kBY6",
//                 "date": "2026-07-02T10:01:33.715Z",
//                 "__v": 0
//             },
//             "__v": 0
//         },
//         {
//             "_id": "6a46393746b2de3f87811e6e",
//             "productId": "6a3fb5b7dd319e668418444e",
//             "qty": 4,
//             "userId": {
//                 "_id": "6a4636fd46b2de3f87811e6b",
//                 "name": "Ali Ahmed",
//                 "email": "ali@gmail.com",
//                 "password": "$2b$10$RAeuSy4TtGLmXgFHwqWVMutt/lZN85eeY47U8kWUi8K/fzaD/kBY6",
//                 "date": "2026-07-02T10:01:33.715Z",
//                 "__v": 0
//             },
//             "__v": 0
//         }
//     ]
// }








// {
//     "find_cart": [
//         {
//             "_id": "6a46393646b2de3f87811e6d",
//             "productId": {
//                 "_id": "6a3fb5b7dd319e668418444d",
//                 "category": "indoor",
//                 "image": "Snake_Plant.avif",
//                 "title": "Snake Plant",
//                 "price": 24.99,
//                 "para": "Low-maintenance plant that purifies air and thrives in low light.",
//                 "__v": 0
//             },
//             "qty": 3,
//             "userId": "6a4636fd46b2de3f87811e6b",
//             "__v": 0
//         },
//         {
//             "_id": "6a46393746b2de3f87811e6e",
//             "productId": {
//                 "_id": "6a3fb5b7dd319e668418444e",
//                 "category": "indoor",
//                 "image": "Fiddle_Leaf_Fig.avif",
//                 "title": "Fiddle Leaf Fig",
//                 "price": 49.99,
//                 "para": "Trendy plant with large, violin-shaped leaves.",
//                 "__v": 0
//             },
//             "qty": 4,
//             "userId": "6a4636fd46b2de3f87811e6b",
//             "__v": 0
//         }
//     ]
// }

// Step 1: User clicks "Place Order"
// User fills in:
// Phone
// Country
// User clicks Place Order.
// Frontend sends a POST request to your backend.
// Step 2: Authenticate the user
// Your auth_middleware verifies the JWT.
// You get the logged-in user's id.
// If the token is invalid, stop the request.
// Step 3: Fetch the logged-in user's cart
// Query the Cart collection using the user's id.
// Populate the products so you have complete product information.
// Step 4: Check whether the cart is empty

// If there are no items:

// Return an error.
// Do not create an order.
// Step 5: Fetch the logged-in user's information

// Get the user's:

// Name
// Email

// from the User collection.

// Don't trust the frontend for these values.

// Step 6: Receive shipping information

// Receive from the frontend:

// Phone
// Country

// These are entered during checkout.

// Step 7: Convert cart items into order items

// Your cart documents are not stored in the same format as your Order schema.

// Create a new array where every cart item becomes an order item containing:

// Product ID
// Quantity
// Price
// Step 8: Calculate the total amount

// Loop through every cart item.

// For each item:

// quantity × product price

// Add everything together.

// Store the final total.

// Step 9: Create the Order document

// Now you have everything required:

// userId
// items
// totalAmount
// name
// email
// phone
// country
// status (Pending)

// Save it in the Orders collection.

// Step 10: Clear the user's cart

// Once the order is successfully created:

// Delete every cart item belonging to that user.

// This prevents duplicate orders and leaves the cart empty.

// Step 11: Send a success response

// Return something like:

// Success message
// Order ID (optional)
// Step 12: Frontend receives success

// After receiving success:

// Empty the cart state/context.
// Redirect to a success page or home page.
// Show a success message such as "Your order has been placed."