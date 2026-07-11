import mongoose from 'mongoose';
const { Schema } = mongoose;

const cartSchema = new Schema({
    productId: {
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
