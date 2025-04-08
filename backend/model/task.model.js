import mongoose from "mongoose";

const taskSchema =new mongoose.Schema({
   project:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Project",
},
title:{
    type:String,
    required:true,
    trim:true,
},
description:{
    type:String,
    required:true,
},
assignedTo:{
    type:mongoose.Schema.Types.ObjectId,
    ref:User,
    default:null,
},
status:{
    type:String,
    enuma:["open", "in-progress", "completed"],
    
},
createdAt:{
        type:Date,
        default:Date.now,
    },

},{timestamps:true});

const Task=mongoose.model("Task",taskSchema);   
export default Task;