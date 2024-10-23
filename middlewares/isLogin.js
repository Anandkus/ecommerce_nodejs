const jwt = require('jsonwebtoken');
const userModel = require("../models/user_models");

module.exports.isLogedIn = async (req, res, next) => {
    if (!req.cookies.token) {
        return res.send('you need to login first ')
    }
    try {
        const decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        const user = await userModel.findOne({ email: decoded.email }).select("-password");  //password nahi chaiye 
        req.user = user;
        next();

    } catch (error) {
        return res.send(error.message)
    }
}