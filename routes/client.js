import express from 'express';
import Availability from '../models/Availability.js';
import ServiceRequest from '../models/ServiceRequest.js';
import User from '../models/User.js';
import Auction from '../models/Auction.js';

const router = express.Router();

/**
 * 🔹 POST /client/request-service
 * Submit a new service request
 */
router.post('/request-service', async (req, res) => {
  try {
    const { clientId, expertId, auctionId, timeSlot, type } = req.body;
    console.log('📥 Received service request payload:', req.body);

    // Validate client
    // const client = await User.findById(clientId);
    // if (!client || client.role !== 'client') {
    //   return res.status(403).json({ message: 'Client not found or not a client' });
    // }

    // Check availability
    const isAvailable = await Availability.findOne({ expertId, timeSlot });
    if (!isAvailable) {
      return res.status(400).json({ message: 'Expert not available at this time' });
    }

    // Check for time conflict
    const conflict = await ServiceRequest.findOne({ expertId, timeSlot });
    if (conflict) {
      return res.status(400).json({ message: 'Expert already booked at this time' });
    }

    // Create and save request
    const request = new ServiceRequest({
      clientId,
      expertId,
      auctionId,
      timeSlot,
      type
    });

    await request.save();
    console.log('✅ Service request saved:', request);

    res.status(201).json({ message: 'Service requested successfully', request });
  } catch (err) {
    console.error('❌ Error in /request-service:', err);
    res.status(500).json({ message: 'Request failed', error: err.message });
  }
});

/**
 * 🔹 GET /client/experts
 * Return all experts for dropdown
 */
router.get('/experts', async (req, res) => {
  try {
    const experts = await User.find({ role: 'expert' }, '_id name username');
    res.status(200).json(experts);
  } catch (err) {
    console.error('❌ Error fetching experts:', err);
    res.status(500).json({ message: 'Error fetching experts' });
  }
});


router.get('/availability/:expertId', async (req, res) => {
  try {
    const { expertId } = req.params;
    const slots = await Availability.find({ expertId }, 'date timeSlot');
    res.status(200).json(slots);
  } catch (err) {
    console.error('❌ Error fetching availability:', err);
    res.status(500).json({ message: 'Error fetching availability' });
  }
});


router.get('/auctions', async (req, res) => {
  try {
    const auctions = await Auction.find({}, '_id name date');
    res.status(200).json(auctions);
  } catch (err) {
    console.error('❌ Error fetching auctions:', err);
    res.status(500).json({ message: 'Error fetching auctions' });
  }
});

export default router;