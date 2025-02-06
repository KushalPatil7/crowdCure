import express from 'express';
import { check, validationResult } from 'express-validator';
import auth from '../middleware/auth.js';
import checkRole from '../middleware/access.js';
import Problem from '../models/Problem.js';
import Solution from '../models/Solution.js';
import mongoose from 'mongoose';

const router = express.Router();

// Get all solutions for a specific problem
router.get('/:problemId', async (req, res) => {
  const { problemId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    const solutions = await Solution.find({ problemId })
      .populate('createdBy', ['name', 'email'])
      .sort({ voteCount: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const total = await Solution.countDocuments({ problemId });

    res.json({
      solutions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// Update a solution
router.patch(
  '/:solutionId',
  auth,
  checkRole(['user']),
  [
    check('solutionDescription').optional()
      .trim()
      .notEmpty()
      .isLength({ max: 10000 })
      .withMessage('Solution description cannot exceed 10000 characters'),
    check('status').optional()
      .isIn(['pending', 'approved', 'rejected']),
    check('attachments').optional()
      .isArray()
      .withMessage('Attachments must be an array')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const solution = await Solution.findOneAndUpdate(
        {
          _id: req.params.solutionId,
          createdBy: req.user.id
        },
        {
          $set: {
            ...req.body,
            updatedAt: Date.now()
          }
        },
        { new: true, runValidators: true }
      ).populate('createdBy', ['name', 'email']);

      if (!solution) {
        return res.status(404).json({ 
          msg: 'Solution not found or unauthorized' 
        });
      }

      res.json(solution);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server error');
    }
  }
);

// Delete a solution
router.delete('/:solutionId', auth, checkRole(['user']), async (req, res) => {
  try {
    const solution = await Solution.findById(req.params.solutionId);

    if (!solution) {
      return res.status(404).json({ msg: 'Solution Not Found' });
    }

    if (solution.createdBy.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User Not Authenticated' });
    }

    await solution.remove();
    res.json({ msg: 'Solution removed', id: solution.id });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

export default router;
