import mongoose, { Mongoose } from "mongoose";

const questionSchema=new Mongoose.Schema({
    title:{
        type:string,
        required:true,

    },
    description:{
        type:string,
        required:true,
    },
    tags:{
        type:string,
        
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    },
    answer:[{
        type:mongoose.Scheam.Types.ObjectId,
        ref:Answer
    }]

},{timestamps:true})

export const Question=mongoose.model("Question",questionSchema)