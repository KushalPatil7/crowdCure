import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },  // Fixed typo: 'passowrd' -> 'password'
  createdAt: { type: Date, default: Date.now }, // Fixed typo: 'typr' -> 'type'
  role: { type: String, default: 'user' },
  points: { type: Number, default: 0 },
  bio: { type: String },
  profilePicture: { type: String },
  solutions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Solution' }], // Fixed typo: 'types' -> 'type'
  problems: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Problem' }], // Added field for problems
  createdProjects: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project'
    }
],
  contributedProjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project' }] // Projects the user contributed to
});

// Optional: Add index for performance
userSchema.index({ username: 1 });
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

export default User;

