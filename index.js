const express = require('express');
const db = require("./config/conn");
const userRouter = require("./routes/user");
const proudctRouter = require("./routes/product");
const ownerRouter = require("./routes/owner");
const app = express();

require('dotenv').config();
const cookieParser = require("cookie-parser");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/user", userRouter);
app.use("/product", proudctRouter);
app.use("/owner", ownerRouter);


app.get("/", (req, res) => {
    res.send("this is ")
})

app.listen(1101, (req, res) => {
    console.log("server is run ")
})