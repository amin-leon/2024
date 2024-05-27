import mongoose from 'mongoose';

const availabilitySchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isBooked: { type: Boolean, default: false } // Added field to track if the slot is booked or not
});

const Availability = mongoose.model('Availability', availabilitySchema);

export default Availability;
