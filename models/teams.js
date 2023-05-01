const mongoose = require("mongoose");
const {teamSchema} = require("../validations/teamValidation.js");

const TeamSchema = new mongoose.Schema({
    name:{
        type : String,
        trim: true,
        required: true,
    },
    Description:{
        type : String,
        minlength: 25,
        maxlength: 255,
    },
    username:{
        type: String,
        minlength: 4,
        required: true,
        unique: true,
    },
    users:{
        type : [mongoose.Types.ObjectId],
        default : [],
    },
    owner: {
        type : [mongoose.Types.ObjectId],
        required: true,
    },
},{
    timestamps: true,
});
TeamSchema.statics.teamValidation = function(body){
    return teamSchema.validate(body,{abortEarly : true});
}
const TeamModel = mongoose.model("TeamModel",TeamSchema);

module.exports = TeamModel;