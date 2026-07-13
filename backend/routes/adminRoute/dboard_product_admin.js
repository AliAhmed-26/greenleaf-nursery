import express from "express"
import { check_role } from "../../middleware/roleMiddleware.js"
import auth_middleware from "../../middleware/userMiddleware.js"
import Product from "../../models/productModel.js"
import Order from "../../models/orderModel.js"
import User from "../../models/userModel.js"
import upload from "../../middleware/uploadMiddleware.js"

const router = express.Router()



router.get('/dashboard', auth_middleware, check_role, async (req, res) => {
    try {

        const total_orders_admin = await Order.countDocuments();

        const total_products_admin = await Product.countDocuments();

        const total_users_admin = await User.countDocuments();

        const total_pendings_admin = await Order.countDocuments({
            status: "Pending"
        });

        const recent_users_admin = await User.find()

        const recent_orders_admin = await Order.find()



        const low_stock_admin = await Product.find({
            quantity: { $lt: 5 }
        })

        // if (!recent_orders_admin || !recent_users_admin || !low_stock_admin) {
        //     recent_orders_admin = []
        //     recent_users_admin=[]
        // }

        res.json({
            total_orders_admin,
            total_pendings_admin,
            total_products_admin,
            total_users_admin,
            recent_users_admin,
            recent_orders_admin,
            low_stock_admin,

        })
    } catch (error) {
        console.log(error)
        res.json({ message: error })
    }
})


router.put("/update-action/:id", auth_middleware, check_role, async (req, res) => {

    const req_change_action = await Order.findByIdAndUpdate(
        req.params.id,
        {
            status: req.body.status
        },
        {
            returnDocument: "after",
            runValidators: true
        }
    )


    if (!req_change_action) {

        return res.json({ message: "Product cant update status" })
    }
    res.json(req_change_action)
})
export default router