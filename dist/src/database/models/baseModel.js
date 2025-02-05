"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseModel = exports.addCommonFields = void 0;
const sequelize_1 = require("sequelize");
class BaseModel extends sequelize_1.Model {
}
exports.BaseModel = BaseModel;
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addCommonFields = (fields) => (Object.assign(Object.assign({}, fields), { created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }, updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }, created_by: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'user',
            key: 'user_id'
        },
        defaultValue: null
    }, last_modified_by: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'user',
            key: 'user_id'
        },
        defaultValue: null
    } }));
exports.addCommonFields = addCommonFields;
//# sourceMappingURL=baseModel.js.map