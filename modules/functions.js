const jwt = require("jsonwebtoken");

const path = require("path");
const fs = require('fs');
const createHttpError = require("http-errors");

function verifyJwtToken(token) {
    const result = jwt.verify(token,process.env.JWT_SECRET);
    if(!result?.email){
        throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
    }
    return result;
}
function createUploadPath () {
    let d = new Date();
    const Year = d.getFullYear() + "";
    const Month = d.getMonth() + "";
    const day = d.getDate() + "";
    const uploadPath = path.join(__dirname,"..","public","uploads",Year,Month,day);
    fs.mkdirSync(uploadPath,{recursive: true});
    return uploadPath;
}
function RandomNumberGenerator(){
    return Math.floor(Math.random() * 90000 + 10000);
}

module.exports = {
    verifyJwtToken,
    createUploadPath,
    RandomNumberGenerator,
}