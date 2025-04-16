import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// 🔐 Signup Route
router.post('/signup', async (req, res) => {
  try {
    console.log('Received signup request:', req.body);

    const {
      username, password, role,
      name, contactInfo,
      affiliation, intent,
      licenseNumber, expertiseAreas
    } = req.body;

    // Check if user already exists
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const userData = {
      username,
      password,
      role,
      name,
      contactInfo
    };

    if (role === 'client') {
      userData.affiliation = affiliation;
      userData.intent = intent;
      userData.approved = false; // Admin must approve
    }

    if (role === 'expert') {
      userData.licenseNumber = licenseNumber;
      userData.expertiseAreas = expertiseAreas;
    }

    const newUser = new User(userData);
    await newUser.save();

    res.status(201).json({ message: 'Signup successful', user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Signup failed' });
  }
});

// 🔐 Login Route (UPDATED)
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.password !== password) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    // ✅ Now return userId too (MongoDB _id)
    res.status(200).json({
      message: 'Login successful',
      role: user.role,
      approved: user.approved || null,
      userId: user._id  // <<--- required for localStorage and future usage
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});

export default router;