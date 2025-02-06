import express from 'express';
import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import crypto from 'crypto';
import oauth2Client from '../config/googleAuth.js';
import User from '../models/User.js';
import { check, validationResult } from 'express-validator';
import { generateToken } from '../utils/jwtUtils.js';
import auth from '../middleware/auth.js';
import session from 'express-session';

const router = express.Router();

// Add session middleware configuration at the top
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: process.env.NODE_ENV === 'production' }
}));

// Route: Register new user
router.post(
  '/register',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('username', 'Username is required').not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password, username } = req.body;

    try {
      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      // Create new user
      user = new User({
        email,
        password, // Password will be hashed in the User model pre-save middleware
        username,
        role: 'user'
      });

      await user.save();

      // Generate token and send response
      const token = generateToken(user);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 5 * 60 * 60 * 1000, // 5 hours
      });
      
      res.status(201).json({
        msg: 'User registered successfully',
        user: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Registration error:', error.message);
      res.status(500).send('Server Error');
    }
  }
);

// Route: Login with email and password
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      console.log('Found user:', user);
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await user.matchPassword(password);
      console.log('Password match:', isMatch); 
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const token = generateToken(user);
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 5 * 60 * 60 * 1000,
      });

      res.json({
        msg: 'Login successful',
        user: {
          id: user._id,
          email: user.email,
          username: user.username
        }
      });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).send('Server Error');
    }
  }
);

// Route: Initiate Google OAuth
router.get('/google', (req, res) => {
  // Generate state parameter for CSRF protection
  const state = crypto.randomBytes(16).toString('hex');
  // Store state in session or temporary storage
  req.session.oauthState = state;

  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    state: state,
    prompt: 'consent' // Always show consent screen
  });

  res.redirect(url);
});

// Route: Google OAuth callback
router.get('/google/callback', async (req, res) => {
  const { code, state } = req.query;

  // Verify state parameter
  if (!state || state !== req.session.oauthState) {
    return res.status(400).json({ msg: 'Invalid state parameter' });
  }

  // Clear state from session
  delete req.session.oauthState;

  if (!code) {
    return res.status(400).json({ msg: 'Authorization code is missing' });
  }

  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const { data } = await oauth2.userinfo.get();

    const { email, name, id: googleId, picture } = data;

    let user = await User.findOne({ email });
    if (user) {
      // Update existing user's Google-related info
      user.googleId = googleId;
      user.profilePicture = picture;
      await user.save();
    } else {
      // Create new user
      user = new User({
        googleId,
        email,
        username: name,
        profilePicture: picture,
        role: 'user',
      });
      await user.save();
    }

    // Add role assignment logic
    if (!user.role) {
      user.role = 'user';  // Default role for Google auth users
    }

    // Add refresh token handling
    if (tokens.refresh_token) {
      user.googleRefreshToken = tokens.refresh_token;
      await user.save();
    }

    const token = generateToken(user);
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 5 * 60 * 60 * 1000,
    });

    // Redirect to frontend success page
    res.redirect(`${process.env.FRONTEND_URL}/auth-success`);
  } catch (error) {
    console.error('Google OAuth error:', error);
    res.redirect(`${process.env.FRONTEND_URL}/auth-error?error=${encodeURIComponent(error.message)}`);
  }
});

// Route: Logout
router.post('/logout', auth, (req, res) => {
  res.clearCookie('token');
  res.json({ msg: 'Logged out successfully' });
});

// Route: Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.error('Get user error:', error.message);
    res.status(500).send('Server Error');
  }
});

export default router;
