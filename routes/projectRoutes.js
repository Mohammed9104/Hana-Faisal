import express from 'express';
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject, 
  applyForProject, 
  submitProjectSolution,
  purchaseProject
} from '../controllers/projectController.js';
import { protect, authorize } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getProjects)
  .post(protect, authorize('company'), createProject);

router.route('/:id')
  .get(getProjectById)
  .put(protect, updateProject)
  .delete(protect, authorize('company'), deleteProject);

router.post('/:id/apply', protect, authorize('student'), applyForProject);
router.post('/:id/submit', protect, authorize('student'), submitProjectSolution);
router.post('/:id/purchase', protect, authorize('company'), purchaseProject);

export default router;
