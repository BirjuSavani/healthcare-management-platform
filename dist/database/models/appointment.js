"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const baseModel_1 = require("./baseModel");
const slot_1 = __importDefault(require("./slot"));
const user_1 = __importDefault(require("./user"));
class Appointment extends baseModel_1.BaseModel {
}
Appointment.init((0, baseModel_1.addCommonFields)({
    appointment_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id'
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
    appointment_date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    slot_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'slot',
            key: 'slot_id'
        }
    },
    status: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'],
        defaultValue: 'Scheduled',
        allowNull: false
    },
    cancellation_reason: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    consultation_type: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['In-Person', 'Video', 'Audio'],
        defaultValue: 'In-Person',
        allowNull: false
    },
    reason_of_visit: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    notes: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    payment_status: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['Pending', 'Paid', 'Refunded'],
        defaultValue: 'Pending',
        allowNull: false
    }
}), {
    sequelize: config_1.default,
    tableName: 'appointment',
    modelName: 'Appointment',
    timestamps: false
});
Appointment.belongsTo(user_1.default, { foreignKey: 'user_id', as: 'user' });
Appointment.belongsTo(user_1.default, { foreignKey: 'doctor_id', as: 'doctor' });
Appointment.belongsTo(slot_1.default, { foreignKey: 'slot_id', as: 'slot' });
// Appointment.hasMany(AppointmentHistory, { foreignKey: 'appointment_id', as: 'appointmentHistories' });
// Appointment.hasOne(Prescription, { foreignKey: 'appointment_id', as: 'prescription' });
Appointment.belongsTo(user_1.default, { foreignKey: 'created_by', as: 'createdBy' });
Appointment.belongsTo(user_1.default, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });
exports.default = Appointment;
//# sourceMappingURL=appointment.js.map