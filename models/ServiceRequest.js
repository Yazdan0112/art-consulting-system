import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  expertId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  auctionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Auction' },
  type: String, // e.g. "consultation", "accompaniment"
  timeSlot: String,
  status: { type: String, default: 'pending' }
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);
export default ServiceRequest;