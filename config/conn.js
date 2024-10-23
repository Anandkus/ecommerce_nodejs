const mongoose = require("mongoose");
const config = require("config"); //folder name also config then we can aceess
const debug = require('debug')("development:mongoose");  // in terminal=>  set DEBUG=development:*

//console.log("value = ",config.get("MONGODB_URL"))  
mongoose.connect(`${config.get("MONGODB_URL")}/eccomerce`).then(() => {
    debug("database connected !");
}).catch((err) => {
    console.log("error ", err)
})

module.exports = mongoose.connection;