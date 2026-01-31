const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1d';

// simple guard for missing secret (helpful in dev)
if (!JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET is not set. Tokens will not verify correctly.');
}

// Helper: cookie options based on env
const isProd = process.env.NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  secure: isProd, // require HTTPS in production
  sameSite: isProd ? 'none' : 'lax', // if cross-site in prod, 'none' + secure required
  maxAge: 24 * 60 * 60 * 1000 // 1 day
};

// User Registration
router.post('/register',
  body('name').isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      // normalize input
      const name = req.body.name.trim();
      const email = req.body.email.trim().toLowerCase();
      const password = req.body.password;

      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Register error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// User Login
router.post('/login',
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').exists().withMessage('Password is required'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Standardized payload: include id
      const payload = { id: user._id, email: user.email };
      const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

      // set HttpOnly cookie (env-aware flags)
      res.cookie('token', token, cookieOptions);
      // still return token for API clients if desired
      res.json({ message: 'Login successful', token });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Logout
router.post('/logout', (req, res) => {
  // clear cookie using same options (except maxAge)
  const clearOpts = { httpOnly: cookieOptions.httpOnly, secure: cookieOptions.secure, sameSite: cookieOptions.sameSite };
  res.clearCookie('token', clearOpts);
  res.json({ message: 'Logged out' });
});

// Protected route - get profile
const authMiddleware = require('../middleware/auth');
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.user && req.user.id;
    if (!userId) return res.status(400).json({ message: 'No user id in request' });

    const user = await User.findById(userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    console.error('Profile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
