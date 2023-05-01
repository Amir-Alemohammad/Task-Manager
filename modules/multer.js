const multer = require("multer");
const shortid = require("shortid");

const {createUploadPath} = require("./functions.js");

const storage = multer.diskStorage({
    
    destination: (req,file,cb) => {
            cb(null,createUploadPath())
        },

    filename: (req,file,cb) => {
        cb(null,`${shortid.generate()}_${file.originalname}`);
    },

});
const upload_multer = multer({
    storage,
}).single("image");



module.exports = {
    upload_multer,
}