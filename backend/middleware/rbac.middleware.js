import { Project } from "../model/project.model.js";

// Middleware to check if user has a specific role in the project
export const authorizeProjectRole = (requiredRoles = []) => {
  return async (req, res, next) => {
    try {
      const projectId = req.params.projectId || req.body.projectId;
      const userId = req.user._id;

      if (!projectId) {
        return res.status(400).json({ error: "Project ID is required" });
      }

      const project = await Project.findById(projectId).populate("members.user");

      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }

      // Owner has all permissions
      if (project.owner.toString() === userId.toString()) {
        return next();
      }

      // Find member role
      const member = project.members.find(
        (m) => m.user._id.toString() === userId.toString()
      );

      if (!member) {
        return res.status(403).json({ error: "User is not a project member" });
      }

      if (requiredRoles.includes(member.role)) {
        return next();
      }

      return res.status(403).json({ error: "Insufficient permissions" });
    } catch (error) {
      console.error("RBAC Middleware Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
