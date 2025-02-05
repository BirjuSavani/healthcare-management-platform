"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const adminUserRoutes_1 = __importDefault(require("./adminUserRoutes"));
const specializationRoutes_1 = __importDefault(require("./specializationRoutes"));
const router = (0, express_1.Router)();
const ROUTES = {
    SPECIALIZATION: '/specialization',
    USER: '/users'
};
/**
 * * Specialization routes
 */
router.use(ROUTES.SPECIALIZATION, specializationRoutes_1.default);
/**
 * * User routes
 */
router.use(ROUTES.USER, adminUserRoutes_1.default);
exports.default = router;
//# sourceMappingURL=adminRoutes.js.map