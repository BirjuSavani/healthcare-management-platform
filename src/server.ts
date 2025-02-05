import dotenv from 'dotenv';
import net from 'net';
import app from './app';
import sequelize, { initializeConnection } from './database/config/config';
import { logger } from './utils/logger';

dotenv.config({ path: `${__dirname}/../.env` });

const DEFAULT_PORT: number = Number(process.env.PORT) || 2000;

/**
 * Function to find an available port starting from the specified port
 * @param startPort - Starting port number
 */
const findAvailablePort = async (startPort: number): Promise<number> => {
  return new Promise((resolve) => {
    const server = net.createServer();

    /**
     * .once is used to listen for the 'listening' event
     * .once(event, callback) - The listening event is triggered when the server starts listening on the specified port
     * The listener will execute only once, event if the event is emitted multiple times.
     */
    server.once('listening', () => {
      server.close(() => {
        resolve(startPort); // Port is available
      });
    });

    /**
     * .once is used to listen for the 'error' event
     * .once(event, callback) - The error event is triggered when an error occurs while listening on the specified port
     */
    server.once('error', (err: any) => {
      if (err.code === 'EADDRINUSE') {
        resolve(findAvailablePort(startPort + 1)); // Check the next port
      } else {
        resolve(0); // Unable to determine an available port
      }
    });

    // Start listening on the specified port
    server.listen(startPort);
  });
};

/**
 * Gracefully shuts down the server and database connection
 * @param server - HTTP server instance
 */
const shutdown = async (server: ReturnType<typeof app.listen>): Promise<void> => {
  logger.info(__filename, '', '', 'Initiating shutdown...', '');

  let dbClosed = false;
  let serverClosed = false;

  // Attempt to close the database connection
  try {
    await sequelize.close();
    dbClosed = true;
    logger.info(__filename, '', '', 'Database connection closed successfully', '');
  } catch (dbError) {
    logger.error(__filename, '', '', `Error while closing database connection: ${dbError}`, '');
  }

  // Attempt to close the server
  try {
    await new Promise((resolve, reject) => {
      server.close((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
    serverClosed = true;
    logger.info(__filename, '', '', 'Server closed successfully', '');
  } catch (serverError) {
    logger.error(__filename, '', '', `Error while closing the server: ${serverError}`, '');
  }

  // Exit with appropriate status
  if (dbClosed && serverClosed) {
    logger.info(__filename, '', '', 'Application shut down gracefully.', '');
    process.exit(0); // Exit gracefully
  } else {
    logger.error(__filename, '', '', 'Application shut down with errors.', '');
    process.exit(1); // Exit with failure
  }
};

/**
 * Starts the server and connects to the database
 */
const startServer = async (): Promise<void> => {
  try {
    // Find an available port
    const PORT = await findAvailablePort(DEFAULT_PORT);
    if (!PORT) {
      logger.error(__filename, '', '', 'Failed to find an available port', '');
      process.exit(1); // Exit with failure
    }

    // Connect to the database
    // await sequelize.authenticate()
    await initializeConnection();
    // logger.info(__filename, '', '', 'Connected to Postgres successfully', '');

    // Start the HTTP server
    const server = app.listen(PORT, () => {
      logger.info(__filename, '', '', `🚀 Application is running on: http://localhost:${PORT}/api`, '');
    });

    // Listen for shutdown signals
    process.on('SIGINT', async () => shutdown(server)); // Handle Ctrl+C
    process.on('SIGTERM', async () => shutdown(server)); // Handle Docker stop or similar signals
  } catch (error) {
    logger.error(__filename, '', '', `Failed to start the server: ${error}`, { error });
    process.exit(1); // Exit with failure
  }
};

// Start the server
startServer();
