import express from 'express';
import { getCourses, enrollInCourse } from '../controllers/courseController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCourses);
router.post('/:id/enroll', protect, authorize('student'), enrollInCourse);

export default router;
