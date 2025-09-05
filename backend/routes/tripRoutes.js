// routes/tripRoutes.js
import express from 'express';
import { createTrip, getUserTrips } from '../controllers/tripController.js';
import { protect } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.route('/').post(protect, createTrip).get(protect, getUserTrips);

// Make sure this line exists at the end
export default router;