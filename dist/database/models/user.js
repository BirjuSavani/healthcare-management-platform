"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const baseModel_1 = require("./baseModel");
class UserMaster extends baseModel_1.BaseModel {
}
UserMaster.init((0, baseModel_1.addCommonFields)({
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    first_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    profile_image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    date_of_birth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    gender: {
        type: sequelize_1.DataTypes.ENUM,
        allowNull: false,
        values: ['male', 'female', 'other']
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    isDeleted: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    reset_password_token: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    reset_password_expires: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}), {
    sequelize: config_1.default,
    modelName: 'User',
    tableName: 'user',
    timestamps: false
});
UserMaster.belongsTo(UserMaster, { as: 'createdBy', foreignKey: 'created_by' });
UserMaster.belongsTo(UserMaster, { as: 'lastModifiedBy', foreignKey: 'last_modified_by' });
exports.default = UserMaster;
//# sourceMappingURL=user.js.map