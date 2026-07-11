import mongoose from 'mongoose';
const { Schema } = mongoose;

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    
    otp: {
        type: Number,
        required: true
    },
    expiresAt: {
    type: Date,
    required: true,
    expires: 0
},
    

}, {
    timestamps: true
});

const Otp = mongoose.model("otp", otpSchema);

export default Otp;

