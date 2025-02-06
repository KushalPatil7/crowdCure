import express from 'express';
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

const router = express.Router();

// Route: Register a new user with email and password
router.post(
  '/',
  [
    check('username', "Username is required")
      .trim()
      .not().isEmpty()
      .isLength({ min: 3, max: 30 })
      .withMessage('Username must be between 3 and 30 characters'),
    check('email', "Please include a valid Email")
      .trim()
      .isEmail()
      .normalizeEmail(),
    check('password', "Password must be 6 or more characters")
      .isLength({ min: 6, max: 50 })
      .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/)
      .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number')
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;
    try {
      // Step 1: Check if user exists using case-insensitive email search
      let user = await User.findOne({ 
        email: { $regex: new RegExp(`^${email}$`, 'i') } 
      });

      if (user) {
        // If the user exists with Google login, suggest logging in with Google
        if (user.googleId) {
          return res.status(400).json({ 
            msg: 'This email is registered with Google. Please log in with Google.' 
          });
        }
        // If user exists with email/password, show appropriate error
        return res.status(400).json({ 
          msg: 'User already exists with this email.' 
        });
      }

      // Step 2: Create new user with sanitized data
      user = new User({
        username: username.trim(),
        email: email.toLowerCase(),
        password,
        role: 'user',  // Set default role
        createdAt: Date.now()
      });

      // Step 3: Hash password with increased security
      const salt = await bcrypt.genSalt(12);  // Increased rounds for better security
      user.password = await bcrypt.hash(password, salt);
      
      await user.save();

      // Step 4: Generate JWT with appropriate payload
      const payload = {
        user: {
          id: user.id,
          role: user.role,
          email: user.email
        }
      };

      // Step 5: Sign token and send response
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { 
          expiresIn: '24h'  // More reasonable token expiration
        },
        (err, token) => {
          if (err) throw err;
          res.status(201).json({ 
            msg: 'Registration successful',
            token,
            user: {
              id: user.id,
              username: user.username,
              email: user.email,
              role: user.role
            }
          });
        }
      );
    } catch (err) {
      console.error('Registration error:', err.message);
      if (err.code === 11000) {  // Duplicate key error
        return res.status(400).json({ 
          msg: 'Email already registered' 
        });
      }
      res.status(500).json({ 
        msg: 'Server error during registration' 
      });
    }
  }
);

export default router;
