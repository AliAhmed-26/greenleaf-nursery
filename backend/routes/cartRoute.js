import express from "express"
import Cart from "../models/cartModel.js"
import auth_middleware from "../middleware/userMiddleware.js"

const router = express.Router()

// ----------------------------------------------------
// Add product to cart
// If product already exists in the user's cart,
// increase its quantity instead of creating a new entry.
// ----------------------------------------------------

router.post("/add", auth_middleware, async (req, res) => {

    // <------- Check whether this product already exists in the logged-in user's cart -------->

    // const existing_user_product = await Cart.findOne({
    //     productId: req.body.productId,
    //     userId: req.user.id
    // })

    // if (!existing_user_product) {

    //     const cart_product = await Cart.create({
    //         productId: req.body.productId,
    //         qty: req.body.qty,
    //         userId: req.user.id
    //     })

    //     return res.json(cart_product);
    // }

    // <--------Product already exists, so simply increase its quantity -------->

    // existing_user_product.qty += 1
    // await existing_user_product.save()
    // return res.json(existing_user_product)


    // <-------- Use this instead of upper logic --------->


    try {
        const cart = await Cart.findOneAndUpdate(
            {
                userId: req.user.id,
                productId: req.body.productId
            },
            {
                $inc: { qty: 1 },
                $setOnInsert: {
                    userId: req.user.id,
                    productId: req.body.productId,
                },
            },
            {
                upsert: true,
                returnDocument: "after"
            }
        )
        return res.json(cart);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }


})


// ----------------------------------------------------
// Get all cart items of the logged-in user
// populate("productId") replaces the ObjectId with
// complete product details.
// ----------------------------------------------------


router.post("/myProducts", auth_middleware, async (req, res) => {
    const logged_in_user = await Cart.find({
        userId: req.user.id
    }).populate("productId")

    res.json(logged_in_user)
})

// ----------------------------------------------------
// Decrease quantity of a cart item.
// If quantity becomes 0 (actually reaches 1 then minus),
// remove the item completely from the cart.
// ----------------------------------------------------

router.post('/decrease', auth_middleware, async (req, res) => {
    // <-------- Find the product in the logged-in user's cart ------->
    const existing_user_product = await Cart.findOne({
        productId: req.body.productId,
        userId: req.user.id
    })

    // <------- Product does not exist in the cart -------->

    if (!existing_user_product) {

        return res.status(404).json({
            message: "Product not found in cart"
        })

    }

    // <------- Reduce quantity if more than one item exists -------->

    if (existing_user_product.qty > 1) {
        existing_user_product.qty -= 1
        await existing_user_product.save()
        return res.json(existing_user_product)

    }

    // <------- If only one item is left, remove it completely -------->

    else if (existing_user_product.qty === 1) {

        await existing_user_product.deleteOne()
        return res.json({ message: "Deleted Succesfullt" })
    }
})


// ----------------------------------------------------
// Remove a product completely from the cart,
// regardless of its current quantity.
// ----------------------------------------------------


router.post('/remove', auth_middleware, async (req, res) => {
    const existing_user_product = await Cart.findOne({
        productId: req.body.productId,
        userId: req.user.id
    })

    // <---------- Product is not present in the cart -------->

    if (!existing_user_product) {

        return res.status(404).json({
            message: "Item not found"
        })
    }

    // <----------- Delete the cart item completely --------->

    await existing_user_product.deleteOne()
    return res.json({ message: "Deleted successfully" })

})

export default router