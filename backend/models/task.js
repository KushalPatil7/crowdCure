import mongoose from 'mongoose'

const taskSchema=new mongoose.Schema({
    title:{type:String,required: true},
    description:{type:String, required:true},
    project:{type:mongoose.Schema.Types.ObjectId,red:'Project',required:true},
    assignedTo:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    status:{type:String,enum:['Pending','In-Progress','Completed'],default:'Pending'},
    createdAt:{type:Date,default:Date.now},
    dueDate:{type:Date}

})
const Task =mongoose.model('Task',taskSchema)
export default Task;