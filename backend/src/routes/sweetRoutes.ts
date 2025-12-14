import { Router } from 'express';
import { body, param } from 'express-validator';
import {
    createSweet,
    getAllSweets,
    searchSweets,
    updateSweet,
    deleteSweet,
    purchaseSweet,
    restockSweet,
    getSweetStats,
} from '../controllers/sweetController';
import { authenticate } from '../middleware/auth';
import { requireAdmin } from '../middleware/adminAuth';
import { validate } from '../middleware/validator';

const router = Router();

// Validation rules
const createSweetValidation = [
    body('name')
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('price')
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('quantity')
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),
];

const updateSweetValidation = [
    param('id').isMongoId().withMessage('Invalid sweet ID'),
    body('name')
        .optional()
        .trim()
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('price')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Price must be a positive number'),
    body('quantity')
        .optional()
        .isInt({ min: 0 })
        .withMessage('Quantity must be a non-negative integer'),
];

const idValidation = [
    param('id').isMongoId().withMessage('Invalid sweet ID'),
];

const quantityValidation = [
    param('id').isMongoId().withMessage('Invalid sweet ID'),
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('Quantity must be a positive integer'),
];

// Public routes
router.get('/stats', getSweetStats);
router.get('/search', searchSweets);

// All routes below require authentication
router.use(authenticate);

// Protected Routes
router.get('/', getAllSweets);
router.post('/', validate(createSweetValidation), createSweet);
router.put('/:id', validate(updateSweetValidation), updateSweet);
router.delete('/:id', requireAdmin, validate(idValidation), deleteSweet);
router.post('/:id/purchase', validate(quantityValidation), purchaseSweet);
router.post('/:id/restock', requireAdmin, validate(quantityValidation), restockSweet);

export default router;
