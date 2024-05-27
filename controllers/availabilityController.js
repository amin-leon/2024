// controllers/availabilityController.js
import Availability from '../models/Availability.js';
import Appointment from '../models/Appointment.js';


const insertAvailability = async (req, res) => {
    const { userId } = req.params;
    const { startTime, endTime, date } = req.body;
  
    try {
      // Create and save the availability with the specified user
      const availability = new Availability({
        startTime,
        endTime,
        date,
        user: userId // Set the user using the userId from params
      });
  
      await availability.save();
  
      res.json({ message: 'Availability slot created successfully.', availability });
    } catch (error) {
      console.error('Error creating availability:', error);
      res.status(500).json({ error: 'Could not create availability slot.' });
    }
  };

//    update avaliability time slot
const updateAvailability = async (req, res) => {
    const { availabilityId, userId } = req.params;
    const { startTime, endTime, date } = req.body;
  
    try {
      const availability = await Availability.findByIdAndUpdate(
        availabilityId,
        { userId, startTime, endTime, date },
        { new: true } // Return the updated availability
      );
  
      res.json({ message: 'Availability updated successfully.', availability });
    } catch (error) {
      console.error('Error updating availability:', error);
      res.status(500).json({ error: 'Could not update availability.' });
    }
  };

  // Controller to delete an availability
const cancelAvailability = async (req, res) => {
    const { availabilityId, userId } = req.params;
  
    try {
      // Check if the availability exists
      const availability = await Availability.findOneAndDelete({
        _id: availabilityId,
        user: userId
      });
  
      if (!availability) {
        return res.status(404).json({ error: 'Availability not found.' });
      }
  
      res.json({ message: 'Availability deleted successfully.', availability });
    } catch (error) {
      console.error('Error deleting availability:', error);
      res.status(500).json({ error: 'An error occurred while deleting the availability.' });
    }
  };

  // Controller to get availability by userId
const getAvailabilityByUserId = async (req, res) => {
    const { userId } = req.params;
  
    try {
      // Find all availability for the given userId
      const availabilities = await Availability.find({ user: userId });
  
      res.json({ availabilities });
    } catch (error) {
      console.error('Error getting availability:', error);
      res.status(500).json({ error: 'An error occurred while getting availability.' });
    }
  };

// All time slot in system
  
  export default {
    insertAvailability,
    updateAvailability,
    cancelAvailability,
    getAvailabilityByUserId,
  };
  
