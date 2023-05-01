const ProjectModel = require("../models/projects.js");
const fs = require('fs');
const path = require('path');



const getAllProject = async (req,res,next) => {
    try {
        const owner = req.user._id;
        const projects = await ProjectModel.find({owner});
        if(!projects){
            const error = new Error("شما هیچ پروژه ای ندارید");
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({
            success : true,
            statusCode : 200,
            projects,            
        });
        
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
const getProjectById = async (req,res,next) => {
    try {
        const owner = req.user._id;
        const projectID = req.params.id;
        const project = await ProjectModel.findOne({owner,_id : projectID});
        if(!project){
            const error = new Error("پروژه ای وجود ندارد");
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({
            success: true,
            statusCode: 200,
            project, 
        });


    } catch (err) {
        next(err);
    }
}
const getProjectOfTeam = (req,res,next) => {

}
const getProjectOfUser = (req,res,next) => {

}
const updateProject = async (req,res,next) => {
    try {
        if(!req.file || Object.keys(req.file).length == 0){
            const error = new Error("برای بروزرسانی عکسی انتخاب کنید");
            error.statusCode = 400;
            throw error;
        }
        await ProjectModel.projectValidation(req.body);
        const {Title,Text,tags} = req.body;
        const projectID = req.params.id;
        const owner = req.user._id;
        const project = await ProjectModel.findOne({owner,_id : projectID});
        const mimetype = req.file.mimetype;
        const filePath = req.file.path.replace("\\","/").substring(39);
        const imageSize = req.file.size;
        const maxSize = 4 * 1024 * 1024;
        if(!project){
            const error = new Error("پروژه ای پیدا نشد");
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
    getProjectById,
    getProjectOfTeam,
    getProjectOfUser,
    updateProject,
    removeProject,
}