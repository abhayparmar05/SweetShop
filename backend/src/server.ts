import app from './app';
import config from './config/env';
import { connectDatabase } from './config/database';

/**
 * Starts the Express server
 * Connects to the database and then starts listening on the configured port
 */
const startServer = async () => {
    try {
        // Connect to database
        await connectDatabase();

        // Start server
        app.listen(config.port, () => {
            console.log(`Server running on port ${config.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
