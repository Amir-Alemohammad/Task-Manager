const { checkLogin } = require("../middlewares/autoLogin");
const userController = require("../controllers/userController");
const { upload_multer } = require("../modules/multer");


const router = require("express").Router();


router.get("/profile", checkLogin,userController.getProfile);

router.post("/edit-profile",checkLogin,userController.editProfile);

router.post("/profile-image",checkLogin,upload_multer,userController.uploadImage);

router.get("/requests",checkLogin,userController.getAllinvites);

router.get("/requests/:status",checkLogin,userController.getRequestsByStatus);





module.exports = {
    userRoute : router,
}