import express from "express"
import { check_role } from "../../middleware/roleMiddleware.js"
import auth_middleware from "../../middleware/userMiddleware.js"
import Product from "../../models/productModel.js"
import Order from "../../models/orderModel.js"
import User from "../../models/userModel.js"
import upload from "../../middleware/uploadMiddleware.js"

const router = express.Router()

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

    if (!delete_products) {
        return res.json({ message: "Product cant delete" })

    }
    res.json(delete_products)

})





export default router