import express from 'express'
import Task from '../models/task.js'
import Project from '../models/project.js'
import auth from '../middleware/auth.js'
import createGoogleMeet from '../services/googleMeet.js'
import authorize from '../middleware/access.js'
import User from '../models/User.js'

const router = express.Router()

// Create a new Task

router.post('/',auth,authorize(['admin','projectOwner']),async(req,res)=>{
    const { title, description, projectId, assignedTo, dueDate}=req.body;
    try{
        const project= await Project.findById(projectId)
        if(!project){
            return res.status(404).json({msg:'Project Not Found'})
        }
        const newTask= new Task({
            title,
            description,
            project:projectId,
            assignedTo,
            dueDate
        })
        const task=await newTask.save()
        res.json(task);
    }catch(error){
        console.error(error.message);
        res.status(500).send('Server Error')
    }
})

// Update Task

router.patch('/:taskId',auth,authorize(['admin', 'projectOwner']),async(req,res)=>{
    const {title,description,assignedTo,status,dueDate}=req.body;
    try {
        const task=await Task.findById(req.params.taskId)
        if(!task){
            res.status(404).json({mag:'Task Not Found'})

        }

    if (title) task.title = title;
    if (description) task.description = description;
    if (assignedTo) task.assignedTo = assignedTo;
    if (status) task.status = status;
    if (dueDate) task.dueDate = dueDate;
    await task.save();
    res.json(task);
    } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
    }
})

//Delete a task

router.delete('/:taskId',auth,authorize(['admin', 'projectOwner']),async(req,res)=>{
    try{
        const task=await Task.findById(req.params.taskId);
        if(!task){
            return res.status(404).json({msg:"Task Not Found"});
        }
        await task.remove()
        res.json({msg:'Task  removed'})

    }catch(error){
        console.error(error.messgae)
        res.status(500).send('Server error')
    }
})
// Get task by projects

router.get('/:projectId',auth,async(req,res)=>{
    try {
        const tasks= await Task.find({project:req.params.projectId})
        res.json(tasks);
    } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
    }
})

// ASSIGN TASK TO A USER 
router.patch('/:taskId/assign',auth,authorize(['admin','projectOwner']),
async(req,res)=>{
try{
    const task=await Task.findById(req.params.taskId);
    if(!task){
        return res.status(404).json({msg:'Task Nit Found'})
    }
    const user=await User.findById(req.params.userId);
    if(!user){
        return res.status(404).json({msg:'User Not Found'})
    }
    task.assignedTo=req.body.userId;
    await task.save();
    res.json({msg:"Task assigned to user",task});
}
catch(error){
    console.error(error.message);
    res.status(500).send('Server error');
}
})
// Schedule a meeting for a task
router.post('/tasks/:taskId/schedule-meeting',async(req,res)=>{
    const {taskId}=req.params;
    const {dateTime,duration}=req.body;
    try{
        const task=await Task.findById(taskId).populate('project assignedTo')
        const project=task.project;
        // Get email address of attendees
        const attendees=[task.assignedTo.email];
        if(project.collaborators.length){
            const collaborators=await User.find({_id:{$in:project.collaborators}})
            collaborators.forEach(user=>attendees.push(user.email));
        
        }
        // Create a GMEET event
        const meetLink= await createGoogleMeet(dateTime,duration,attendees);
        res.status(201).json({message:'Meeting scheduled successfully',meetLink});
    }catch (error) {
        console.error('Error scheduling meeting:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export default router;