import { Router } from 'express';
import {
   createProject,
   updateProject,
   getProjectById,
   getAllProjects,
   deleteProject,
   sendJoinRequest,
   handleJoinRequest,
   removeMember,
   getUserProjects
} from '../controller/project.controller.js';
import { verifyJWT } from '../middleware/auth.middleware.js';
import { authorizeProjectRole } from '../middleware/rbac.middleware.js';

const router = Router();

// Only logged-in users can create projects
router.post("/createProject", verifyJWT, createProject);

// Only maintainers or owner can update a project
router.put("/updateProject/:id", verifyJWT, authorizeProjectRole(["maintainer"]), updateProject);

// Anyone can see all projects (public access)
router.get("/getAllProjects", getAllProjects);

// Only members or owner can view a specific project
router.get("/getProject/:id", verifyJWT, authorizeProjectRole(["member", "maintainer"]), getProjectById);

// Only owner can delete the project
router.delete("/deleteProject/:id", verifyJWT, authorizeProjectRole([]), deleteProject);

// Only maintainers or owner can add/remove members
router.post("/addMember/:id", verifyJWT, authorizeProjectRole(["maintainer"]), handleJoinRequest);
router.post("/sendJoinRequest/:id", verifyJWT, sendJoinRequest);
router.delete("/removeMember/:id", verifyJWT, authorizeProjectRole(["maintainer"]), removeMember);

// You can uncomment these when you implement them later
router.get("/userProjects", verifyJWT, getUserProjects);
// router.post("/startDiscussion/:id", verifyJWT, authorizeProjectRole(["member", "maintainer"]), startDiscussion);
// router.get("/getDiscussions/:id", verifyJWT, authorizeProjectRole(["member", "maintainer"]), getProjectDiscussions);

export default router;
