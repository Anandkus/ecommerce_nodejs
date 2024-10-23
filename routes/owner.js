const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner_models");
const bcrypt = require('bcrypt');

router.get("/", (req, res) => {
    res.send("this is owner router ")
});

//in terminal ->  set NODE_ENV=development
if (process.env.NODE_ENV === 'development') {
    router.post("/create", async (req, res) => {
        const { fullname, email, password } = req.body
        const owners = await ownerModel.find();
        if (owners.length > 0) {
            return res.status(500).send("You don't have permission to create a new owner.")
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                const createdOwner = await ownerModel.create({
                    fullname, email, password:hash
                })
                return res.status(201).send({ msg: "success", owner: createdOwner })
            })
        })
    })
}

module.exports = router;
