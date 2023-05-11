const router = require("express").Router();


const {checkLogin} = require("../middlewares/autoLogin.js");
const projectController = require("../controllers/projectController.js");
const {upload_multer} = require("../modules/multer.js");


router.post("/create" , checkLogin , upload_multer ,projectController.createProject);

router.get("/list",checkLogin,projectController.getAllProject);

router.delete("/remove/:id",checkLogin,projectController.removeProject);

router.put("/edit/:id",checkLogin,upload_multer,projectController.updateProject);



module.exports = {
    projectRoute : router,
}