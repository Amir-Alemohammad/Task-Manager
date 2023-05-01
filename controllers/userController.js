const UsersModel = require("../models/Users");
const fs = require("fs");
const path = require("path")

const getProfile = async (req,res,next) => {
    try {
        const user = req.user;
        if(user.profile_image){
            user.profile_image = `${req.protocol}://${req.get("host")}/${(user.profile_image).replace(/\\/gm,"/")}`;
        }else{
            user.profile_image = ""
        }
        return res.status(200).json({
            status: 200,
            success: true,
            user,
        });
    } catch (err) {
        next(err)
    }
}
const editProfile = async (req,res,next) => {
   try {
        const data = { ...req.body};
        const userId = req.user._id;
        const fields = ["FullName","Email","Skills"];
        const badValues = [ "" , " " , 0 , NaN , null , undefined , -1 , [] , {}];
        Object.entries(data).forEach(([key,value]) => {
            if(!fields.includes(key)){
                delete data[key];
                const error = new Error("بروزرسانی انجام نشد");
                error.statusCode = 400;
                throw error;    
            }   
            if(badValues.includes(value)){
                delete data[key];
                const error = new Error("بروزرسانی انجام نشد");
                error.statusCode = 400;
                throw error;
            } 
        });
        
        const result = await UsersModel.updateOne({_id: userId},{$set : data})

        if(result.modifiedCount > 0){
            res.status(200).json({
                status : 200,
                success : true,
                message: "بروزرسانی با موفقیت انجام شد"
            });
        }else{
            const error = new Error("بروزرسانی انجام نشد");
            error.statusCode = 400;
            throw error;
        }
   } catch (err) {
        next(err);
   }


}
const uploadImage = async (req,res,next) => {
    try {
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
        
        const userID = req.user._id;
        if(mimetype == "image/png" || mimetype == "image/jpeg"){
            await UsersModel.updateOne({_id:userID},{$set:{profile_image:filePath}});
            res.status(200).json({
                imageAddress : filePath,
                success: true,
                statusCode : 200,
                message: "عکس شما با موفقیت آپلود شد",
            });
        }else{
            fs.unlinkSync(path.join(__dirname,"..","public",filePath));
            const error = new Error("پسوند فایل مجاز نمی باشد");
            error.statusCode = 400;
            throw error;
        }

    } catch (err) {
        next(err)
    }
}
const getAllinvites = async (req,res,next)=>{
    try {
        const userId = req.user._id;
        if(!userId){
            const error = new Error("وارد حساب کاربری خود شوید");
            error.statusCode = 400;
            throw error;
        }
        const {inviteRequests} = await UsersModel.findById(userId,{inviteRequests : 1});
        if(!inviteRequests){
            const error = new Error("دعوت نامه برای شما ارسال نشده است");
            error.statusCode = 404;
            throw error
        }else{
            res.status(200).json({
                success : true,
                statusCode : 200,
                requests : inviteRequests,
            });
        }
    } catch (err) {
        next(err)
    }
}
const getRequestsByStatus = async (req,res,next) => {
    try {
        const {status} = req.params;
        const userId = req.user._id;
        if(!userId){
            const error = new Error("لطفا وارد حساب کاربری خود شوید");
            error.statusCode = 401;
            throw error;
        }
        if(!status){
            const error = new Error("درخواستی ندارید");
            error.statusCode = 404;
            throw error
        }
        
        const requests = await UsersModel.aggregate([
            {
                $match : {_id : userId},
            },
            {
                $project : {
                    inviteRequests : 1 ,
                     _id : 0,
                    inviteRequests : {
                        $filter : {
                            input : "$inviteRequests",
                            as : "request",
                            cond: {
                                $eq : ["$$request.status",status],
                            }
                        }
                    }   
                },
                
            },
        ]);
        if(requests[0].inviteRequests.length == 0){
            const error = new Error("دعوت نامه ای با این مشخصات وجود ندارد");
            error.statusCode = 404;
            throw error;
        }
        return res.status(200).json({
            status : 200,
            success : true,
            requests : requests?.[0]?.inviteRequests || [],
        })

    } catch (err) {
        next(err);
    }
}
const changeRequest = async (req,res,next) =>{
    try {
        const {id,status} = req.params;
        
        const request = await UsersModel.findOne({"inviteRequests._id" : id});
        
        const findRequest = request.inviteRequests.find(item => {
            return item.id == id;
        });
        
        if(!request){
            const error = new Error("درخواستی با این مشخصات یافت نشد");
            error.statusCode = 404;
            throw error;
        }

        if(findRequest.status !== "pending"){
            const error = new Error("این درخواست قبلا رد یا پذیرفته شده است")
            error.statusCode = 400;
            throw error;
        }
        
        if(!["accepted","rejected"].includes(status)){
            const error = new Error("اطلاعات ارسال شده صحیح نمی باشد");
            error.statusCode = 400;
            throw error;
        }
        
        await UsersModel.updateOne(
            {"inviteRequests._id" : id},
            {$set : {"inviteRequests.$.status" : status}}
        );
        
        return res.status(200).json({
            statusCode : 200,
            success : true,
            message : "تغییر وضعیت درخواست با موفقیت انجام شد",
        });
        
    } catch (err) {
        next(err);
    }
}
module.exports = {
    getProfile,
    editProfile,
    changeRequest,
    getAllinvites,
    uploadImage,
    getRequestsByStatus,
}