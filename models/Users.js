const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const {userValidation} = require("../validations/userValition.js");


const inviteSchema = new mongoose.Schema({
    teamId : {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    caller: {
        type: String,
        required: true,
        lowercase : true,
    },
    requestDate: {
        type : Date,
        default : new Date(),
    },
    status:{
        type : String,
        default: "pending",
        enum: ["pending","accepted","rejected"],
    },
    teamName:{
        type : String,
        required : true,
    },
});



const UsersSchema = new mongoose.Schema({
    FullName:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    UserName:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
    },
    PhoneNumber:{
        type: String,
        required: true,
        unique: true,
        maxlength: 11,
        minlength: 11,
    },
    Password:{
        type: String,
        required: true,
        trim: true,
        minlength: 6,
        maxlength: 255,
    },
    Email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    profile_image:{
        type: String,
        required: false,
    },
    inviteRequests: {
        type : [inviteSchema],
    },
    Rols:{
        type: [String],
        default: ["User"],
    },
    Skills:{
        type: [String],
        default: [],
    },
    Teams:{
        type: [String],
        default: [],
    },
},{
    timestamps : true,
});

UsersSchema.statics.userValidation = function(body){
    return userValidation.validate(body,{abortEarly : true});
}

UsersSchema.pre("save",function(next){
    let user = this;
    if(!user.isModified("Password")) return next();
    
    bcrypt.hash(user.Password , 10 , (err,hash) => {
        if(err) return next(err);
        user.Password = hash;
        next();
    });
});



const UsersModel = mongoose.model("UsersModel",UsersSchema);

module.exports =  UsersModel;
