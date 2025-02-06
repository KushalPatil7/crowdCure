import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 6
  },
  googleId: { 
    type: String,
    unique: true,
    sparse: true
  },
  googleRefreshToken: { 
    type: String 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  role: { 
    type: String, 
    default: 'user',
    enum: ['user', 'admin', 'projectOwner', 'collaborator']
  },
  points: { 
    type: Number, 
    default: 0 
  },
  bio: { 
    type: String 
  },
  profilePicture: { 
    type: String 
  },
  solutions: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Solution' 
  }],
  problems: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Problem' 
  }],
  createdProjects: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  }],
  contributedProjects: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Project' 
  }]
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!this.password) return false;
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error('Password comparison failed');
  }
};

const User = mongoose.model('User', userSchema);

export default User;