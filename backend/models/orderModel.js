import mongoose from 'mongoose';
const { Schema } = mongoose;

const orderSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    items: {
        type: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                qty: {
                    type: Number,
                    required: true,
                },
                price: {
                    type: Number,
                    required: true
                },
                image: {
                    type: String,
                    required: true
                },
                title: {
                    type: String,
                    required: true
                }

            }
        ],
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        default: "Pakistan"
    },
    status: {
        type: String,
        default: "Pending"
    }

}, {
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;

