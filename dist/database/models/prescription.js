"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const appointment_1 = __importDefault(require("./appointment"));
const baseModel_1 = require("./baseModel");
const user_1 = __importDefault(require("./user"));
class Prescription extends baseModel_1.BaseModel {
}
Prescription.init((0, baseModel_1.addCommonFields)({
    prescription_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    appointment_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'appointment',
            key: 'appointment_id'
        }
    },
    doctor_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id'
        }
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id'
        }
    },
    prescription_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    diagnosis: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    medications: {
        type: sequelize_1.DataTypes.JSONB,
        allowNull: true
    },
    special_instructions: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    follow_up_recommendation: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    digital_signature: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}), {
    sequelize: config_1.default,
    tableName: 'prescription',
    modelName: 'Prescription',
    timestamps: false
});
Prescription.belongsTo(appointment_1.default, { foreignKey: 'appointment_id', as: 'appointment' });
Prescription.belongsTo(user_1.default, { foreignKey: 'doctor_id', as: 'doctor' });
Prescription.belongsTo(user_1.default, { foreignKey: 'user_id', as: 'user' });
Prescription.belongsTo(user_1.default, { foreignKey: 'created_by', as: 'createdBy' });
Prescription.belongsTo(user_1.default, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });
exports.default = Prescription;
//# sourceMappingURL=prescription.js.map