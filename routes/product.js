const express = require("express");
const router = express.Router();
const upload = require("../config/multer-confiq.js");
const productModel = require("../models/product_models");

router.get('/', (req, res) => {
    res.render("index")
    //res.send("he")
})
router.post("/create", upload.single("image"), async (req, res) => {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    try {
        const createdProduct = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        })
        return res.status(201).send("created Product !")
    } catch (error) {
        res.send(error.message)
    }
});

module.exports = router;
