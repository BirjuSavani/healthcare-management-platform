"use strict";
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
exports.generateToken = exports.comparePassword = exports.convertPlainTextToHash = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const message_1 = require("../constant/message");
const logger_1 = require("./logger");
const convertPlainTextToHash = (text) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = yield bcryptjs_1.default.hashSync(text, 10);
        return hash;
    }
    catch (error) {
        logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.CONVERT_PLAIN_TEXT_TO_HASH, '');
        throw error;
    }
});
exports.convertPlainTextToHash = convertPlainTextToHash;
const comparePassword = (text, hash) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const isMatch = yield bcryptjs_1.default.compare(text, hash);
        return isMatch;
    }
    catch (error) {
        logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.COMPARE_PASSWORD, '');
        throw error;
    }
});
exports.comparePassword = comparePassword;
const generateToken = (userId, role) => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error(message_1.ERROR_MESSAGE.JWT_SECRET_NOT_SET);
        }
        // Ensure expiresIn is a valid string or number
        // const expiresIn = process.env.JWT_EXPIRES_IN || '1h'; // Default to '1h' if undefined or empty
        const token = (0, jsonwebtoken_1.sign)({ userId, role }, process.env.JWT_SECRET);
        return token;
    }
    catch (error) {
        logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.GENERATE_TOKEN, '');
        throw error;
    }
};
exports.generateToken = generateToken;
//# sourceMappingURL=commonUtils.js.map