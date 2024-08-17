import mongoose from "mongoose"

const solutionSchema = new mongoose.Schema({
  problemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Problem', required: true },
  solutionDescription: { type: String, required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'proposed' },
  votes: { type: Number, default: 0 },
  attachments: { type: [String] },
});

const solution= mongoose.model('Solution', solutionSchema);
 export default solution;
