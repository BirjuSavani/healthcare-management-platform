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
const message_1 = require("../../../constant/message");
const helper_1 = require("../../../utils/helper");
const logger_1 = require("../../../utils/logger");
const specializationService_1 = __importDefault(require("./specializationService"));
class SpecializationController {
    /**
     * Create a new specialization
     * @param req Request object
     * @param res Response object
     * @returns ISpecializationResponse
     */
    createSpecialization(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            try {
                const payload = req.body;
                // Check for existing specialization
                const existingSpecialization = yield specializationService_1.default.getSpecializationByName(payload.specialization_name);
                // Throw error if specialization already exists
                if (existingSpecialization) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.SPECIALIZATION_ALREADY_EXISTS, payload.specialization_name);
                    return helper_1.ResponseHandler.error(res, http_status_1.default.CONFLICT, false, message_1.ERROR_MESSAGE.SPECIALIZATION_ALREADY_EXISTS, null);
                }
                // Create specialization
                const specialization = yield specializationService_1.default.createSpecialization(payload, userId);
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.CREATE_SPECIALIZATION, specialization.specialization_id);
                return helper_1.ResponseHandler.success(res, http_status_1.default.CREATED, true, message_1.SUCCESS_MESSAGE.CREATE_SPECIALIZATION, specialization);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.CREATE_SPECIALIZATION, error);
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR);
            }
        });
    }
    /**
     * Get all specializations
     * @param req Request object
     * @param res Response object
     * @returns ISpecializationResponse
     */
    getAllSpecializations(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch all specializations
                const specializations = yield specializationService_1.default.getAllSpecializations(req);
                if (!specializations) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.NO_SPECIALIZATIONS_FOUND, '');
                    return helper_1.ResponseHandler.error(res, http_status_1.default.OK, false, message_1.ERROR_MESSAGE.NO_SPECIALIZATIONS_FOUND, null);
                }
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.GET_ALL_SPECIALIZATIONS, '');
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.GET_ALL_SPECIALIZATIONS, specializations);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.GET_ALL_SPECIALIZATIONS, error);
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
    /**
     * Update a specialization
     * @param req Request object
     * @param res Response object
     * @returns ISpecializationResponse
     */
    updateSpecialization(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req;
            const specializationId = req.params.id;
            try {
                const payload = req.body;
                // Fetch the specialization by ID
                const specialization = yield specializationService_1.default.getSpecializationById(specializationId);
                if (!specialization) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, { specializationId });
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, null);
                }
                // Update the specialization
                const updatedSpecialization = yield specializationService_1.default.updateSpecialization(specializationId, payload, userId);
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.UPDATE_SPECIALIZATION, updatedSpecialization.specialization_id);
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.UPDATE_SPECIALIZATION, updatedSpecialization);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.UPDATE_SPECIALIZATION, { specializationId, error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
    /**
     * Get a specialization by ID
     * @param req Request object
     * @param res Response object
     * @returns ISpecializationResponse
     */
    getSpecializationById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const specializationId = req.params.id;
            try {
                // Fetch the specialization by ID
                const specialization = yield specializationService_1.default.getSpecializationById(specializationId);
                if (!specialization) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, '');
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, null);
                }
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.GET_SPECIALIZATION_BY_ID, specialization.specialization_id);
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.GET_SPECIALIZATION_BY_ID, specialization);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.GET_SPECIALIZATION_BY_ID, { specializationId, error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
    /**
     * Delete a specialization by ID
     * @param req Request object
     * @param res Response object
     * @returns IApiResponse
     */
    deleteSpecialization(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const specializationId = req.params.id;
            try {
                // Delete the specialization by ID
                const deletedSpecialization = yield specializationService_1.default.deleteSpecialization(specializationId);
                if (!deletedSpecialization) {
                    logger_1.logger.warn(__filename, req.method, '', message_1.ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, { specializationId });
                    return helper_1.ResponseHandler.error(res, http_status_1.default.NOT_FOUND, false, message_1.ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND, null);
                }
                logger_1.logger.info(__filename, req.method, '', message_1.SUCCESS_MESSAGE.DELETE_SPECIALIZATION, deletedSpecialization.specialization_id);
                return helper_1.ResponseHandler.success(res, http_status_1.default.OK, true, message_1.SUCCESS_MESSAGE.DELETE_SPECIALIZATION, null);
            }
            catch (error) {
                logger_1.logger.error(__filename, req.method, '', message_1.ERROR_MESSAGE.DELETE_SPECIALIZATION, { specializationId, error });
                return helper_1.ResponseHandler.error(res, http_status_1.default.INTERNAL_SERVER_ERROR, false, message_1.GLOBAL_MESSAGE.INTERNAL_SERVER_ERROR, error);
            }
        });
    }
}
exports.default = new SpecializationController();
//# sourceMappingURL=specializationController.js.map