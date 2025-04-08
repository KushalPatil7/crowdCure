import mongoose from "mongoose"

const JoinRequestSchema= new mongoose.Schema({
    project:{
        type:mongoose.schema.types.ObjectId,
        ref:Project,
        required:true
    },
    user:{
        type:mongoose.schema.types.ObjectId,
        ref:User,
        required:true
    },
    status:{type:String,
        enum:["Pending","Accepted","Rejected"],
        default:"Pending"
    },


},{timestamps:true})

const JoinRequest= mongoose.model("JoinRequest",JoinRequestSchema)
export default JoinRequest