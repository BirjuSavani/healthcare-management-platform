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
const sequelize_1 = require("sequelize");
const message_1 = require("../../../constant/message");
const models_1 = require("../../../database/models");
const commonUtils_1 = require("../../../utils/commonUtils");
const paginationHelper_1 = require("../../../utils/helper/paginationHelper");
const logger_1 = require("../../../utils/logger");
const authInterface_1 = require("../../Auth/interface/authInterface");
class AdminService {
    /**
     * Get all users
     * @returns Promise<IUserData[]>
     */
    getAllUsers(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { filter, page = req.query.page || 1, limit = req.query.limit || 10 } = req.query;
                // Build where clause
                const whereClause = {
                    isDeleted: false,
                    role: {
                        [sequelize_1.Op.ne]: authInterface_1.Role.SUPER_ADMIN
                    }
                };
                // Apply filter
                if (filter) {
                    whereClause[sequelize_1.Op.or] = [
                        { first_name: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { last_name: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { email: { [sequelize_1.Op.like]: `%${filter}%` } },
                        { role: { [sequelize_1.Op.like]: `%${filter}%` } }
                    ];
                }
                // Fetch users with pagination
                const user = yield models_1.UserMaster.findAndCountAll({
                    where: whereClause,
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: models_1.UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
                        { model: models_1.UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] }
                    ],
                    order: [['created_at', 'DESC']],
                    offset: (Number(page) - 1) * Number(limit),
                    limit: Number(limit)
                });
                return (0, paginationHelper_1.paginate)(user.count, user.rows, { page: Number(page), limit: Number(limit) });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.GET_ALL_USERS, error);
                throw new Error(`${message_1.ERROR_MESSAGE.GET_ALL_USERS}: ${error}`);
            }
        });
    }
    /**
     * Get user by id
     * @param userId - ID of the user to retrieve
     * @returns Promise<IUser | null>
     */
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield models_1.UserMaster.findByPk(userId, {
                    attributes: { exclude: ['password'] },
                    include: [
                        { model: models_1.UserMaster, as: 'createdBy', attributes: ['first_name', 'last_name'] },
                        { model: models_1.UserMaster, as: 'lastModifiedBy', attributes: ['first_name', 'last_name'] }
                    ]
                });
                return user ? user.get({ plain: true }) : null;
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.GET_USER_BY_ID, { userId, error });
                throw new Error(`${message_1.ERROR_MESSAGE.GET_USER_BY_ID}: ${error}`);
            }
        });
    }
    /**
     * Update user by ID
     * @param userId - ID of the user to update
     * @param payload - Data to update the user
     * @returns Promise<IUserData>
     */
    updateUser(updateUserId, payload, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hasPassword = yield (0, commonUtils_1.convertPlainTextToHash)(payload.password);
                const [updateCount, updatedUsers] = yield models_1.UserMaster.update(Object.assign(Object.assign({}, payload), { password: hasPassword, last_modified_by: userId, updated_at: new Date() }), {
                    where: { user_id: updateUserId },
                    returning: true
                });
                if (updateCount === 0 || !updatedUsers[0]) {
                    logger_1.logger.warn(__filename, '', '', message_1.ERROR_MESSAGE.USER_NOT_FOUND, { updateUserId });
                    throw new Error(`${message_1.ERROR_MESSAGE.USER_NOT_FOUND} : ${updateUserId}`);
                }
                return updatedUsers[0].get({ plain: true });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.UPDATE_USER, { updateUserId, error });
                throw new Error(`${message_1.ERROR_MESSAGE.UPDATE_USER}: ${error}`);
            }
        });
    }
    /**
     * Delete user by ID
     * @param userId - ID of the user to delete
     * @returns Promise<IUserData>
     */
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Find the user by primary key
                const user = yield models_1.UserMaster.findByPk(userId);
                if (!user) {
                    logger_1.logger.warn(__filename, '', '', message_1.ERROR_MESSAGE.USER_NOT_FOUND, { userId });
                    throw new Error(`${message_1.ERROR_MESSAGE.USER_NOT_FOUND} : ${userId}`);
                }
                // Mark user as deleted and save changes
                yield user.update({ isDeleted: true, isActive: false });
                return user.get({ plain: true });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.DELETE_USER, { userId, error });
                throw new Error(`${message_1.ERROR_MESSAGE.DELETE_USER}: ${error}`);
            }
        });
    }
}
exports.default = new AdminService();
//# sourceMappingURL=adminService.js.map