const router = require("express").Router();

const authController = require("../controllers/authController.js");


router.post("/register",authController.register);

router.post("/checkOtp",authController.checkOtp);

router.post("/login",authController.login);



module.exports = {
    authRoute : router,
}