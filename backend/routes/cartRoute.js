import express from "express"
import Cart from "../models/cartModel.js"
import auth_middleware from "../middleware/userMiddleware.js"

const router = express.Router()

router.post("/add", auth_middleware, async (req, res) => {

    const existing_user_product = await Cart.findOne({
        productId: req.body.productId,
        userId: req.user.id
    })
    console.log("ADD HIT");

    if (!existing_user_product) {

        const cart_product = await Cart.create({
            productId: req.body.productId,
            qty: req.body.qty,
            userId: req.user.id
        })
        console.log("Cart created")
        return res.json(cart_product);
    }
    existing_user_product.qty += 1
    await existing_user_product.save()
    return res.json(existing_user_product)
})



router.post("/myProducts", auth_middleware, async (req, res) => {
    const logged_in_user = await Cart.find({
        userId: req.user.id
    }).populate("productId")
    console.log("Debugging")
    // console.log(JSON.stringify(logged_in_user, null, 2));
    res.json(logged_in_user)
})

router.post('/decrease', auth_middleware, async (req, res) => {
    console.log("REMOVE HIT");
    const existing_user_product = await Cart.findOne({
        productId: req.body.productId,
        userId: req.user.id
    })

    if (!existing_user_product) {

        return res.status(404).json({
            message: "Deleted decreases successfully"
        })

    }

    if (existing_user_product.qty > 1) {
        existing_user_product.qty -= 1
        await existing_user_product.save()
        return res.json(existing_user_product)

    }
    else if (existing_user_product.qty === 1) {

        await existing_user_product.deleteOne()
        return res.json({ message: "Deleted Succesfullt" })
    }
})


router.post('/remove', auth_middleware, async (req, res) => {
    const existing_user_product = await Cart.findOne({
        productId: req.body.productId,
        userId: req.user.id
    })

    if (!existing_user_product) {

        return res.status(404).json({
            message: "Item not found"
        })
    }
    await existing_user_product.deleteOne()
    return res.json({ message: "Deleted successfully" })

})

export default router