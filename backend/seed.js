import mongoose from "mongoose"
import Product from "./models/productModel.js"
import shop_array_product from "./data/products.js"


await mongoose.connect('mongodb://127.0.0.1:27017/greenleaf_project')

await Product.deleteMany()
await Product.find()
await Product.insertMany(shop_array_product)

process.exit()
