"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminRoutes_1 = __importDefault(require("./Admin/adminRoutes"));
const authRoutes_1 = __importDefault(require("./Admin/authRoutes"));
const userRoutes_1 = __importDefault(require("./User/userRoutes"));
const doctorRoutes_1 = __importDefault(require("./Doctor/doctorRoutes"));
exports.default = (app) => {
    const apiRouter = (0, express_1.Router)();
    /**
     * ! All routes must to prefix with /api
     */
    app.use('/api', apiRouter);
    apiRouter.use('/auth', authRoutes_1.default);
    apiRouter.use('/admin', adminRoutes_1.default);
    apiRouter.use('/doctor', doctorRoutes_1.default);
    apiRouter.use('/user', userRoutes_1.default);
};
//# sourceMappingURL=index.js.map