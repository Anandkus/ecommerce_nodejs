const mongoose = require("mongoose");

const OwnerShema = mongoose.Schema({
    fullname: String,
    email: String,
    password: String,

    products: {
        type: Array,
        default: []
    },
    picture: String,
    gstin: String
});

const OwnerModel = mongoose.model("owner", OwnerShema);
module.exports = OwnerModel;