import express from 'express';
import { getInternships, createInternship } from '../controllers/internshipController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getInternships)
  .post(protect, authorize('company'), createInternship);

export default router;
