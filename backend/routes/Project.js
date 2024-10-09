import express from 'express';
import auth from '../middleware/auth.js';
import User from '../models/User.js';
import { check, validationResult } from "express-validator";
import Project from '../models/project.js';
import authorize from '../middleware/access.js'
const router = express.Router();

// CREATE PROJECT
router.post('/', auth, authorize(['admin', 'projectOwner']), [
    check('title', 'Project title is required').not().isEmpty(),
    check('description', 'Project description is required').not().isEmpty(),
    check('technologies', 'Project technologies are required').isArray(),
    check('githubLink', "Project Link required").isURL().notEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const user = await User.findById(req.user.id).select('-password');
        const { title, description, technologies, githubLink } = req.body;
        const newProject = new Project({
            title,
            description,
            technologies,
            createdBy: req.user.id,
            githubLink
        });
        const project = await newProject.save();
        user.createdProjects.push(project._id);
        await user.save();
        res.json(project);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});


//UPDATE PROJECT
router.patch('/:projectId',auth,authorize(['admin','projectHead']),
[check('title','Title is requires').optional().not().isEmpty(),
 check('dexription','Description is required').optional().not().isEmpty(),
  check('technologies','Technologies should be an array').isArray()
]
,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {title,description,technologies}=req.body;
    try {
        const project=await Project.findById(req.params.projectId)
        if(!project){
            return res.status(404).json({msg:'Project Not Found'})

        }
        
       if(project.createdBy.toString()!==req.user.id && req.user.role!=='admin'){
          res.status(401).json({msg:'User Nit Authorized'})
       }
       if(title)project.title=title
       if(description)project.description=description
       if(technologies) project.technologies=technologies
      await project.save()
      res.json(project)
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

// GET PROJECTS
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('createdBy', ['username', 'email']);
        res.json(projects);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// Join as Collaborator
router.post('/:projectId/join', auth, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ msg: 'Project Not Found' });
        }

        // Check if the user is already a collaborator
        if (project.collaborators.includes(req.user.id)) {
            return res.status(400).json({ msg: 'User already a collaborator' });
        }

        // Add user to project's collaborators
        project.collaborators.push(req.user.id);
        await project.save();

        // Add project to user's contributed projects
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User Not Found' });
        }
        user.contributedProjects.push(project._id);
        await user.save();

        res.json({ msg: 'User added as collaborator', project });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

export default router;


