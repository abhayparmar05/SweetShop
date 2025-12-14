import { Request, Response, NextFunction } from 'express';
import authService from '../services/authService';
import { AppError } from '../middleware/errorHandler';
import { AuthRequest } from '../middleware/auth';

/**
 * Cookie configuration for access tokens
 * Access tokens are short-lived (15 minutes)
 */const ACCESS_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,          // ✅ MUST be false on HTTP
    sameSite: 'lax' as const, // ✅ CRITICAL
    path: '/',              // ✅ IMPORTANT
    maxAge: 15 * 60 * 1000,
};


/**
 * Cookie configuration for refresh tokens
 * Refresh tokens are long-lived (7 days)
 */const REFRESH_TOKEN_COOKIE_OPTIONS = {
    httpOnly: true,
    secure: false,          // ✅ MUST be false on HTTP
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 7 * 24 * 60 * 60 * 1000,
};


// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password, firstName, lastName, role } = req.body;

        const result = await authService.registerUser({
            email,
            password,
            firstName,
            lastName,
            role,
        });

        // Set tokens in cookies
        res.cookie('accessToken', result.accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
        res.cookie('refreshToken', result.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: {
                user: result.user,
                token: result.accessToken,
                refreshToken: result.refreshToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;

        const result = await authService.loginUser({ email, password });

        // Set tokens in cookies
        res.cookie('accessToken', result.accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);
        res.cookie('refreshToken', result.refreshToken, REFRESH_TOKEN_COOKIE_OPTIONS);

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: result.user,
                token: result.accessToken,
                refreshToken: result.refreshToken,
            },
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public (requires refresh token in cookie)
export const refresh = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            throw new AppError('Refresh token not found', 401);
        }

        const result = await authService.refreshAccessToken(refreshToken);

        // Set new access token in cookie
        res.cookie('accessToken', result.accessToken, ACCESS_TOKEN_COOKIE_OPTIONS);

        res.status(200).json({
            success: true,
            message: 'Access token refreshed successfully',
            data: {
                token: result.accessToken,
            }
        });
    } catch (error) {
        next(error);
    }
};

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Protected
export const logout = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        if (req.user) {
            await authService.logoutUser(req.user._id.toString());
        }

        // Clear cookies
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');

        res.status(200).json({
            success: true,
            message: 'Logout successful',
        });
    } catch (error) {
        next(error);
    }
};
