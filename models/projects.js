const mongoose = require("mongoose");


const {projectValidation} = require("../validations/projectValidation");

const ProjectSchema = new mongoose.Schema({
    Title:{
        type : String,
        required: true,
    },
    Text:{
        minlength: 3,
        maxlength: 50,
        type : String,
    },
    Image:{
        type : String,
        default: "/defaults/default.png"
    },
    owner:{
        type : [mongoose.Types.ObjectId],
        required: true,
    },
    Team:{
        type : [mongoose.Types.ObjectId],
    },
    Private : {
        type : Boolean,
        default : true,
    },
    tags: {
        type : [String],
        default : [],
        minlength: 0,
        maxlength:10,
    },
},{
    timestamps: true,
});

ProjectSchema.statics.projectValidation = function(body){

    return projectValidation.validate(body,{abortEarly : true})
}

const ProjectModel = mongoose.model("ProjectModel",ProjectSchema);

module.exports = ProjectModel;
