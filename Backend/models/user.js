import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required: true
    },
     email:{
        type:String,
        required: true,
        unique:true
    },
     phoneNumber:{
        type:Number,
        required: true
    },
     password:{
        type:String,
        required: true
    },
     role:{
        type:String,
        enum:['student','recruiter'],
        required: true
    },
    profile:{
        bio:{type:string},
        skills:[{type:string}],
        resume:{type:string},
        resumeOriginalName: {type: String},
        company:{type:mongoose.Schema.Types.objectId, ref:company},
        profilePhoto:{
            type:String,
            default: ""
        }
    }
},{timestamps:true});

export const user = mongoose.model('User',userSchema);