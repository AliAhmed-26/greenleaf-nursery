import mongoose from 'mongoose';
const { Schema } = mongoose;

const productSchema = new Schema({
    category: String,
    image: String,
    title: String,
    price: Number,
    para: String,
    quantity : Number

});

const Product = mongoose.model("Product", productSchema);

export default Product;
