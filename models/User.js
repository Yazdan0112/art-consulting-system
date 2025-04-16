import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // email
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'client', 'expert'],
    required: true
  },

  // Common fields
  name: String,
  contactInfo: String,

  // Client-specific
  affiliation: String,
  intent: String,
  approved: {
    type: Boolean,
    default: false // clients start unapproved
  },

  // Expert-specific
  licenseNumber: String,
  expertiseAreas: [String]
});

const User = mongoose.model('User', userSchema);

export default User;