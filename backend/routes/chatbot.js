import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { SessionsClient } from '@google-cloud/dialogflow';
import mongoose from 'mongoose'; // Import mongoose if you're using it for database operations
import Task from '../models/task.js';
import User from '../models/User.js';
import auth from '../middleware/auth.js';

const router = express.Router();
const sessionClient = new SessionsClient();
const projectId = process.env.PROJECT_ID; // Make sure to have your PROJECT_ID in the .env

router.post('/', async (req, res) => {
  const { message, sessionId } = req.body;
  if (!message) {
    return res.status(400).json({ error: 'Message is required in the request body' });
  }

  const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId || uuidv4());

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
  
    // Log the response to see what is being returned by Dialogflow
    console.log('Dialogflow Response:', JSON.stringify(result, null, 2));
  
    const intentName = result.intent.displayName;
    let fulfillmentText = result.fulfillmentText;
  
    // Check the detected intent and parameters
    console.log('Detected Intent:', intentName);
    console.log('Parameters:', result.parameters.fields);
  
    switch (intentName) {
      case 'Create Task':
        const { title, description, projectId, assignedTo, dueDate } = result.parameters.fields;
        console.log('Creating Task with parameters:', title, description, projectId, assignedTo, dueDate);
        const newTask = new Task({
          title: title.stringValue,
          description: description.stringValue,
          project: projectId.stringValue,
          assignedTo: assignedTo.stringValue,
          dueDate: dueDate.stringValue,
        });
        await newTask.save();
        fulfillmentText = `Task "${title.stringValue}" created successfully!`;
        break;
  
      case 'Update Task':
        const taskId = result.parameters.fields.taskId.stringValue;
        console.log('Updating Task with ID:', taskId);
        const taskToUpdate = await Task.findById(taskId);
        if (!taskToUpdate) {
          fulfillmentText = 'Task not found.';
          break;
        }
        // Update fields based on provided parameters
        if (result.parameters.fields.title) taskToUpdate.title = result.parameters.fields.title.stringValue;
        if (result.parameters.fields.description) taskToUpdate.description = result.parameters.fields.description.stringValue;
        if (result.parameters.fields.assignedTo) taskToUpdate.assignedTo = result.parameters.fields.assignedTo.stringValue;
        if (result.parameters.fields.status) taskToUpdate.status = result.parameters.fields.status.stringValue;
        if (result.parameters.fields.dueDate) taskToUpdate.dueDate = result.parameters.fields.dueDate.stringValue;
        await taskToUpdate.save();
        fulfillmentText = `Task "${taskToUpdate.title}" updated successfully!`;
        break;
  
      case 'Delete Task':
        const deleteTaskId = result.parameters.fields.taskId.stringValue;
        console.log('Deleting Task with ID:', deleteTaskId);
        const taskToDelete = await Task.findById(deleteTaskId);
        if (!taskToDelete) {
          fulfillmentText = 'Task not found.';
          break;
        }
        await taskToDelete.remove();
        fulfillmentText = `Task "${taskToDelete.title}" deleted successfully!`;
        break;
  
      case 'Get Tasks':
        const projectIdForTasks = result.parameters.fields.projectId.stringValue;
        console.log('Getting Tasks for Project ID:', projectIdForTasks);
        const tasks = await Task.find({ project: projectIdForTasks });
        if (tasks.length === 0) {
          fulfillmentText = 'No tasks found for this project.';
        } else {
          fulfillmentText = `Tasks for project: ${tasks.map(task => task.title).join(', ')}`;
        }
        break;
  
      // Add additional cases for other intents if necessary
      default:
        console.log('Default Case Triggered. Unrecognized intent:', intentName);
        fulfillmentText = "I'm sorry, I didn't understand that.";
    }
  
    res.json({ reply: fulfillmentText });
  } catch (error) {
    console.error('Error during Dialogflow request:', error);
    res.status(500).send('Error processing chatbot message');
  }
// catch (error) {
//     console.error('Error during Dialogflow request:', error);
//     res.status(500).send('Error processing chatbot message');
//   }
});

export default router;
