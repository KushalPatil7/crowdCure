import mongoose from 'mongoose'
const projectSchema=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String , required:true},
    technologies:[String],
    createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    collaborators:[{ type: mongoose.Schema.Types.ObjectId, ref:'User'}],
    createdAt:{type:Date , default:Date.now }
});

const Project = mongoose.model('Project',projectSchema);

export default Project;