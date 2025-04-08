import mongoose from "mongoose";
import User from "./user.model";
import Discussion from "./discussion.model";

const ProjectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    owner: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: User, 
      required: true 
    },
    repoLink: { 
      type: String,
      required:true
    },
    
    members: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: User
    }],
    joinRequests: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: User
    }],
    discussions: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref:Discussion
    }],
  },
  { timestamps: true }
);
Project.createIndex({ name: "text", description: "text" });
const Project = mongoose.model("Project", ProjectSchema);
export default Project;
