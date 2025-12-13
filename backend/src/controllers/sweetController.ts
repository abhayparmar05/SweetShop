import { Response, NextFunction } from 'express';
import { Sweet } from '../models/Sweet';
import { AuthRequest } from '../middleware/auth';
import { AppError } from '../middleware/errorHandler';

// @desc    Create a new sweet
// @route   POST /api/sweets
// @access  Protected
export const createSweet = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, category, price, quantity } = req.body;

        const sweet = await Sweet.create({
            name,
            category,
            price,
            quantity,
        });

        res.status(201).json({
            success: true,
            message: 'Sweet created successfully',
            data: sweet,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get all sweets
// @route   GET /api/sweets
// @access  Protected
export const getAllSweets = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const skip = (page - 1) * limit;

        const sweets = await Sweet.find().skip(skip).limit(limit).sort({ createdAt: -1 });
        const total = await Sweet.countDocuments();

        res.status(200).json({
            success: true,
            data: sweets,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Search sweets by name, category, or price range
// @route   GET /api/sweets/search
// @access  Protected
export const searchSweets = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, category, minPrice, maxPrice } = req.query;

        // Build query
        const query: any = {};

        if (name) {
            query.name = { $regex: name, $options: 'i' }; // Case-insensitive search
        }

        if (category) {
            query.category = category;
        }

        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice as string);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice as string);
        }

        const sweets = await Sweet.find(query).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: sweets,
            count: sweets.length,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Update a sweet
// @route   PUT /api/sweets/:id
// @access  Protected
export const updateSweet = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { name, category, price, quantity } = req.body;

        const sweet = await Sweet.findById(id);
        if (!sweet) {
            throw new AppError('Sweet not found', 404);
        }

        // Update fields
        if (name !== undefined) sweet.name = name;
        if (category !== undefined) sweet.category = category;
        if (price !== undefined) sweet.price = price;
        if (quantity !== undefined) sweet.quantity = quantity;

        await sweet.save();

        res.status(200).json({
            success: true,
            message: 'Sweet updated successfully',
            data: sweet,
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Delete a sweet (Admin only)
// @route   DELETE /api/sweets/:id
// @access  Protected (Admin)
export const deleteSweet = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;

        const sweet = await Sweet.findById(id);
        if (!sweet) {
            throw new AppError('Sweet not found', 404);
        }

        await Sweet.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Sweet deleted successfully',
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Purchase a sweet (decrease quantity)
// @route   POST /api/sweets/:id/purchase
// @access  Protected
export const purchaseSweet = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            throw new AppError('Quantity must be a positive number', 400);
        }

        const sweet = await Sweet.findById(id);
        if (!sweet) {
            throw new AppError('Sweet not found', 404);
        }

        if (sweet.quantity < quantity) {
            throw new AppError(
                `Insufficient stock. Only ${sweet.quantity} items available`,
                400
            );
        }

        sweet.quantity -= quantity;
        await sweet.save();

        res.status(200).json({
            success: true,
            message: 'Purchase successful',
            data: {
                sweet,
                purchased: quantity,
                remaining: sweet.quantity,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Restock a sweet (increase quantity) - Admin only
// @route   POST /api/sweets/:id/restock
// @access  Protected (Admin)
export const restockSweet = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { id } = req.params;
        const { quantity } = req.body;

        if (!quantity || quantity <= 0) {
            throw new AppError('Quantity must be a positive number', 400);
        }

        const sweet = await Sweet.findById(id);
        if (!sweet) {
            throw new AppError('Sweet not found', 404);
        }

        sweet.quantity += quantity;
        await sweet.save();

        res.status(200).json({
            success: true,
            message: 'Restock successful',
            data: {
                sweet,
                restocked: quantity,
                newQuantity: sweet.quantity,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Get sweet statistics
// @route   GET /api/sweets/stats
// @access  Protected
export const getSweetStats = async (
    _req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const total = await Sweet.countDocuments();
        const inStock = await Sweet.countDocuments({ quantity: { $gt: 0 } });
        const outOfStock = await Sweet.countDocuments({ quantity: 0 });

        res.status(200).json({
            success: true,
            data: {
                total,
                inStock,
                outOfStock,
            },
        });
    } catch (error) {
        next(error);
    }
};

