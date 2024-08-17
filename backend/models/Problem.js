import mongoose from 'mongoose'

const problemSchema=new mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String,reqired:true},
    category:{type:String},
    tags:{type:[String]},
    createdAt:{type:Date,default:Date.now},
    updatedAt:{type:Date,default:Date.now},
    status:{type:String , default:'open'},
    comments: [
        {
          commentId: { type: mongoose.Schema.Types.ObjectId },
          userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          comment: { type: String },
          createdAt: { type: Date, default: Date.now },
        },
      ],
      attachments: { type: [String] },
      solutionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Solution' },

})

const Problem= mongoose.model('Problem', problemSchema)
export default  Problem