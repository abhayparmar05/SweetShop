import { Sweet, ISweet } from '../models/Sweet';
import { AppError } from '../middleware/errorHandler';

export interface CreateSweetData {
    name: string;
    category: string;
    price: number;
    quantity: number;
}

export interface UpdateSweetData {
    name?: string;
    category?: string;
    price?: number;
    quantity?: number;
}

export interface SearchQuery {
    name?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
}

class SweetService {
    /**
     * Get all sweets with pagination
     */
    async getAllSweets(page: number = 1, limit: number = 10): Promise<{
        sweets: ISweet[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            pages: number;
        };
    }> {
        const skip = (page - 1) * limit;

        const sweets = await Sweet.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const total = await Sweet.countDocuments();

        return {
            sweets,
            pagination: {
                page,
                limit,
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Search sweets by name, category, or price range
     */
    async searchSweets(searchQuery: SearchQuery): Promise<ISweet[]> {
        const { name, category, minPrice, maxPrice } = searchQuery;

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
            if (minPrice) query.price.$gte = minPrice;
            if (maxPrice) query.price.$lte = maxPrice;
        }

        const sweets = await Sweet.find(query).sort({ createdAt: -1 });
        return sweets;
    }

    /**
     * Get sweet by ID
     */
    async getSweetById(sweetId: string): Promise<ISweet> {
        const sweet = await Sweet.findById(sweetId);

        if (!sweet) {
            throw new AppError('Sweet not found', 404);
        }

        return sweet;
    }

    /**
     * Create a new sweet
     */
    async createSweet(data: CreateSweetData): Promise<ISweet> {
        const sweet = await Sweet.create(data);
        return sweet;
    }

    /**
     * Update a sweet
     */
    async updateSweet(sweetId: string, data: UpdateSweetData): Promise<ISweet> {
        const sweet = await Sweet.findByIdAndUpdate(
            sweetId,
            data,
            { new: true, runValidators: true }
        );

        if (!sweet) {
            throw new AppError('Sweet not found', 404);
        }

        return sweet;
    }

    /**
     * Delete a sweet
     */
    async deleteSweet(sweetId: string): Promise<void> {
        const sweet = await Sweet.findByIdAndDelete(sweetId);

        if (!sweet) {
            throw new AppError('Sweet not found', 404);
        }
    }

    /**
     * Purchase a sweet (decrease quantity)
     */
    async purchaseSweet(sweetId: string, quantity: number): Promise<{
        sweet: ISweet;
        purchased: number;
        remaining: number;
    }> {
        if (!quantity || quantity <= 0) {
            throw new AppError('Quantity must be a positive number', 400);
        }

        const sweet = await Sweet.findById(sweetId);
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

        return {
            sweet,
            purchased: quantity,
            remaining: sweet.quantity,
        };
    }

    /**
     * Restock a sweet (increase quantity)
     */
    async restockSweet(sweetId: string, quantity: number): Promise<{
        sweet: ISweet;
        restocked: number;
        newQuantity: number;
    }> {
        if (!quantity || quantity <= 0) {
            throw new AppError('Quantity must be a positive number', 400);
        }

        const sweet = await Sweet.findById(sweetId);
        if (!sweet) {
            throw new AppError('Sweet not found', 404);
        }

        sweet.quantity += quantity;
        await sweet.save();

        return {
            sweet,
            restocked: quantity,
            newQuantity: sweet.quantity,
        };
    }

    /**
     * Get sweet statistics
     */
    async getSweetStats(): Promise<{
        total: number;
        inStock: number;
        outOfStock: number;
    }> {
        const total = await Sweet.countDocuments();
        const inStock = await Sweet.countDocuments({ quantity: { $gt: 0 } });
        const outOfStock = await Sweet.countDocuments({ quantity: 0 });

        return { total, inStock, outOfStock };
    }
}

export default new SweetService();
