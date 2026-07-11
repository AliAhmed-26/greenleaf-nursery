import express from "express"
import { check_role } from "../middleware/roleMiddleware.js"
import auth_middleware from "../middleware/userMiddleware.js"
import Product from "../models/productModel.js"
import Order from "../models/orderModel.js"
import User from "../models/userModel.js"
import upload from "../middleware/uploadMiddleware.js"

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
    console.log("req Body", req.body)

    // if (!req.body) {
    //     return res.json({message:"req.body undefiined"})
    // }
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




router.post('/add-product', auth_middleware, check_role, upload.single("image"), async (req, res) => {

    try {
        const add_product = await Product.create({

            title: req.body.title,
            category: req.body.category,
            price: req.body.price,
            quantity: req.body.quantity,
            para: req.body.para,

            image: req.file ? req.file.filename : ""

        });
        res.json(add_product)

    } catch (error) {

        return res.json({ message: "Product cant add" })
    }


})




router.get('/all-products', auth_middleware, check_role, async (req, res) => {


    try {
        const all_products = await Product.find()
        res.json(all_products)

    } catch (error) {
        return res.json({ message: "Products cant be displayed" })

    }

})


router.put('/update-products/:id', auth_middleware, check_role, upload.single("image"), async (req, res) => {


    const updateData = {
        title: req.body.title,
        category: req.body.category,
        price: req.body.price,
        quantity: req.body.quantity,
        para: req.body.para
    };

    if (req.file) {
        updateData.image = req.file.filename;
    }


    const update_products = await Product.findByIdAndUpdate(
        req.params.id,
        updateData,

        {
            returnDocument: "after",
            runValidators: true
        }
    )


    if (!update_products) {

        return res.json({ message: "Product cant update" })
    }
    res.json(update_products)

})



router.delete('/delete-products/:id', auth_middleware, check_role, async (req, res) => {

    const delete_products = await Product.findByIdAndDelete(req.params.id, {
        new: true
    }
    )

    console.log((req.params.id))
    if (!delete_products) {
        return res.json({ message: "Product cant delete" })

        console.log(delete_products)
    }
    console.log(delete_products)
    res.json(delete_products)

})





export default router