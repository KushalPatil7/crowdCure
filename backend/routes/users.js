import express from 'express';
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// Route: Register a new user with email and password
router.post(
  '/',
  [
    check('username', "Name is required").not().isEmpty(),
    check('email', "Please include a valid Email").isEmail(),
    check('password', "Please enter a password of 6 or more characters").isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      // Step 1: Check if a user with this email already exists
      let user = await User.findOne({ email });
      if (user) {
        // If the user already exists with Google login, suggest logging in with Google
        if (user.googleId) {
          return res.status(400).json({ msg: 'User already exists. Please log in with Google.' });
        }
        // If user already exists with email/password, show appropriate error
        return res.status(400).json({ msg: 'User already exists with this email.' });
      }

      // Step 2: Register a new user with email and password
      user = new User({
        username,
        email,
        password,
      });

      // Step 3: Hash the password before saving
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      // Step 4: Generate a JWT token and return it
      const payload = {
        user: {
          id: user.id,
          role: user.role,  // Include role in payload for further authorization checks
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: 360000 },  // Token expiration
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

export default router;
