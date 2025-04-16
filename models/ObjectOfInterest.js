import mongoose from 'mongoose';

const objectSchema = new mongoose.Schema({
  title: String,
  type: String, // e.g. painting, ceramic, etc.
  description: String,
  ownedByInstitution: Boolean
});

const ObjectOfInterest = mongoose.model('ObjectOfInterest', objectSchema);
export default ObjectOfInterest;