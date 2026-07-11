import express from "express"
// import products from "../data/products.js"
import Product from "../models/productModel.js"

const router = express.Router()


router.post('/products_shop', async (req, res) => {
    const neww = await Product.create(req.body)
    res.json(neww)
    console.log("Hello POST neww")
})

router.get('/my-products', async (req, res) => {
    const readd = await Product.find()
    res.json(readd)
    console.log("Hello GET readdd")
})

export default router