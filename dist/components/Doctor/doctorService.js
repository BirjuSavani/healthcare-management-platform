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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const message_1 = require("../../constant/message");
const models_1 = require("../../database/models");
const paginationHelper_1 = require("../../utils/helper/paginationHelper");
const logger_1 = require("../../utils/logger");
const authInterface_1 = require("../Auth/interface/authInterface");
class DoctorService {
    /**
     * Fetch all doctors with pagination and optional filters.
     * @param req - Express Request object
     * @returns Paginated list of doctors
     */
    getAllDoctors(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const { filter, page = 1, limit = 10 } = req.query;
            const pageNumber = Number(page);
            const pageSize = Number(limit);
            try {
                // Build where clause for filtering
                const whereClause = Object.assign({ isDeleted: false, role: authInterface_1.Role.DOCTOR }, (filter && {
                    [sequelize_1.Op.or]: [{ first_name: { [sequelize_1.Op.like]: `%${filter}%` } }, { last_name: { [sequelize_1.Op.like]: `%${filter}%` } }, { email: { [sequelize_1.Op.like]: `%${filter}%` } }]
                }));
                // Fetch doctors with pagination
                const userResult = yield models_1.UserMetaData.findAndCountAll({
                    include: [
                        {
                            model: models_1.Specialization,
                            as: 'specialization'
                        },
                        {
                            model: models_1.UserMaster,
                            as: 'user',
                            where: whereClause,
                            attributes: { exclude: ['password'] },
                            include: [
                                { model: models_1.UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
                                { model: models_1.UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] }
                            ]
                        }
                    ],
                    order: [['created_at', 'DESC']],
                    offset: (pageNumber - 1) * pageSize,
                    limit: pageSize,
                    nest: true
                });
                return (0, paginationHelper_1.paginate)(userResult.count, userResult.rows, { page: pageNumber, limit: pageSize });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.GET_ALL_DOCTORS, error);
                throw new Error(`${message_1.ERROR_MESSAGE.GET_ALL_DOCTORS}: ${error}`);
            }
        });
    }
    /**
     * Fetch a doctor by ID.
     * @param doctorId - ID of the doctor to fetch
     * @returns The doctor object
     */
    getDoctorById(doctorId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doctor = yield models_1.UserMetaData.findOne({
                    include: [
                        {
                            model: models_1.Specialization,
                            as: 'specialization'
                        },
                        {
                            model: models_1.UserMaster,
                            as: 'user',
                            attributes: { exclude: ['password'] },
                            include: [
                                { model: models_1.UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
                                { model: models_1.UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] }
                            ],
                            where: { isDeleted: false }
                        }
                    ],
                    where: { user_id: doctorId },
                    nest: true
                });
                const doctorData = doctor === null || doctor === void 0 ? void 0 : doctor.get({ plain: true });
                if (!doctorData) {
                    logger_1.logger.warn(__filename, '', '', message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND, { doctorId });
                    throw new Error(`${message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND}: ${doctorId}`);
                }
                const { user, specialization } = doctorData, metadata = __rest(doctorData, ["user", "specialization"]);
                // const doctorDetails = { user: { ...user }, user_metadata: { ...rest }, specialization: { ...specialization } };
                return {
                    user,
                    user_metadata: metadata,
                    specialization
                };
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.GET_DOCTOR_BY_ID, error);
                throw new Error(`${message_1.ERROR_MESSAGE.GET_DOCTOR_BY_ID}: ${error}`);
            }
        });
    }
    /**
     * Update doctor information.
     * @param doctorId - Doctor's ID
     * @param payload - Update payload
     * @param userId - ID of the user performing the update
     * @returns Updated doctor and metadata
     */
    updateDoctor(doctorId, payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const transaction = yield ((_a = models_1.UserMaster.sequelize) === null || _a === void 0 ? void 0 : _a.transaction());
            if (!transaction)
                throw new Error('Transaction initialization failed.');
            try {
                // Update UserMaster record
                const [updateCount, updatedDoctors] = yield models_1.UserMaster.update({
                    first_name: payload.first_name,
                    last_name: payload.last_name,
                    profile_image: payload.profile_image,
                    email: payload.email,
                    phone_number: payload.phone_number,
                    date_of_birth: payload.date_of_birth,
                    gender: payload.gender,
                    isActive: payload.isActive,
                    last_modified_by: userId
                }, {
                    where: { user_id: doctorId },
                    returning: true,
                    transaction
                });
                if (updateCount === 0) {
                    throw new Error(`${message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND} : ${doctorId}`);
                }
                // Update UserMetaData record
                const [metaUpdateCount, updatedMetaRecords] = yield models_1.UserMetaData.update({
                    medical_license_number: payload.medical_license_number,
                    specialization_id: payload.specialization_id,
                    qualification: payload.qualification,
                    year_of_experience: payload.year_of_experience,
                    consultation_fee: payload.consultation_fee,
                    average_rating: payload.average_rating,
                    total_reviews: payload.total_reviews,
                    clinic_address: payload.clinic_address,
                    city: payload.city,
                    state: payload.state,
                    country: payload.country,
                    last_modified_by: userId
                }, {
                    where: { user_id: doctorId },
                    returning: true,
                    transaction
                });
                if (metaUpdateCount === 0) {
                    throw new Error(`${message_1.ERROR_MESSAGE.DOCTOR_NOT_FOUND} : ${doctorId}`);
                }
                // Commit transaction
                yield transaction.commit();
                return {
                    user: updatedDoctors[0].get({ plain: true }),
                    meta: updatedMetaRecords[0].get({ plain: true })
                };
            }
            catch (error) {
                // Rollback transaction on error
                if (transaction)
                    yield transaction.rollback();
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.UPDATE_DOCTOR, error);
                throw new Error(`${message_1.ERROR_MESSAGE.UPDATE_DOCTOR}: ${error}`);
            }
        });
    }
}
exports.default = new DoctorService();
//# sourceMappingURL=doctorService.js.map