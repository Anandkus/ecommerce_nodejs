const express = require("express");
const router = express.Router();
const productModel = require("../models/product_models");
const { isLogedIn } = require("../middlewares/isLogin");
const UserModel = require("../models/user_models");

router.get("/", isLogedIn, async (req, res) => {
    try {
        const product = await productModel.find();
        //res.status(200).send(product)
        res.render("shopShow", { product })
    } catch (error) {
        res.send(error.message)
    }
})
router.get("/addtocart/:id", isLogedIn, async (req, res) => {
    let user = await UserModel.findOne({ email: req.user.email });
    user.cart.push(req.params.id);
    await user.save();
    res.send(user)
})

router.get("/cart", isLogedIn, async (req, res) => {
    const user = await UserModel.findOne({ email: req.user.email }).populate("cart");
    let bill = 0;
    for (let i = 0; i < user.cart.length; i++) {
        bill = Number(user.cart[i].price) + 20 - Number(user.cart[i].discount) + bill;
    }
    console.log("bill " + bill);
    res.send("success")


})

module.exports = router;