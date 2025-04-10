import mongoose from "mongoose";

const DiscussionSchema = new mongoose.Schema({
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Project",

    },
    title:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    content:{
        type:String,
        required:true,
    },
   
      
    
},{timestamps:true});
const Discussion=mongoose.model('Discussion',DiscussionSchema);
export { Discussion}