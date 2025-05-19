import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
     description:{
        type: String,
    },
     website:{
        type: String,
    },
     location:{
        type: Number,
    },
     logo:{
        type: String,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
},{timestamps:true});

export const Job = mongoose.model("Job",jobSchema);