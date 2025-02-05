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
const ejs = __importStar(require("ejs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = require("path");
const message_1 = require("../constant/message");
const logger_1 = require("../utils/logger");
class Email {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: process.env.EMAIL_HOST,
            port: Number(process.env.EMAIL_PORT),
            service: process.env.EMAIL_SERVICE,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });
    }
    sendEmailWithTemplate(emailData, templatePath, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const ejsPath = (0, path_1.join)(__dirname, `../notification/templates/${templatePath}`);
            try {
                // Render EJS template
                const template = yield ejs.renderFile(ejsPath, Object.assign(Object.assign({}, emailData), options));
                logger_1.logger.info(__filename, '', '', message_1.SUCCESS_MESSAGE.SEND_EMAIL_WITH_TEMPLATE_SUCCESS, {
                    email: emailData.email,
                    subject: emailData.subject,
                    templatePath
                });
                // Send email with SMTP
                // eslint-disable-next-line @typescript-eslint/return-await
                return this.sendEmail(Object.assign(Object.assign(Object.assign({}, emailData), { template }), options));
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.SEND_EMAIL_WITH_TEMPLATE_FAILURE, {
                    templatePath,
                    email: emailData.email,
                    error: error.message
                });
                throw new Error(`${message_1.ERROR_MESSAGE.SEND_EMAIL_WITH_TEMPLATE_FAILURE}: ${error.message}`);
            }
        });
    }
    sendEmail(sendEmailData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mailOptions = {
                    from: process.env.EMAIL_FROM,
                    to: sendEmailData.email,
                    subject: sendEmailData.subject,
                    html: sendEmailData.template,
                    attachments: sendEmailData.attachments || []
                };
                const info = yield this.transporter.sendMail(mailOptions);
                logger_1.logger.info(__filename, '', '', message_1.SUCCESS_MESSAGE.SEND_EMAIL_SUCCESS, {
                    email: sendEmailData.email,
                    subject: sendEmailData.subject
                });
                return info;
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.SEND_EMAIL_FAILURE, {
                    email: sendEmailData.email,
                    error: error.message
                });
                throw new Error(`${message_1.ERROR_MESSAGE.SEND_EMAIL_FAILURE}: ${error}`);
            }
        });
    }
}
exports.default = new Email();
//# sourceMappingURL=mail.js.map