import mongoose from 'mongoose';

const SolutionSchema = new mongoose.Schema({
    problemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Problem',
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    solutionDescription: {
        type: String,
        required: true,
    },
    upvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    downvotes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending'
    },
    attachments: [{
        type: String,  // URLs to attached files
        required: false
    }],
    voteCount: {
        type: Number,
        default: 0
    }
});

SolutionSchema.index({ problemId: 1, createdAt: -1 });

SolutionSchema.methods.calculateVotes = function() {
    return this.upvotes.length - this.downvotes.length;
};

export default mongoose.model('Solution', SolutionSchema);
