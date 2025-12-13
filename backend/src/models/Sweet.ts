import mongoose, { Document, Schema } from 'mongoose';

export interface ISweet extends Document {
    name: string;
    category: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

const sweetSchema = new Schema<ISweet>(
    {
        name: {
            type: String,
            required: [true, 'Sweet name is required'],
            trim: true,
            minlength: [2, 'Sweet name must be at least 2 characters'],
            maxlength: [100, 'Sweet name cannot exceed 100 characters'],
        },
        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
            enum: {
                values: ['chocolate', 'swiss-western', 'festival', 'premium-dry-fruit', 'regional-traditional'],
                message: '{VALUE} is not a valid category',
            },
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price must be a positive number'],
            validate: {
                validator: function (value: number) {
                    return value >= 0;
                },
                message: 'Price must be a positive number',
            },
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [0, 'Quantity cannot be negative'],
            default: 0,
            validate: {
                validator: Number.isInteger,
                message: 'Quantity must be an integer',
            },
        },
    },
    {
        timestamps: true,
    }
);

// Create indexes for search optimization
sweetSchema.index({ name: 'text', category: 'text' });
sweetSchema.index({ price: 1 });
sweetSchema.index({ category: 1 });
sweetSchema.index({ quantity: 1 }); // For stock queries


export const Sweet = mongoose.model<ISweet>('Sweet', sweetSchema);
