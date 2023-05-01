const router = require("express").Router();

const {projectRoute} = require("./projectRoute.js");
const {authRoute} = require("./authRoute.js");
const {teamRoute} = require("./teamRoute.js");
const {userRoute} = require("./userRoute.js");


router.use("/project",projectRoute);
router.use("/auth",authRoute);
router.use("/team",teamRoute);
router.use("/user",userRoute);

module.exports = {
    AllRoutes : router,
}