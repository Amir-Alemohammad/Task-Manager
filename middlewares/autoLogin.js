const UsersModel = require("../models/Users");
const {verifyJwtToken} = require("../modules/functions.js");

const checkLogin = async (req,res,next) => {
    try {
        const authorization = req?.headers?.authorization;
        if(!authorization) {
            const error = new Error("لطفا وارد حساب کاربری خود شوید");
            error.statusCode = 401;
            throw error;
        }
        let token = authorization.split(" ")?.[1];
    if(!token) {
        const error = new Error("لطفا وارد حساب کاربری خود شوید");
        error.statusCode = 401;
        throw error;
    }
    const result = verifyJwtToken(token);
    const {UserName} = result;
    const user = await UsersModel.findOne({UserName}, {Password : 0,});    
    if(!user){
        const error = new Error("user لطفا وارد حساب کاربری خود شوید");
        error.statusCode = 401;
        throw error;
    }    
    req.user = user;
    return next();
   }
   catch (err) {
      next(err)
    } 
}
module.exports = { 
    checkLogin,
}