import express from 'express';
const router = express.Router();

// Define routes here
router.get('/', (req, res) => {
  res.send('Client route working');
});

export default router;