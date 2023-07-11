const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const kavenegar = require('kavenegar');
const nodemailer = require('nodemailer');


const Users = require("../models/Users.js");
const {RandomNumberGenerator} = require("../modules/functions.js");
const UsersModel = require("../models/Users.js");
const { checkOtpSchema } = require("../validations/userValition.js");

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
            
            //Send Email
            const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'amirho3inalemohammad@gmail.com',
                pass: process.env.APP_PASS,
            }
            });

            const mailOptions = {
            from: 'amirho3inalemohammad@gmail.com',
            to: Email,
            subject: 'خوش آمدید',
            text: `سلام ${FullName} عزیز به سایت ما خوش آمدید`
            };

            transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
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
const checkOtp = async (req,res,next) => {
        try {
            const {PhoneNumber} = req.body;
            console.log(PhoneNumber)
            const user = await Users.findOne({PhoneNumber});
            const code = RandomNumberGenerator();
            console.log(user)
            if(!user){
                const error = new Error("کاربری با این شماره تلفن ثبت نام نکرده است");
                error.statusCode = 404;
                throw error; 
            }
            await UsersModel.updateOne({PhoneNumber},{
                $set:{
                    otp:{
                        code,
                        expiresIn: new Date().getTime() + 120000,
                    }
                }
            })
            const api = kavenegar.KavenegarApi({
                apikey: process.env.API_SECRET,
            });
            api.VerifyLookup({
                receptor: PhoneNumber,
                template: "Login",
                token: code,
            },function(response,status){
                console.log(response);
                // console.log(status);
            });
            res.status(200).json({
                success : true,
                status: 200,
                message: "کد اعتبار سنجی با موفقیت برای شما ارسال شد",
            });
            
        } catch (err) {
            next(err)
        }
}
const login = async (req,res,next) => {
    try {
    await checkOtpSchema.validate(req.body)
    const {PhoneNumber,code} = req.body;
    const user = await UsersModel.findOne({PhoneNumber});
    if(!user){
        const error = new Error("کاربری با این شماره تلفن ثبت نام نکرده است");
        error.statusCode = 404;
        throw error;
    }
    if(user.otp.code != code){
        const error = new Error("کد ارسال شده صحیح نمی باشد");
        error.statusCode = 404;
        throw error;
    }
    const nowDate = Date.now();
    if(+user.otp.EXPIRES_IN < nowDate){ // + for convert to number
            const error = new Error("کد شما منقضی شده است");
            error.statusCode = 401;
            throw error;
    }
    const token = jwt.sign({
        email: user.Email,
        UserName : user.UserName
    },process.env.JWT_SECRET,{expiresIn : "24h"});

    res.status(200).json({
        success : true,
        status : 200,
        accessToken : token,
    })
    } catch (err) {
        next(err)
    }
    
}
const resetPassword = (req,res) => {

}
module.exports = {
    register,
    checkOtp,
    login,
    resetPassword,
}
