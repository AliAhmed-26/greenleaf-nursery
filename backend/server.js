import express from "express"
import productRoutes from "./routes/productRoutes.js"

import login_sign_user from './routes/userRoute/login_sign_user.js'

import refresh_logout_user from './routes/userRoute/refresh_logout_user.js'

import verification_me_user from './routes/userRoute/verification_me_user.js'

import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"
import dboard_product_admin from "./routes/adminRoute/dboard_product_admin.js"

import product_admin from './routes/adminRoute/product_admin.js'

import aiRoute from "./routes/aiRoute.js"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://greenleaf-nursery.vercel.app"
  ],
  credentials: true
}));
app.use(express.json());

app.use("/api", productRoutes)


app.use(cookieParser());

app.use("/auth", login_sign_user)
app.use("/auth", refresh_logout_user)
app.use("/auth", verification_me_user)

app.use("/cart", cartRoute)

app.use("/order", orderRoute)

app.use("/admin", dboard_product_admin)
app.use("/admin", product_admin)

app.use("/ai", aiRoute)

app.use("/images", express.static("public/images"))

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


app.get("/test-image", (req, res) => {
  res.send("working");
});

app.get('/', (req, res) => {
  res.send('Backend is runnng');
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

