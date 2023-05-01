const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../models/Users.js");

const register = async (req,res,next) => {
    try {
        await Users.userValidation(req.body);
        
        const {FullName,UserName,Email,PhoneNumber,Password,Rols,Teams,Skills} = req.body;
        const user = await Users.findOne({Email});
        const PhoneNumberAvailable = await Users.findOne({PhoneNumber});
        const UserNameAvailable = await Users.findOne({UserName});
        if(user){
            const error = new Error("کاربری با این ایمیل ثبت نام کرده است");
            error.statusCode = 422;
            throw error;
        }
        else if(UserNameAvailable){
            const error = new Error("کاربری با این نام کاربری ثبت نام کرده است");
            error.statusCode = 422;
            throw error
        }
        else if(PhoneNumberAvailable){
            const error = new Error("کاربری با این شماره تلفن ثبت نام کرده است");
            error.statusCode = 422;
            throw error;
        }
        else{
            await Users.create({
                FullName,
                UserName,
                Email,
                PhoneNumber,
                Password,
                Rols,
                Teams,
                Skills,
            });
            res.status(201).json({
                status: 201,
                message: "عضویت موفقیت آمیز بود",
                success: true,
            });
        }
    } catch (err) {
        next(err);
    }
}
const login = async (req,res,next) => {
        try {
            const {Email,Password} = req.body;
            const user = await Users.findOne({Email});
            if(!user){
                const error = new Error("ایمیل یا کلمه عبور صحیح نیست");
                error.statusCode = 401;
                throw error; 
            }
            const isEqual = await bcrypt.compare(Password,user.Password);
            if(isEqual){
                const token = jwt.sign({
                    email: user.Email,
                    UserName : user.UserName
                },process.env.JWT_SECRET);
                res.status(200).json({
                    success: true,
                    status: 200,
                    accessToken : token,
                    userId: user._id.toString(),
                });
            }else{
                const error = new Error("ایمیل یا کلمه عبور صحیح نیست");
                error.statusCode = 422;
                throw error;
            }
        } catch (err) {
            next(err)
        }
}
const resetPassword = (req,res) => {

}
module.exports = {
    register,
    login,
    resetPassword,
}