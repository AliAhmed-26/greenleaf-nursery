import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    productId: {
        
        // Stores the ObjectId of the product added to the cart.
        // 'ref: "Product"' creates a relationship with the Product collection,
        // allowing us to populate and retrieve complete product details later.

        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    qty: {
        type: Number,
        default: 1
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }

});

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
