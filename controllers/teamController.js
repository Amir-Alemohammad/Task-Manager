const UsersModel = require("../models/Users.js");
const TeamModel = require("../models/teams.js");
const { mongoIdValidation } = require("../validations/projectValidation.js");

const createTeam = async (req,res,next) => {
    try {
        await TeamModel.teamValidation(req.body);
        const {name,Description,username} = req.body;
        const owner = req.user._id;
        const teamExist = await TeamModel.findOne({username});
        if(teamExist){
            const error = new Error("قبلا تیمی با این نام کاربری ثبت نام کرده است");
            error.statusCode = 400;
            throw error;
        }else{
            await TeamModel.create({name,Description,owner,username});
            return res.status(201).json({
                success: true,
                statusCode: 201,
                message: "تیم شما با موفقیت ساخته شد",
            });
        }

    } catch (err) {
        next(err);
    }
}

const getTeamList = async (req,res,next) =>{
    try {
        const team = await TeamModel.aggregate([
            {
                $lookup:{
                    from: "teammodels",
                    localField: "team",
                    foreignField: "_id",
                    as: "team",
                },
            },
            {
                $project:{
                    "updatedAt": 0,
                    "__v":0,
                }
            }
        ]);
        if(team.length > 0){
            res.status(200).json({
                success: true,
                statusCode: 200,
                team,
            });
        }else{
            const error = new Error("تیمی پیدا نشد");
            error.statusCode = 404;
            throw error;
        }
    } catch (err) {
        next(err)
    }
}
const deleteTeamById = async (req,res,next) => {
    try {
        const owner = req.user._id;
        const teamId = req.params.id;
        const team = await TeamModel.findOne({owner,_id : teamId});
        if(!team){
            const error = new Error("تیمی با این مشخصات وجود ندارد");
            error.statusCode = 404;
            throw error;
        }else{
            await TeamModel.deleteOne({owner,_id: teamId});
            res.status(200).json({
                success : true,
                statusCode : 200,
                message: "تیم با موفقیت حذف شد",
            });
        }
    } catch (err) {
        next(err);
    }
}
const getMyTeams = async (req,res,next) => {
    try {
        const userId = req.user._id;
        const team = await TeamModel.aggregate([
            {
                $match: {
                    $or: [{owner : userId},{users : userId}],
                },
            },
        
            {

                $lookup:{
                    from: "usersmodels",
                    localField: "owner",
                    foreignField : "_id",
                    as : "owner",
                },
            },
            {
                $project: {
                    "createdAt": 0,
                    "updatedAt": 0,
                    "__v" : 0,
                    "owner.Rols" : 0,
                    "owner.Password" : 0,
                    "owner.Teams" : 0,
                    "owner.Skills" : 0,
                    "owner.inviteRequests" : 0,
                    "owner._id" : 0,
                    "owner.Email" : 0,
                    "owner.otp" : 0,
                    "owner.createdAt" : 0,
                    "owner.updatedAt" : 0,
                    "owner.__v" : 0,
                    "owner.PhoneNumber" : 0,
                },
            },
            {
                $unwind : "$owner",
            },
        ]);
    
        if(!team){
            const error = new Error("تیمی با مشخصات شما وجود ندارد");
            error.statusCode = 404;
            throw error
        }
        return res.status(200).json({
            success : true,
            statusCode : 200,
            team,
        });
    } catch (err) {
        next(err);
    }
}

const inviteUser = async (req,res,next) => {
    try {
        await mongoIdValidation.validate(req.params);
        const userId = req.user._id;
        const {username,teamId} = req.params;
        const user = await UsersModel.findOne({UserName : username});
        const team = await TeamModel.findOne({
            $or: [{owner: userId},{users: userId}],
            _id : teamId,
        });
        if(!team){
            const error = new Error("تیمی جهت ارسال درخواست پیدا نشد");
            error.statusCode = 404;
            throw error;
        }
        if(!user){
            const error = new Error("کاربری جهت دعوت کردن پیدا نشد");
            error.statusCode = 404;
            throw error;
        }
        if(username === req.user.UserName){
            const error = new Error("شما نمیتوانید خودتان را دعوت کنید");
            error.statusCode = 400;
            throw error;
        }    
        if(team.users.includes(userId)){
            const error = new Error("شما عضوی از این تیم هستید برای دعوت افراد باید مدیر باشید");
            error.statusCode = 400;
            throw error;
        }
        
        
        const findUserInTeam = async (teamId,userId) => {
            const result = await TeamModel.findOne({
                $or: [{owner: userId},{users: userId}],
                _id : teamId,
        });

        const findUser = user.inviteRequests.forEach(e => {
                if(e.teamId == teamId){
                    const error = new Error("این فرد قبلا به این تیم دعوت شده است");
                    error.statusCode = 400;
                    throw error;
                }else{
                   return !!result;
                }
            });
        }
        const userInvited = await findUserInTeam(teamId,user._id);

        if(userInvited){
            const error = new Error("این فرد قبلا به تیمی دعوت شده است");
            error.statusCode = 400;
            throw error;
        }
        const teamName = team.username;
        const request = {
            caller: req.user.UserName,
            requestDate : new Date(),
            teamId,
            stauts : "pending",
            teamName,
        }
        
        await UsersModel.updateOne({UserName : username},{
            $push : {inviteRequests : request}
        });
        res.status(200).json({
            success : true,
            statusCode : 200,
            message: "فرد مورد نظر با موفقیت دعوت شد",
        });
    } catch (err) {
        next(err)
    }
}

const updateTeam = async (req,res,next) => {
    try {
        await TeamModel.teamValidation(req.body);
        await mongoIdValidation.validate(req.params);
        const {name,Description,username} = req.body;
        const teamId = req.params.teamId;
        const userId = req.user._id;
        const team = await TeamModel.findOne({owner : userId,_id : teamId});
        if(!team){
            const error = new Error("تیمی با این مشخصات پیدا نشد");
            error.statusCode = 404;
            throw error;
        }else{
            await TeamModel.updateOne({_id : teamId},{$set : {name,Description,username}});
            return res.status(200).json({
                statusCode : 200,
                success : true,
                message : "بروزرسانی تیم با موفقیت انجام شد",
            });
        }
            

    } catch (err) {
        next(err);
    }
}
module.exports = {
    createTeam,
    getTeamList,
    deleteTeamById,
    getMyTeams,
    inviteUser,
    updateTeam,
}