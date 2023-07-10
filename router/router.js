const router = require("express").Router();
const {graphqlHTTP} = require("express-graphql");

const {projectRoute} = require("./projectRoute.js");
const {authRoute} = require("./authRoute.js");
const {teamRoute} = require("./teamRoute.js");
const {userRoute} = require("./userRoute.js");
const { graphqlConfig } = require("../utils/graphql.config.js")



router.use("/project",projectRoute);

router.use("/auth",authRoute);

router.use("/team",teamRoute);

router.use("/user",userRoute);

router.use("/graphql", graphqlHTTP(graphqlConfig));

module.exports = {
    AllRoutes : router,
}