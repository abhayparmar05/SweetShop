import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config/env';

export interface IUser extends Document {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: 'user' | 'admin';
    refreshToken?: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candidatePassword: string): Promise<boolean>;
    generateAccessToken(): string;
    generateRefreshToken(): string;
}

const userSchema = new Schema<IUser>(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
        },
        firstName: {
            type: String,
            required: [true, 'First name is required'],
            trim: true,
            minlength: [2, 'First name must be at least 2 characters'],
            maxlength: [50, 'First name cannot exceed 50 characters'],
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required'],
            trim: true,
            minlength: [2, 'Last name must be at least 2 characters'],
            maxlength: [50, 'Last name cannot exceed 50 characters'],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Don't return password by default
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
        refreshToken: {
            type: String,
            select: false, // Don't return refresh token by default
        },
    },
    {
        timestamps: true,
    }
);

// Indexes for optimized queries
// Note: email index is created automatically by unique: true


// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

// Method to compare password
userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    try {
        return await bcrypt.compare(candidatePassword, this.password);
    } catch (error) {
        return false;
    }
};

// Method to generate access token
userSchema.methods.generateAccessToken = function (): string {
    const payload = {
        userId: this._id.toString(),
        email: this.email,
        role: this.role
    };
    return jwt.sign(
        payload,
        config.accessTokenSecret,
        { expiresIn: config.accessTokenExpiry } as jwt.SignOptions
    );
};

// Method to generate refresh token
userSchema.methods.generateRefreshToken = function (): string {
    const payload = { userId: this._id.toString() };
    return jwt.sign(
        payload,
        config.refreshTokenSecret,
        { expiresIn: config.refreshTokenExpiry } as jwt.SignOptions
    );
};

export const User = mongoose.model<IUser>('User', userSchema);
