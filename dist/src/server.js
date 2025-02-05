"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const net_1 = __importDefault(require("net"));
const app_1 = __importDefault(require("./app"));
const config_1 = __importStar(require("./database/config/config"));
const logger_1 = require("./utils/logger");
dotenv_1.default.config({ path: `${__dirname}/../.env` });
const DEFAULT_PORT = Number(process.env.PORT) || 2000;
/**
 * Function to find an available port starting from the specified port
 * @param startPort - Starting port number
 */
const findAvailablePort = (startPort) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve) => {
        const server = net_1.default.createServer();
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
        server.once('error', (err) => {
            if (err.code === 'EADDRINUSE') {
                resolve(findAvailablePort(startPort + 1)); // Check the next port
            }
            else {
                resolve(0); // Unable to determine an available port
            }
        });
        // Start listening on the specified port
        server.listen(startPort);
    });
});
/**
 * Gracefully shuts down the server and database connection
 * @param server - HTTP server instance
 */
const shutdown = (server) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.logger.info(__filename, '', '', 'Initiating shutdown...', '');
    let dbClosed = false;
    let serverClosed = false;
    // Attempt to close the database connection
    try {
        yield config_1.default.close();
        dbClosed = true;
        logger_1.logger.info(__filename, '', '', 'Database connection closed successfully', '');
    }
    catch (dbError) {
        logger_1.logger.error(__filename, '', '', `Error while closing database connection: ${dbError}`, '');
    }
    // Attempt to close the server
    try {
        yield new Promise((resolve, reject) => {
            server.close((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(true);
                }
            });
        });
        serverClosed = true;
        logger_1.logger.info(__filename, '', '', 'Server closed successfully', '');
    }
    catch (serverError) {
        logger_1.logger.error(__filename, '', '', `Error while closing the server: ${serverError}`, '');
    }
    // Exit with appropriate status
    if (dbClosed && serverClosed) {
        logger_1.logger.info(__filename, '', '', 'Application shut down gracefully.', '');
        process.exit(0); // Exit gracefully
    }
    else {
        logger_1.logger.error(__filename, '', '', 'Application shut down with errors.', '');
        process.exit(1); // Exit with failure
    }
});
/**
 * Starts the server and connects to the database
 */
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Find an available port
        const PORT = yield findAvailablePort(DEFAULT_PORT);
        if (!PORT) {
            logger_1.logger.error(__filename, '', '', 'Failed to find an available port', '');
            process.exit(1); // Exit with failure
        }
        // Connect to the database
        // await sequelize.authenticate()
        yield (0, config_1.initializeConnection)();
        // logger.info(__filename, '', '', 'Connected to Postgres successfully', '');
        // Start the HTTP server
        const server = app_1.default.listen(PORT, () => {
            logger_1.logger.info(__filename, '', '', `🚀 Application is running on: http://localhost:${PORT}/api`, '');
        });
        // Listen for shutdown signals
        process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () { return shutdown(server); })); // Handle Ctrl+C
        process.on('SIGTERM', () => __awaiter(void 0, void 0, void 0, function* () { return shutdown(server); })); // Handle Docker stop or similar signals
    }
    catch (error) {
        logger_1.logger.error(__filename, '', '', `Failed to start the server: ${error}`, { error });
        process.exit(1); // Exit with failure
    }
});
// Start the server
startServer();
//# sourceMappingURL=server.js.map