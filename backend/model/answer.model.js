import mongoose from "mongoose";
import { Question } from "./question.model.js";

const answerSchema=new mongoose.Schema({
    
    description:{
        type:String,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    question:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Question'
    }
},{timestamps:true})

export const Answer= mongoose.model("Answer",answerSchema);