import mongoose, { Mongoose } from "mongoose";

const questionSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true,
    },
    tags:[{
        type:String,
        
    }],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    answer:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Answer'
    }]

},{timestamps:true})

export const Question=mongoose.model("Question",questionSchema)