"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const baseModel_1 = require("./baseModel");
const specialization_1 = __importDefault(require("./specialization"));
const user_1 = __importDefault(require("./user"));
class UserMetaData extends baseModel_1.BaseModel {
}
UserMetaData.init((0, baseModel_1.addCommonFields)({
    user_metadata_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    medical_license_number: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    specialization_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: specialization_1.default,
            key: 'specialization_id'
        }
    },
    qualification: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    year_of_experience: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    consultation_fee: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    average_rating: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true
    },
    total_reviews: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    clinic_address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    city: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    state: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: user_1.default,
            key: 'user_id'
        }
    }
}), {
    sequelize: config_1.default,
    tableName: 'user_metadata',
    modelName: 'UserMetadata',
    timestamps: false
});
UserMetaData.belongsTo(user_1.default, { foreignKey: 'user_id', as: 'user' });
UserMetaData.belongsTo(user_1.default, { foreignKey: 'created_by', as: 'createdBy' });
UserMetaData.belongsTo(user_1.default, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });
UserMetaData.belongsTo(specialization_1.default, { foreignKey: 'specialization_id', as: 'specialization' });
exports.default = UserMetaData;
//# sourceMappingURL=userMetaData.js.map