import express from "express";
import auth from "../middleware/auth.js";
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';

const router = express.Router();

// Get user profile
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: "User Not Found" });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message); // Log the error for debugging
    res.status(500).send('Server Error');
  }
});

// Update user profile
router.put(
  '/me',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('bio', 'Bio is optional').optional().isString(),
      check('profilePicture', 'Profile picture URL is optional').optional().isURL()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, bio, profilePicture } = req.body;
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
      
      // Update fields only if a new value is provided
      user.name = name || user.name;
      user.bio = bio || user.bio;
      user.profilePicture = profilePicture || user.profilePicture;

      await user.save(); // Save the updated user to the database
      res.json(user);
    } catch (error) {
      console.error(error.message); // Log the error for debugging
      res.status(500).send('Server error');
    }
  }
);

export default router;
