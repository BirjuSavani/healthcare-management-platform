"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../../components/User/Profile/userController"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const asyncHandler_1 = require("../../utils/helper/asyncHandler");
const reviewRoutes_1 = __importDefault(require("./reviewRoutes"));
const router = (0, express_1.Router)();
const ROUTES = {
    REVIEW: '/review'
};
router.use(ROUTES.REVIEW, reviewRoutes_1.default);
// Apply authMiddleware to all routes
router.use(authMiddleware_1.default);
/**
 * Get user profile.
 * @route GET /api/user/profile
 */
router.get('/profile', (0, asyncHandler_1.asyncHandler)(userController_1.default.getUserProfile));
/**
 * Update user profile.
 * @route PUT /api/user/profile
 */
router.put('/profile/:id', (0, asyncHandler_1.asyncHandler)(userController_1.default.updateUserProfile));
exports.default = router;
//# sourceMappingURL=userRoutes.js.map