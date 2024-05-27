import express from 'express';
import availabilityController from '../controllers/availabilityController.js';

const router = express.Router();

// Endpoint to set staff availability
router.post('/availability/:userId', availabilityController.insertAvailability);
router.put('/availability/:availabilityId/:userId', availabilityController.updateAvailability);
router.delete('/availability/:availabilityId/:userId', availabilityController.cancelAvailability);




export default router;
