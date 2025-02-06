import express from "express";
import { check, validationResult } from "express-validator";
import auth from '../middleware/auth.js';
import checkRole from '../middleware/access.js';
import Problem from '../models/Problem.js';
import User from "../models/User.js";

const router = express.Router();

// Create a new problem
router.post(
  '/',
  auth,
  checkRole(['user', 'admin']),
  [
    check('title', "Title is required").not().isEmpty().trim(),
    check('description', "Description is required").not().isEmpty().trim(),
    check('category', 'Category is optional').optional().trim(),
    check('tags', 'Tags is optional').optional().isArray(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Sanitize and prepare data
      const problemData = {
        title: req.body.title.trim(),
        description: req.body.description.trim(),
        createdBy: req.user.id,
        category: req.body.category?.trim(),
        tags: req.body.tags,
        status: 'active'
      };

      const newProblem = new Problem(problemData);
      const problem = await newProblem.save();
      
      // Populate creator info in response
      await problem.populate('createdBy', ['name', 'email']);
      res.status(201).json(problem);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// Update a problem
router.patch(
  '/:problemId',
  [
    auth,
    checkRole(['user', 'admin']),
    [
      check('title').optional().trim().notEmpty().withMessage('Title cannot be empty if provided'),
      check('description').optional().trim().notEmpty().withMessage('Description cannot be empty if provided'),
      check('category').optional().trim().notEmpty().withMessage('Category cannot be empty if provided'),
      check('tags').optional().isArray().withMessage('Tags must be an array'),
      check('status').optional().isIn(['active', 'resolved', 'pending']).withMessage('Invalid status'),
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Sanitize update data
      const updates = {};
      if (req.body.title) updates.title = req.body.title.trim();
      if (req.body.description) updates.description = req.body.description.trim();
      if (req.body.category) updates.category = req.body.category.trim();
      if (req.body.tags) updates.tags = req.body.tags;
      if (req.body.status) updates.status = req.body.status;

      // Use findOneAndUpdate for atomic operation
      const problem = await Problem.findOneAndUpdate(
        {
          _id: req.params.problemId,
          $or: [
            { createdBy: req.user.id },
            { $and: [{ role: 'admin' }] }
          ]
        },
        { $set: updates },
        { new: true, runValidators: true }
      ).populate('createdBy', ['name', 'email']);

      if (!problem) {
        return res.status(404).json({ msg: 'Problem not found or unauthorized' });
      }

      res.json(problem);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// Delete a problem
router.delete('/:problemId', [auth, checkRole(['admin'])], async (req, res) => {
  try {
    const problem = await Problem.findById(req.params.problemId);
    if (!problem) {
      return res.status(404).json({ msg: 'Problem not found' });
    }

    // Only admins can delete problems
    await problem.remove();
    res.json({ msg: 'Problem removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Get all problems
router.get('/', [auth, checkRole(['admin', 'user'])], async (req, res) => {
  try {
    const problems = await Problem.find().sort({ createdAt: -1 }).populate('createdBy', ['name', 'email']);
    res.json(problems);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

export default router;
