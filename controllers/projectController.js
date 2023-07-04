const ProjectModel = require("../models/projects.js");
const fs = require('fs');
const path = require('path');
const { mongoIdValidation, projectValidation } = require("../validations/projectValidation.js");



const getAllProject = async (req,res,next) => {
    try {
        const userId = req.user._id;
        const projects = await ProjectModel.aggregate([
            {
                $match: {
                    owner : userId,
                },
            },
            {
                $lookup:{
                    from : "usersmodels",
                    localField: "owner",
                    foreignField: "_id",
                    as : "owner"
                }
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
        if(!projects){
            const error = new Error("پروژه ای برای نمایش وجود ندارد");
            error.statusCode = 404;
            throw error;
        }else{
            return res.status(200).json({
                success : true,
                statusCode : 200,
                projects,
            })
        }
    } catch (err) {
        next(err)
    }

}

const createProject = async (req,res,next) => {
    try {   
        await ProjectModel.projectValidation(req.body);
        const {Title,Text,tags} = req.body;
        if(!req.file || Object.keys(req.file).length == 0){
            const error = new Error("برای آپلود عکسی انتخاب کنید");
            error.statusCode = 400;
            throw error;
        }
        const imageSize = req.file.size;
        const maxSize = 4 * 1024 * 1024;
        const filePath = req.file.path.replace("\\","/").substring(39);
        if(imageSize > maxSize){
            fs.unlinkSync(path.join(__dirname,"..","public",filePath));
            const error = new Error("حجم عکس مورد نظر نباید بیشتر از 4 مگابایت باشد");
            error.statusCode = 400;
            throw error;
        }
        
        const mimetype = req.file.mimetype;
        const owner = req.user._id;
        if(mimetype == "image/png" || mimetype == "image/jpeg"){
            
            await ProjectModel.create({Title,Text,owner,tags,Image:filePath});
            return res.status(201).json({
                imageAddress : filePath,
                success: true,
                statusCode : 201,
                message : "پروزه با موفقیت ایجاد شد",
            });
        }else{
            fs.unlinkSync(path.join(__dirname,"..","public",filePath));
            const error = new Error("پسوند فایل مجاز نمی باشد");
            error.statusCode = 400;
            throw error;
        }

    } catch (err) {
        next(err);
    }
}
const updateProject = async (req,res,next) => {
    try {
        await mongoIdValidation.validate(req.params)
        await ProjectModel.projectValidation(req.body);
        if(!req.file || Object.keys(req.file).length == 0){
            const error = new Error("برای بروزرسانی عکسی انتخاب کنید");
            error.statusCode = 400;
            throw error;
        }
        const {Title,Text,tags} = req.body;
        const projectID = req.params.id;
        const owner = req.user._id;
        const project = await ProjectModel.findOne({owner,_id : projectID});
        const mimetype = req.file.mimetype;
        const filePath = req.file.path.replace("\\","/").substring(39);
        const imageSize = req.file.size;
        const maxSize = 4 * 1024 * 1024;
        if(!project){
            const error = new Error("پروژه ای با این شناسه پیدا نشد");
            error.statusCode = 404;
            throw error;
        }
        else{
           
            if(imageSize > maxSize){
                fs.unlinkSync(path.join(__dirname,"..","public",filePath));
                const error = new Error("حجم عکس مورد نظر نباید بیشتر از 4 مگابایت باشد");
                error.statusCode = 400;
                throw error;
            }
            if(mimetype == "image/jpeg" || mimetype == "image/png"){  
                
                await ProjectModel.updateOne({owner},{$set : {Title,Text,tags,Image:filePath}});
                return res.status(200).json({
                    success : true,
                    statusCode : 200,
                    message: "پروژه با موفقیت بروزرسانی شد",
                    image : `${req.protocol}://${req.get("host")}/${(project.Image).replace(/\\/gm,"/")}`,
                });

            }else{
                
                fs.unlinkSync(path.join(__dirname,"..","public",filePath));
                const error = new Error("پسوند فایل مجاز نمیباشد");
                error.statusCode = 400;
                throw error;
            }
           
        }
    } catch (err) {
        next(err)
    }
}
const removeProject = async (req,res,next) => {
    try {
        await mongoIdValidation.validate(req.params);
        const owner = req.user._id;
        const projectID = req.params.id;
        const project = await ProjectModel.findOne({owner,_id : projectID});
        if(!project){
            const error = new Error("پروژه ای پیدا نشد");
            error.statusCode = 404;
            throw error;
        }else{
            const deleteProject = await ProjectModel.deleteOne({_id : projectID});
            if(deleteProject.deletedCount == 0){
                const error = new Error("پروژه حذف نشد");
                error.statusCode = 400;
                throw error;
            }
            res.status(200).json({
                success: true,
                statusCode: 200,
                message: "پروژه با موفقیت حذف شد",
            });
        }
    } catch (err) {
        next(err)
    }
}
module.exports = {
    createProject,
    getAllProject,
    updateProject,
    removeProject,
}