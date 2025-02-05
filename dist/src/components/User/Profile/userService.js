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
const logger_1 = require("../../../utils/logger");
class UserService {
    /**
     * Update user profile
     * @param userId User ID
     * @param payload User data
     */
    updateUserProfile(userId, payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [updatedCount, updatedRows] = yield models_1.UserMaster.update(Object.assign(Object.assign({}, payload), { last_modified_by: userId, updated_at: new Date() }), { where: { user_id: userId }, returning: true });
                if (updatedCount === 0) {
                    logger_1.logger.warn(__filename, '', '', message_1.ERROR_MESSAGE.USER_NOT_FOUND, { userId });
                    return null;
                }
                return updatedRows[0].get({ plain: true });
            }
            catch (error) {
                logger_1.logger.error(__filename, '', '', message_1.ERROR_MESSAGE.UPDATE_USER_PROFILE, { userId, error });
                throw new Error(`${message_1.ERROR_MESSAGE.UPDATE_USER_PROFILE}: ${error}`);
            }
        });
    }
}
exports.default = new UserService();
//# sourceMappingURL=userService.js.map