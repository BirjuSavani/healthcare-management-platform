"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("../config/config"));
const baseModel_1 = require("./baseModel");
const user_1 = __importDefault(require("./user"));
class Review extends baseModel_1.BaseModel {
}
Review.init((0, baseModel_1.addCommonFields)({
    review_id: {
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
    user_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'user',
            key: 'user_id'
        }
    },
    rating: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    review_text: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}), {
    sequelize: config_1.default,
    modelName: 'Review',
    tableName: 'review',
    timestamps: false
});
Review.belongsTo(user_1.default, { foreignKey: 'created_by', as: 'createdBy' });
Review.belongsTo(user_1.default, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });
Review.belongsTo(user_1.default, { foreignKey: 'doctor_id', as: 'doctor' });
Review.belongsTo(user_1.default, { foreignKey: 'user_id', as: 'user' });
exports.default = Review;
//# sourceMappingURL=review.js.map