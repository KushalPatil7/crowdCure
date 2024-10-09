import express from 'express';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import oauth2Client from '../config/googleAuth.js';
import User from '../models/User.js';

import { check, validationResult } from 'express-validator';

const router = express.Router();

// Route: Redirect user to Google for OAuth
router.get('/google', (req, res) => {
  const scopes = ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'];
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
});
// User login route
router.post('/login', 
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ], 
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Use matchPassword to check the password
      const isMatch = await user.matchPassword(password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      // Create and return JWT
      const payload = {
        user: {
          id: user.id
        }
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);

// Route: Google OAuth callback
router.get('/google/callback', async (req, res) => {
  const { code } = req.query;

  try {
    // Step 1: Get the OAuth2 token from Google
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Step 2: Get user profile information from Google
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const { data } = await oauth2.userinfo.get();

    // Step 3: Extract required fields from Google user info
    const { email, name, id: googleId, picture } = data;

    // Step 4: Check if a user already exists in the database with the email
    let user = await User.findOne({ email });

    if (user) {
      // If user exists but does not have a Google ID, update their record to include the Google ID
      if (!user.googleId) {
        user.googleId = googleId;
        await user.save();
      }
    } else {
      // If user does not exist, create a new user with Google details
      user = new User({
        googleId,
        email,
        username: name,
        profilePicture: picture,
        role: 'user', // Default role for new users
      });
      await user.save();
    }

    // Step 5: Generate a JWT token for the user
    const payload = {
      user: {
        id: user.id,
        role: user.role,  // Include role for further authorization checks
      },
    };

    const token = jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' } // Set token expiration time
    );

    // Step 6: Send the JWT token to the client (or store it in a cookie)
    res.json({ token, msg: 'User authenticated successfully with Google!' });
  } catch (error) {
    console.error('Error during Google OAuth callback:', error.message);
    res.status(500).send('Server error during authentication');
  }
});

// Export the auth routes
export default router;
