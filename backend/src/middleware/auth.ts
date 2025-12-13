import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/env';
import { User, IUser } from '../models/User';

// Extend Express Request type to include user
export interface AuthRequest extends Request {
    user?: IUser;
}

export const authenticate = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Get token from cookie (preferred) or Authorization header (fallback for backward compatibility)
        let token = req.cookies?.accessToken;

        if (!token) {
            // Fallback to Authorization header
            const authHeader = req.headers.authorization;
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.substring(7); // Remove 'Bearer ' prefix
            }
        }

        if (!token) {
            res.status(401).json({
                success: false,
                message: 'No token provided. Please authenticate.',
            });
            return;
        }

        // Verify token using access token secret
        const decoded = jwt.verify(token, config.accessTokenSecret) as { userId: string };

        // Get user from database
        const user = await User.findById(decoded.userId).select('-password -refreshToken');

        if (!user) {
            res.status(401).json({
                success: false,
                message: 'Invalid token. User not found.',
            });
            return;
        }

        // Attach user to request
        req.user = user;
        next();
    } catch (error: any) {
        if (error.name === 'JsonWebTokenError') {
            res.status(401).json({
                success: false,
                message: 'Invalid token.',
            });
            return;
        }

        if (error.name === 'TokenExpiredError') {
            res.status(401).json({
                success: false,
                message: 'Token expired. Please login again or refresh your token.',
            });
            return;
        }

        res.status(500).json({
            success: false,
            message: 'Authentication error.',
        });
    }
};
