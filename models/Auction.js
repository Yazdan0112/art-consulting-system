import mongoose from 'mongoose';

const auctionSchema = new mongoose.Schema({
  name: String,
  location: String,
  date: String, // e.g. "2025-05-12"
  timeSlots: [String], // e.g. ["12PM", "1PM", "2PM"]
  auctionHouse: String,
  specialty: String
});

const Auction = mongoose.model('Auction', auctionSchema);
export default Auction;