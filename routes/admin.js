import express from 'express';
import Auction from '../models/Auction.js';
import ObjectOfInterest from '../models/ObjectOfInterest.js';
import User from '../models/User.js';

const router = express.Router();

// Add new auction
router.post('/add-auction', async (req, res) => {
  try {
    const auction = new Auction(req.body);
    await auction.save();
    res.status(201).json({ message: 'Auction added', auction });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add auction' });
  }
});

// Add object of interest
router.post('/add-object', async (req, res) => {
  try {
    const object = new ObjectOfInterest(req.body);
    await object.save();
    res.status(201).json({ message: 'Object added', object });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add object' });
  }
});

// Add expert
router.post('/add-expert', async (req, res) => {
  try {
    const { username, password, name, contactInfo, licenseNumber, expertiseAreas } = req.body;
    const expert = new User({
      username,
      password,
      role: 'expert',
      name,
      contactInfo,
      licenseNumber,
      expertiseAreas
    });
    await expert.save();
    res.status(201).json({ message: 'Expert added', expert });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add expert' });
  }
});

export default router;