import express from 'express';
import { getAIRecommendations } from '../controllers/aiController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/recommendations', protect, authorize('student'), getAIRecommendations);

export default router;
