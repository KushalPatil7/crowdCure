import express from "express";
import auth from "../middleware/auth.js";
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';
import mongoose from 'mongoose';
import checkRole from '../middleware/access.js';

const router = express.Router();

// Get authenticated user's profile (accessible by all authenticated users)
router.get('/me', auth, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
      return res.status(400).json({ msg: 'Invalid User ID' });
    }

    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

// Update authenticated user's profile (accessible by "user" role)
router.put(
  '/me',
  [
    auth,
    checkRole(['user']),
    [
      check('username', 'Username must be a string').optional().trim().isString(),
      check('email', 'Must be a valid email').optional().trim().isEmail(),
      check('bio', 'Bio must be a string').optional().trim().isString(),
      check('profilePicture', 'Must be a valid URL').optional().isURL(),
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      // Prepare updates object
      const updates = {};
      const allowedUpdates = ['username', 'bio', 'profilePicture', 'email'];
      
      Object.keys(req.body).forEach(key => {
        if (allowedUpdates.includes(key)) {
          updates[key] = req.body[key].trim();
        }
      });

      // Use findOneAndUpdate for atomic operation
      const user = await User.findOneAndUpdate(
        { _id: req.user.id },
        { 
          $set: updates,
          updatedAt: Date.now()
        },
        { 
          new: true,
          runValidators: true,
          select: '-password'  // Exclude password from response
        }
      );

      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }

      res.json({
        msg: 'Profile updated successfully',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          bio: user.bio,
          profilePicture: user.profilePicture,
          updatedAt: user.updatedAt
        }
      });

    } catch (error) {
      console.error('Profile update error:', error.message);
      if (error.code === 11000) {  // Duplicate key error
        return res.status(400).json({ msg: 'Email already in use' });
      }
      res.status(500).json({ msg: 'Server error during profile update' });
    }
  }
);

// Admin access to view any user's profile
router.get('/:userId', auth, checkRole(['admin']), async (req, res) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ msg: 'Invalid User ID' });
  }

  try {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal server error');
  }
});

export default router;
