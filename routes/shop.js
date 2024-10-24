const express = require("express");
const router = express.Router();
const productModel = require("../models/product_models");

router.get("/", async (req, res) => {
    try {
        const product = await productModel.find();
        //res.status(200).send(product)
        res.render("shopShow",{product})
    } catch (error) {
        res.send(error.message)
    }
})


module.exports = router;