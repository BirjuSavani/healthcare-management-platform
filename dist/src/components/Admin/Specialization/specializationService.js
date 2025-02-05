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
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../../../constant/message");
const models_1 = require("../../../database/models");
const paginationHelper_1 = require("../../../utils/helper/paginationHelper");
const logger_1 = require("../../../utils/logger");
class SpecializationService {
    /**
     * Get specialization by name
     * @param name Specialization name
     * @returns ISpecialization | null
     */
    getSpecializationByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const specialization = yield models_1.Specialization.findOne({ where: { specialization_name: name } });
                return specialization ? specialization.get({ plain: true }) : null;
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.GET_SPECIALIZATION_BY_NAME, error);
                throw new Error(`${message_1.ERROR_MESSAGE.GET_SPECIALIZATION_BY_NAME}: ${error}`);
            }
        });
    }
    /**
     * Create a new specialization
     * @param payload Specialization data
     * @param userId User creating the specialization
     * @returns ISpecialization
     */
    createSpecialization(payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const specialization = yield models_1.Specialization.create(Object.assign(Object.assign({}, payload), { created_by: userId, last_modified_by: userId }));
                return specialization.get({ plain: true });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.CREATE_SPECIALIZATION, error);
                throw new Error(`${message_1.ERROR_MESSAGE.CREATE_SPECIALIZATION}: ${error}`);
            }
        });
    }
    /**
     * Get all specializations
     * @returns ISpecialization[]
     */
    getAllSpecializations(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = req.query.page || 1, limit = req.query.limit || 10 } = req.query;
                const specializations = yield models_1.Specialization.findAndCountAll({
                    include: [
                        { model: models_1.UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
                        { model: models_1.UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] }
                    ],
                    order: [['created_at', 'DESC']],
                    offset: (Number(page) - 1) * Number(limit),
                    limit: Number(limit)
                });
                return (0, paginationHelper_1.paginate)(specializations.count, specializations.rows, { page: Number(page), limit: Number(limit) });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.GET_ALL_SPECIALIZATIONS, error);
                throw new Error(`${message_1.ERROR_MESSAGE.GET_ALL_SPECIALIZATIONS}: ${error}`);
            }
        });
    }
    /**
     * Get specialization by ID
     * @param specializationId Specialization ID
     * @returns ISpecialization | null
     */
    getSpecializationById(specializationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const specialization = yield models_1.Specialization.findOne({
                    where: { specialization_id: specializationId },
                    include: [
                        { model: models_1.UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
                        { model: models_1.UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] }
                    ]
                });
                return specialization ? specialization.get({ plain: true }) : null;
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.GET_SPECIALIZATION_BY_ID, error);
                throw new Error(`${message_1.ERROR_MESSAGE.GET_SPECIALIZATION_BY_ID}: ${error}`);
            }
        });
    }
    /**
     * Update specialization by ID
     * @param specializationId Specialization ID
     * @param payload Specialization data
     * @param userId User updating the specialization
     * @returns ISpecialization
     */
    updateSpecialization(specializationId, payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const specialization = yield models_1.Specialization.findByPk(specializationId);
                if (!specialization) {
                    throw new Error(message_1.ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND);
                }
                const updatedSpecialization = yield specialization.update(Object.assign(Object.assign({}, payload), { last_modified_by: userId }));
                return updatedSpecialization.get({ plain: true });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.UPDATE_SPECIALIZATION, error);
                throw new Error(`${message_1.ERROR_MESSAGE.UPDATE_SPECIALIZATION}: ${error}`);
            }
        });
    }
    /**
     * Delete specialization by ID
     * @param specializationId Specialization ID
     * @returns ISpecialization
     */
    deleteSpecialization(specializationId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const specialization = yield models_1.Specialization.findByPk(specializationId);
                if (!specialization) {
                    throw new Error(message_1.ERROR_MESSAGE.SPECIALIZATION_NOT_FOUND);
                }
                yield specialization.destroy();
                return specialization.get({ plain: true });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.DELETE_SPECIALIZATION, error);
                throw new Error(`${message_1.ERROR_MESSAGE.DELETE_SPECIALIZATION}: ${error}`);
            }
        });
    }
}
exports.default = new SpecializationService();
//# sourceMappingURL=specializationService.js.map