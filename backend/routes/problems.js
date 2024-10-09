import express from "express";
import { check, validationResult } from "express-validator";
import auth from '../middleware/auth.js';
import Problem from '../models/Problem.js';
import User from "../models/User.js";

const router = express.Router();

// Create a new problem
router.post(
  '/',
  [
    auth,
    [
      check('title', "Title is required").not().isEmpty(),
      check('description', "Description is required").not().isEmpty(),
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');

      const newProblem = new Problem({
        title: req.body.title,
        description: req.body.description,
        createdBy: req.user.id,
      });

      const problem = await newProblem.save();
      res.status(201).json(problem); // Set status to 201
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Update a problem
router.patch(
  '/:problemId',
  auth,
  [
    check('title', 'Title is optional').optional().not().isEmpty(),
    check('description', 'Description is optional').optional().not().isEmpty(),
    check('category', 'Category is optional').optional().not().isEmpty(),
    check('tags', 'Tags should be an array').optional().isArray(),
    check('status', 'Status is optional').optional().not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const problem = await Problem.findById(req.params.problemId);
      if (!problem) {
        return res.status(404).json({ msg: 'Problem not found' });
      }

      // Check if the user is authorized to update the problem
      if (problem.createdBy.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }

      // Update fields
      Object.assign(problem, req.body); // Update only provided fields

      // Save the updated problem
      await problem.save();
      res.json(problem);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// Delete a problem
router.delete('/:problemId', auth, async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.problemId);
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }

    // Check if the user is authorized to delete the problem
    if (problem.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Remove the problem
    await problem.remove();
    res.json({ msg: 'Problem removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all problems - now restricted to authenticated users
router.get('/', async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 }).populate('createdBy', ['name', 'email']);
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
