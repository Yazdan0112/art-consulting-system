import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  expertId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String, 
    required: true
  },
  timeSlot: {
    type: String, 
    required: true
  }
});

const Availability = mongoose.model('Availability', availabilitySchema);

export default Availability;