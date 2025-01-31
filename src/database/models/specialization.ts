import { DataTypes } from 'sequelize';
import sequelize from '../config/config';
import { addCommonFields, BaseModel } from './baseModel';
import UserMaster from './user';

class Specialization extends BaseModel {}

Specialization.init(
  addCommonFields({
    specialization_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    specialization_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }),
  {
    sequelize,
    modelName: 'Specialization',
    tableName: 'specialization',
    timestamps: false
  }
);

Specialization.belongsTo(UserMaster, { foreignKey: 'created_by', as: 'createdBy' });
Specialization.belongsTo(UserMaster, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });

export default Specialization;
