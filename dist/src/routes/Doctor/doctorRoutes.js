"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authValidation_1 = require("../../components/Auth/authValidation");
const authInterface_1 = require("../../components/Auth/interface/authInterface");
const doctorController_1 = __importDefault(require("../../components/Doctor/doctorController"));
const authMiddleware_1 = __importDefault(require("../../middleware/authMiddleware"));
const joiMiddleware_1 = __importDefault(require("../../middleware/joiMiddleware"));
const roleBaseAccessMiddleware_1 = __importDefault(require("../../middleware/roleBaseAccessMiddleware"));
const asyncHandler_1 = require("../../utils/helper/asyncHandler");
const router = (0, express_1.Router)();
/**
 * Get all doctors
 * @route GET /api/doctor
 */
router.get('/', (0, asyncHandler_1.asyncHandler)(doctorController_1.default.getAllDoctors));
/**
 * Get By Id doctor.
 * @route GET /api/doctor/:id
 */
router.get('/:id', (0, asyncHandler_1.asyncHandler)(doctorController_1.default.getDoctorById));
/**
 * Update doctor
 * @route PUT /api/doctor/:id
 */
router.put('/:id', authMiddleware_1.default, (0, joiMiddleware_1.default)(authValidation_1.updateDoctorSchema), (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN, authInterface_1.Role.DOCTOR]), (0, asyncHandler_1.asyncHandler)(doctorController_1.default.updateDoctorProfile));
/**
 * Delete doctor
 * @route DELETE /api/doctor/:id
 */
router.delete('/:id', authMiddleware_1.default, (0, roleBaseAccessMiddleware_1.default)([authInterface_1.Role.SUPER_ADMIN, authInterface_1.Role.ADMIN, authInterface_1.Role.DOCTOR]), (0, asyncHandler_1.asyncHandler)(doctorController_1.default.deleteDoctor));
exports.default = router;
//# sourceMappingURL=doctorRoutes.js.map