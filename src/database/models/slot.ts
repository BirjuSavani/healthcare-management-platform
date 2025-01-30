import { DataTypes } from 'sequelize';
import sequelize from '../config/config';
import { addCommonFields, BaseModel } from './baseModel';
import UserMaster from './user';

class SlotMaster extends BaseModel {}

SlotMaster.init(
  addCommonFields({
    slot_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    doctor_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    day_of_week: {
      type: DataTypes.ENUM,
      values: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
      allowNull: false,
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    blocking_reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }),
  {
    sequelize,
    modelName: 'Slot',
    tableName: 'slot',
    timestamps: false,
  }
);

SlotMaster.belongsTo(UserMaster, { foreignKey: 'doctor_id', as: 'doctor' });

SlotMaster.belongsTo(UserMaster, { foreignKey: 'created_by', as: 'createdBy' });
SlotMaster.belongsTo(UserMaster, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });

export default SlotMaster;
