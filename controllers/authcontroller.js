const userModel = require("../models/user_models");
const bcrypt = require('bcrypt');
const generateTokenfun = require("../utils/generateToken");

module.exports.UserRegister = async (req, res) => {
    const { fullname, email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            return res.status(401).send("user already exist ")
        }

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err);
                else {
                    const createdUser = await userModel.create({
                        fullname, email, password: hash
                    })
                    const token = generateTokenfun(createdUser);
                    res.cookie("token", token);
                    return res.status(201).send({ msg: "user created Successfully ", token:token });
                }
            })
        })

    } catch (error) {
        return res.send(error.message)
    }
}

module.exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).send("Something Wrong ! ")
        }
        const passwordResult = await bcrypt.compare(password, user.password);
        if (passwordResult) {
            const token = generateTokenfun(user);
            res.cookie("token", token);
            return res.status(201).send({ msg: "Login Successfully ", token:token });
        }
        else {
            return res.status(401).send("Something Wrong ! ! ")
        }
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports.userLogout = async (req, res) => {
    res.cookie("token", "");
    return res.status(401).send({ msg: "Logout Successfully ", auth: false });
}