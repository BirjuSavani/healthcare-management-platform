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
const http_status_1 = __importDefault(require("http-status"));
const message_1 = require("../../constant/message");
const helper_1 = require("../../utils/helper");
const logger_1 = require("../../utils/logger");
const adminService_1 = __importDefault(require("../Admin/User/adminService"));
const doctorService_1 = __importDefault(require("./doctorService"));
class DoctorController {
    /**
     * Get all doctors
     * @param req
     * @param res
     * @returns UserListResponse
     */
    getAllDoctors(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all doctors
                const doctors = yield doctorService_1.default.getAllDoctors(req);
                if (!doctors) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.NO_DOCTORS_FOUND, '');
                    return helper_1.ResponseHandler.error(res, http_status_1.default.OK, false, message_1.ERROR_MESSAGE.NO_DOCTORS_FOUND, null);
                }
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.GET_ALL_DOCTORS, '');
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.GET_ALL_DOCTORS, doctors);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.GET_ALL_DOCTORS, error);
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
    /**
     * Get By Id doctor
     * @param req
     * @param res
     * @returns UserResponse
     */
    getDoctorById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const doctorId = req.params.id;
            try {
                // Fetch the doctor by ID
                const doctor = yield doctorService_1.default.getDoctorById(doctorId);
                if (!doctor) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND, { doctorId });
                    return helper_1.ResponseHandler.error(res, http_status_1.default.BAD_REQUEST, false, message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND, message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND);
                }
                else {
                    logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.GET_DOCTOR_BY_ID, { doctorId });
                    return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.GET_DOCTOR_BY_ID, doctor);
                }
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.GET_DOCTOR_BY_ID, { doctorId, error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.BAD_REQUEST, false, message_1.ERROR_MESSAGE.GET_DOCTOR_BY_ID, error);
            }
        });
    }
    /**
     * Update doctor
     * @param req
     * @param res
     * @returns UpdateDoctorResponse
     */
    updateDoctorProfile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const doctorId = req.params.id;
            try {
                const payload = req.body;
                // Fetch the doctor by ID
                const doctor = yield adminService_1.default.getUserById(doctorId);
                if (!doctor) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND, { doctorId });
                    return helper_1.ResponseHandler.error(res, http_status_1.default.BAD_REQUEST, false, message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND, message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND);
                }
                // Update the doctor
                const updatedDoctor = yield doctorService_1.default.updateDoctor(doctorId, payload, userId);
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.UPDATE_DOCTOR, { doctorId });
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.UPDATE_DOCTOR, updatedDoctor);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.UPDATE_DOCTOR, { doctorId, error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.BAD_REQUEST, false, message_1.ERROR_MESSAGE.UPDATE_DOCTOR, error);
            }
        });
    }
    /**
     * Delete doctor
     * @param req
     * @param res
     */
    deleteDoctor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.id;
            try {
                // Delete the doctor by ID
                const deletedDoctor = yield adminService_1.default.deleteUser(userId);
                if (!deletedDoctor) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND, { userId });
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND, null);
                }
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.DELETE_DOCTOR, { userId });
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.DELETE_DOCTOR, null);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.DELETE_DOCTOR, { userId, error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
}
exports.default = new DoctorController();
//# sourceMappingURL=doctorController.js.map