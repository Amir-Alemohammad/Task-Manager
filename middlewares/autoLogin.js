const createHttpError = require("http-errors")
const jwt = require("jsonwebtoken")

const UsersModel = require("../models/Users");
const {verifyJwtToken} = require("../modules/functions.js");

const checkLogin = async (req,res,next) => {
    try {
        const authorization = req?.headers?.authorization;
        if(!authorization) {
            throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
        }
        let token = authorization.split(" ")?.[1];
    if(!token) {
        throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
    }
    const result = verifyJwtToken(token);
    const {UserName} = result;
    const user = await UsersModel.findOne({UserName}, {Password : 0});    
    if(!user){
        throw createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
    }    
    req.user = user;
    return next();
   }
   catch (err) {
      next(err)
    } 
}

//checking bearer token in GraphQL
const checkLoginInGraphQL = async (req) => {
   try {
       const authorization = req?.headers?.authorization;



       if(!authorization) throw new createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
    
       let token = authorization.split(" ")[1];
    
    

       
       if(!token) throw new createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید")
    

       const {UserName} = jwt.verify(token,process.env.JWT_SECRET)
     
       const user = await UsersModel.findOne({UserName} , {Password: 0});
     
       if(!user) throw new createHttpError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
     
       return user    
     
    } catch (error) {
        throw new createHttpError.Unauthorized(error.message)

    }
 
}


module.exports = { 
    checkLogin,
    checkLoginInGraphQL,
}