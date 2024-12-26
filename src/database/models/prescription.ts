import { DataTypes } from 'sequelize';
import sequelize from '../config/config';
import { addCommonFields, BaseModel } from './baseModel';

class Prescription extends BaseModel {}

Prescription.init(
  addCommonFields({
    prescription_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    appointment_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'appointment',
        key: 'appointment_id',
      },
    },
    doctor_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    prescription_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    medications: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    special_instructions: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    follow_up_recommendation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    digital_signature: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }),
  {
    sequelize,
    modelName: 'Prescription',
    tableName: 'prescription',
  }
);

export default Prescription;