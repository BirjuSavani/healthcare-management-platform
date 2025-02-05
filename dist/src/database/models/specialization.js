"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const baseModel_1 = require("./baseModel");
const user_1 = __importDefault(require("./user"));
class Specialization extends baseModel_1.BaseModel {
}
Specialization.init((0, baseModel_1.addCommonFields)({
    specialization_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    specialization_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}), {
    sequelize: config_1.default,
    modelName: 'Specialization',
    tableName: 'specialization',
    timestamps: false
});
Specialization.belongsTo(user_1.default, { foreignKey: 'created_by', as: 'createdBy' });
Specialization.belongsTo(user_1.default, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });
exports.default = Specialization;
//# sourceMappingURL=specialization.js.map