"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const specializationController_1 = __importDefault(require("../../components/Admin/Specialization/specializationController"));
const specializationValidation_1 = require("../../components/Admin/Specialization/specializationValidation");
const authInterface_1 = require("../../components/Auth/interface/authInterface");
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const joiMiddleware_1 = __importDefault(require("../../middleware/joiMiddleware"));
const roleBaseAccessMiddleware_1 = __importDefault(require("../../middleware/roleBaseAccessMiddleware"));
const asyncHandler_1 = require("../../utils/helper/asyncHandler");
const router = (0, express_1.Router)();
// Apply authMiddleware to all routes
router.use(authMiddleware_1.default);
/**
 * Create a new specialization.
 * Allowed roles: Super Admin, Admin
 * @route POST /api/admin/specialization
 */
router.post('/', (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN]), (0, joiMiddleware_1.default)(specializationValidation_1.specializationSchema), (0, asyncHandler_1.asyncHandler)(specializationController_1.default.createSpecialization));
/**
 * Get all specializations.
 * Allowed roles: Super Admin, Admin
 * @route GET /api/admin/specializations
 */
router.get('/', (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN]), (0, asyncHandler_1.asyncHandler)(specializationController_1.default.getAllSpecializations));
/**
 * Update a specialization.
 * Allowed roles: Super Admin, Admin
 * @route PUT /api/admin/specialization/:id
 */
router.put('/:id', (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN]), (0, joiMiddleware_1.default)(specializationValidation_1.specializationSchema), (0, asyncHandler_1.asyncHandler)(specializationController_1.default.updateSpecialization));
/**
 * Get a specialization by ID.
 * Allowed roles: Super Admin, Admin
 * @route GET /api/admin/specialization/:id
 */
router.get('/:id', (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN]), (0, asyncHandler_1.asyncHandler)(specializationController_1.default.getSpecializationById));
/**
 * Delete a specialization.
 * Allowed roles: Super Admin, Admin
 * @route DELETE /api/admin/specialization/:id
 */
router.delete('/:id', (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN]), (0, asyncHandler_1.asyncHandler)(specializationController_1.default.deleteSpecialization));
exports.default = router;
//# sourceMappingURL=specializationRoutes.js.map