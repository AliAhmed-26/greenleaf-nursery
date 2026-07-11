import express from "express"
import productRoutes from "./routes/productRoutes.js"
import userRoute from "./routes/userRoute.js"
// import otpRoute from "./routes/otpRoute.js"
import cartRoute from "./routes/cartRoute.js"
import orderRoute from "./routes/orderRoute.js"
import adminRoute from "./routes/adminRoute.js"
import aiRoute from "./routes/aiRoute.js"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";


dotenv.config();
// console.log("EMAIL:", process.env.EMAIL);
// console.log("PASS:", process.env.EMAIL_APP_PASS);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());

app.use("/api", productRoutes)
app.use(cookieParser());
app.use("/auth", userRoute)
// app.use("/auth", otpRoute)
app.use("/cart", cartRoute)
app.use("/order", orderRoute)
app.use("/admin", adminRoute)
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


/*
backend
    node_modules
    server.js
    pakage-lock.json
    package.json

*/