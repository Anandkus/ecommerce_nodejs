const express = require("express");
const router = express.Router();;
const { UserRegister, userLogin, userLogout } = require("../controllers/authcontroller");
const { isLogedIn } = require("../middlewares/isLogin");
router.get("/", (req, res) => {
    res.send("this is user router ")
});

router.post("/register", UserRegister);
router.post("/login", userLogin);

router.get("/logout",isLogedIn, userLogout);



module.exports = router;
