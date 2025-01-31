import { DataTypes } from 'sequelize';
import sequelize from '../config/config';
import Appointment from './appointment';
import { addCommonFields, BaseModel } from './baseModel';
import UserMaster from './user';

class Prescription extends BaseModel {}

Prescription.init(
  addCommonFields({
    prescription_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    appointment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'appointment',
        key: 'appointment_id'
      }
    },
    doctor_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    prescription_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: true
    },
    medications: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    special_instructions: {
      type: DataTypes.STRING,
      allowNull: true
    },
    follow_up_recommendation: {
      type: DataTypes.STRING,
      allowNull: true
    },
    digital_signature: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }),
  {
    sequelize,
    tableName: 'prescription',
    modelName: 'Prescription',
    timestamps: false
  }
);

Prescription.belongsTo(Appointment, { foreignKey: 'appointment_id', as: 'appointment' });
Prescription.belongsTo(UserMaster, { foreignKey: 'doctor_id', as: 'doctor' });
Prescription.belongsTo(UserMaster, { foreignKey: 'user_id', as: 'user' });

Prescription.belongsTo(UserMaster, { foreignKey: 'created_by', as: 'createdBy' });
Prescription.belongsTo(UserMaster, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });

export default Prescription;
