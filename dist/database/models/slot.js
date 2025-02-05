"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const baseModel_1 = require("./baseModel");
const user_1 = __importDefault(require("./user"));
class SlotMaster extends baseModel_1.BaseModel {
}
SlotMaster.init((0, baseModel_1.addCommonFields)({
    slot_id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    doctor_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id'
        }
    },
    day_of_week: {
        type: sequelize_1.DataTypes.ENUM,
        values: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
        allowNull: false
    },
    start_time: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: sequelize_1.DataTypes.TIME,
        allowNull: false
    },
    blocking_reason: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}), {
    sequelize: config_1.default,
    modelName: 'Slot',
    tableName: 'slot',
    timestamps: false
});
SlotMaster.belongsTo(user_1.default, { foreignKey: 'doctor_id', as: 'doctor' });
SlotMaster.belongsTo(user_1.default, { foreignKey: 'created_by', as: 'createdBy' });
SlotMaster.belongsTo(user_1.default, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });
exports.default = SlotMaster;
//# sourceMappingURL=slot.js.map