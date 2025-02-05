"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const appointment_1 = __importDefault(require("./appointment"));
const baseModel_1 = require("./baseModel");
const slot_1 = __importDefault(require("./slot"));
const user_1 = __importDefault(require("./user"));
class AppointmentHistory extends baseModel_1.BaseModel {
}
AppointmentHistory.init((0, baseModel_1.addCommonFields)({
    appointment_history_id: {
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
    rescheduled_from: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'appointment',
            key: 'appointment_id'
        }
    },
    rescheduled_to: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true,
        references: {
            model: 'slot',
            key: 'slot_id'
        }
    }
}), {
    sequelize: config_1.default,
    modelName: 'Appointment_History',
    tableName: 'appointment_history',
    timestamps: false
});
AppointmentHistory.belongsTo(user_1.default, { foreignKey: 'created_by', as: 'createdBy' });
AppointmentHistory.belongsTo(user_1.default, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });
AppointmentHistory.belongsTo(appointment_1.default, { foreignKey: 'appointment_id', as: 'appointment' });
AppointmentHistory.belongsTo(appointment_1.default, { foreignKey: 'rescheduled_from', as: 'rescheduledFrom' });
AppointmentHistory.belongsTo(user_1.default, { foreignKey: 'user_id', as: 'user' });
AppointmentHistory.belongsTo(user_1.default, { foreignKey: 'doctor_id', as: 'doctor' });
AppointmentHistory.belongsTo(slot_1.default, { foreignKey: 'slot_id', as: 'slot' });
AppointmentHistory.belongsTo(slot_1.default, { foreignKey: 'rescheduled_to', as: 'rescheduledTo' });
exports.default = AppointmentHistory;
//# sourceMappingURL=appointmentHistory.js.map