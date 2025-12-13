import { Request, Response, NextFunction } from 'express';

/**
 * Custom application error class
 * Used for operational errors with specific status codes
 */
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Global error handler middleware
 * Handles all errors thrown in the application
 * Provides consistent error responses with detailed information for debugging
 * 
 * @param err - Error object (can be AppError or generic Error)
 * @param _req - Express request object (unused)
 * @param res - Express response object
 * @param _next - Express next function (unused)
 */
export const errorHandler = (
    err: any,
    _req: Request,
    res: Response,
    _next: NextFunction
): void => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        const errors = Object.values(err.errors).map((e: any) => e.message);
        message = errors.join(', ');
    }

    // Mongoose duplicate key error
    if (err.code === 11000) {
        statusCode = 400;
        const field = Object.keys(err.keyPattern)[0];
        message = `${field} already exists`;
    }

    // Mongoose cast error (invalid ObjectId, etc.)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Invalid ${err.path}: ${err.value}`;
    }

    // Log error for debugging
    console.error('Error:', err);

    // Send consistent error response
    res.status(statusCode).json({
        success: false,
        message,
        stack: err.stack, // Always include stack trace for debugging
    });
}

/**
 * 404 Not Found handler
 * Handles requests to non-existent routes
 */
export const notFound = (req: Request, res: Response, _next: NextFunction): void => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`,
    });
};
