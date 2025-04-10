import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Project } from "../model/project.model.js";
import { Discussion } from "../model/discussion.model.js";
import { User } from "../model/user.model.js";

/**
 * Create a new project
 */
const createProject = asyncHandler(async (req, res) => {
  const { title, description, overview, repoLink } = req.body;
  const owner = req.user._id;

  if (!title || !description || !repoLink) {
    throw new ApiError(400, "All fields are required");
  }

  const project = await Project.create({ title, description, owner, overview, repoLink });
  await project.save();

  return res.status(201).json(new ApiResponse(201, project, "Project created successfully"));
});

/**
 * Update a project
 */
const updateProject = asyncHandler(async (req, res) => {
  const { title, description, overview, repoLink } = req.body;
  const userId = req.user.id;
  const { id } = req.params;
  if(!id){
    throw new ApiError(400, "Project ID is required");
  }
  const project=await Project.findById(id);
  

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (String(project.owner) !== userId) {
    throw new ApiError(403, "You are not allowed to update this project");
  }

  const updatedProject = await Project.findByIdAndUpdate(
    id,
    { $set: { title, description, overview, repoLink } },
    { new: true }
  );

  return res.status(200).json(new ApiResponse(200, updatedProject, "Project updated successfully"));
});

/**
 * Get a project by ID
 */
const getProjectById = asyncHandler(async (req, res) => {
  const {id}=req.params;
  if(!id){
    throw new ApiError(400, "Project ID is required");
  }
  const project = await Project.findById(req.params.id)
    .populate("owner", "name email")
    .populate("members", "name email")
    

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res.status(200).json(new ApiResponse(200, project, "Project fetched successfully"));
});

/**
 * Get all projects
 */
const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().populate("owner", "name email");

  return res.status(200).json(new ApiResponse(200, projects, "All projects fetched successfully"));
});

/**
 * Delete a project
 */
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  const userId = req.user._id;

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (String(project.owner) !== String(userId)) {
    throw new ApiError(403, "You are not allowed to delete this project");
  }

  await project.remove();
  return res.status(200).json(new ApiResponse(200, null, "Project deleted successfully"));
});

const sendJoinRequest = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;
  if(!id){
    throw new ApiError(400, "Project ID is required");
  }
  const project = await Project.findById(id);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }
  if (project.joinRequests.includes(userId)) {
    throw new ApiError(400, "Join request already sent");
  }
  project.joinRequests.push(userId);
  await project.save();
  return res.status(200).json(new ApiResponse(200, project, "Join request sent successfully"));

})

const handleJoinRequest = asyncHandler(async (req, res) => {
  const { userId, action } = req.body; // user to accept/reject and the action
  const projectId = req.params.projectId;
  const ownerId = req.user._id;

  const project = await Project.findById(projectId);
  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.owner.toString() !== ownerId.toString()) {
    throw new ApiError(403, "Only project owner can manage join requests");
  }

  const isRequested = project.joinRequests.includes(userId);
  if (!isRequested) {
    throw new ApiError(400, "User has not requested to join");
  }

  if (action === "accept") {
    
    if (!project.members.includes(userId)) {
      project.members.push(userId);
    }
  }

  // Remove from joinRequests either way
  project.joinRequests = project.joinRequests.filter(
    (id) => id.toString() !== userId.toString()
  );

  await project.save();
  const message = action === "accept"
  ? "User accepted and added to the project"
  : "User's join request rejected";

  return res.status(200).json(
    new ApiResponse(
      200,
      project,
      message
    )
  );
});


/**
 * Remove a member from the project
 */
const removeMember = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (String(project.owner) !== String(req.user._id)) {
    throw new ApiError(403, "Only the project owner can remove members");
  }

  project.members = project.members.filter((member) => String(member) !== String(userId));
  await project.save();

  return res.status(200).json(new ApiResponse(200, project, "Member removed successfully"));
});

/**
 * Get all projects of a specific user
 */
const getUserProjects = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const projects = await Project.find({
    $or: [{ owner: userId }, { members: userId }],
  });

  return res.status(200).json(new ApiResponse(200, projects, "User's projects fetched successfully"));
});

/**
 * Start a discussion in a project
 */
// const startDiscussion = asyncHandler(async (req, res) => {
//   const { message } = req.body;
//   const userId = req.user._id;
//   const project = await Project.findById(req.params.id);

//   if (!project) {
//     throw new ApiError(404, "Project not found");
//   }

//   const discussion = await Discussion.create({
//     project: req.params.id,
//     user: userId,
//     message,
//   });

//   return res.status(201).json(new ApiResponse(201, discussion, "Discussion started successfully"));
// });

/**
 * Get discussions for a project
 */
// const getProjectDiscussions = asyncHandler(async (req, res) => {
//   const discussions = await Discussion.find({ project: req.params.id }).populate("user", "name email");

//   return res.status(200).json(new ApiResponse(200, discussions, "Discussions fetched successfully"));
// });

export {
  createProject,
  updateProject,
  getProjectById,
  getAllProjects,
  deleteProject,
  sendJoinRequest,
  handleJoinRequest,
  removeMember,
  getUserProjects
};
