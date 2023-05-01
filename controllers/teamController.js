const UsersModel = require("../models/Users.js");
const TeamModel = require("../models/teams.js");


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
        const team = await TeamModel.find();
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
const getTeamById = async (req,res,next) =>{
    try {
        const teamId = req.params.id;
        const team = await TeamModel.findOne({_id: teamId});
        if(!team){
            const error = new Error("تیمی با این مشخصات وجود ندارد");
            error.statusCode = 404;
            throw error
        }else{
            res.status(200).json({
                success: true,
                statusCode : 200,
                team,
            });
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
        const team = await TeamModel.find({
            $or: [
                {owner : userId},
                {users : userId}
            ]
        });
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
        const userId = req.user._id;
        const {username,teamId} = req.params;
        const team = await TeamModel.findOne({
            $or:[
                {owner : userId},
                {users : userId},
            ],     _id : teamId
            
        });
        if(!team){
            const error = new Error("شما عضو هیچ تیمی نشده اید");
            error.statusCode = 404;
            throw error;
        }
        const user = await UsersModel.findOne({UserName : username});
        if(!user){
            const error = new Error("کاربری جهت دعوت کردن پیدا نشد");
            error.statusCode = 404;
            throw error;
        }
        const findUserInTeam = async (teamId,userId) => {
            const result = await TeamModel.findOne({
                $or: [{owner: userId},{users: userId}],
                _id : teamId,
            });
            const inviteRequests = user.inviteRequests;
            const findCaller =  inviteRequests.find((index)=>{
                 return index.caller;
             });
             if(!findCaller){
                return !!result;
             }
             const caller = findCaller.caller ? req.user.UserName : "";
             if(caller == req.user.UserName){
                return !result
             }             
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

const updateTeam = (req,res) => {
    
}
const removeUserFromTeam = (req,res) => {

}
module.exports = {
    createTeam,
    getTeamList,
    getTeamById,
    deleteTeamById,
    getMyTeams,
    inviteUser,
    updateTeam,
    removeUserFromTeam,
}