import express from 'express';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';
import {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    getUserStats,
} from '../controllers/userController';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get user statistics (admin only)
router.get('/stats', requireAdmin, getUserStats);

// Get all users (admin only)
router.get('/', requireAdmin, getAllUsers);

// Get user by ID
router.get('/:id', getUserById);

// Update user (admin or self)
router.put('/:id', updateUser);

// Delete user (admin only)
router.delete('/:id', requireAdmin, deleteUser);

export default router;
