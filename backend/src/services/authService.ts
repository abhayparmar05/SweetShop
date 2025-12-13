import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User, IUser } from '../models/User';
import config from '../config/env';
import { AppError } from '../middleware/errorHandler';

export interface RegisterData {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'user' | 'admin';
}

export interface LoginData {
    email: string;
    password: string;
}

export interface AuthResult {
    user: {
        id: string;
        email: string;
        firstName: string;
        lastName: string;
        role: string;
    };
    accessToken: string;
    refreshToken: string;
}

export interface RefreshTokenPayload {
    userId: string;
}

class AuthService {
    /**
     * Register a new user
     */
    async registerUser(data: RegisterData): Promise<AuthResult> {
        const { email, password, firstName, lastName, role } = data;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new AppError('User already exists with this email', 400);
        }

        // Create user
        const user = await User.create({
            email,
            password,
            firstName,
            lastName,
            role: role || 'user',
        });

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Hash and save refresh token
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        user.refreshToken = hashedRefreshToken;
        await user.save();

        return {
            user: {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            accessToken,
            refreshToken,
        };
    }

    /**
     * Login user
     */
    async loginUser(data: LoginData): Promise<AuthResult> {
        const { email, password } = data;

        // Find user and include password field
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            throw new AppError('Invalid email or password', 401);
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new AppError('Invalid email or password', 401);
        }

        // Generate tokens
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        // Hash and save refresh token
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        user.refreshToken = hashedRefreshToken;
        await user.save();

        return {
            user: {
                id: user._id.toString(),
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
            accessToken,
            refreshToken,
        };
    }

    /**
     * Refresh access token using refresh token
     */
    async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
        try {
            // Verify refresh token
            const decoded = jwt.verify(
                refreshToken,
                config.refreshTokenSecret
            ) as RefreshTokenPayload;

            // Find user with refresh token
            const user = await User.findById(decoded.userId).select('+refreshToken');
            if (!user || !user.refreshToken) {
                throw new AppError('Invalid refresh token', 401);
            }

            // Compare refresh token with stored hashed token
            const isValidToken = await bcrypt.compare(refreshToken, user.refreshToken);
            if (!isValidToken) {
                throw new AppError('Invalid refresh token', 401);
            }

            // Generate new access token
            const accessToken = user.generateAccessToken();

            return { accessToken };
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError('Invalid refresh token', 401);
            }
            throw error;
        }
    }

    /**
     * Logout user by clearing refresh token
     */
    async logoutUser(userId: string): Promise<void> {
        const user = await User.findById(userId);
        if (user) {
            user.refreshToken = undefined;
            await user.save();
        }
    }

    /**
     * Verify access token and return user data
     */
    async verifyAccessToken(token: string): Promise<IUser> {
        try {
            const decoded = jwt.verify(token, config.accessTokenSecret) as any;
            const user = await User.findById(decoded.userId);

            if (!user) {
                throw new AppError('User not found', 404);
            }

            return user;
        } catch (error) {
            if (error instanceof jwt.JsonWebTokenError) {
                throw new AppError('Invalid access token', 401);
            }
            throw error;
        }
    }
}

export default new AuthService();
