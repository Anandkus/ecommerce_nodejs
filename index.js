const express = require('express');
const app = express();


app.get("/", (req, res) => {
    res.send("this is ")
})

app.listen(1101, (req, res) => {
    console.log("server is run ")
})