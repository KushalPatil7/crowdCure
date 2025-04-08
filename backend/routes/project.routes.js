import {Router} from  'express'
import { createProject, updateProject, getProjectById, getAllProjects, deleteProject, addMember, removeMember, getUserProjects, startDiscussion, getProjectDiscussions } from '../controller/project.controller.js'
import { auth } from '../middleware/auth.middleware.js'
const router=Router()

router.post("/createProject",auth,createProject)
router.put("/updateProject/:id",auth,updateProject)
router.get("/getProject/:id",auth,getProjectById)
router.get("/getAllProjects",getAllProjects)
router.delete("/deleteProject/:id",auth,deleteProject)
router.post("/addMember/:id",auth,addMember)
router.delete("/removeMember/:id",auth,removeMember)