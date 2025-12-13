import dotenv from 'dotenv';

dotenv.config();

/**
 * Application configuration interface
 * All configuration values are loaded from environment variables
 */
interface Config {
    /** Server port number */
    port: number;
    /** MongoDB connection URI */
    mongodbUri: string;
    /** Access token secret key */
    accessTokenSecret: string;
    /** Refresh token secret key */
    refreshTokenSecret: string;
    /** Access token expiration time (e.g., '15m', '1h') */
    accessTokenExpiry: string;
    /** Refresh token expiration time (e.g., '7d', '30d') */
    refreshTokenExpiry: string;
    /** Allowed CORS origin */
    corsOrigin: string;
}

/**
 * Validates that required environment variables are set
 * Throws error if any required variable is missing
 */
const validateRequiredEnvVars = (): void => {
    const requiredVars = [
        'MONGODB_URI',
        'ACCESS_TOKEN_SECRET',
        'REFRESH_TOKEN_SECRET'
    ];

    const missing = requiredVars.filter(varName => !process.env[varName]);

    if (missing.length > 0) {
        throw new Error(
            `Missing required environment variables: ${missing.join(', ')}\n` +
            'Please check your .env file and ensure all required variables are set.'
        );
    }
};

// Validate environment variables on startup (fail-fast principle)
validateRequiredEnvVars();

/**
 * Application configuration object
 * Loaded from environment variables with sensible defaults for optional values
 */
const config: Config = {
    port: parseInt(process.env.PORT || '5000', 10),
    mongodbUri: process.env.MONGODB_URI!,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET!,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET!,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY || '15m',
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
};

export default config;
