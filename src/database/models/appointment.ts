import { DataTypes } from 'sequelize';
import sequelize from '../config/config';
import { addCommonFields, BaseModel } from './baseModel';

class Appointment extends BaseModel {}

Appointment.init(
  addCommonFields({
    appointment_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
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
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    slot_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'slot',
        key: 'slot_id',
      },
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'],
      defaultValue: 'Scheduled',
      allowNull: false,
    },
    cancellation_reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    consultation_type: {
      type: DataTypes.ENUM,
      values: ['In-Person', 'Video', 'Audio'],
      defaultValue: 'In-Person',
      allowNull: false,
    },
    reason_of_visit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    payment_status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Paid', 'Refunded'],
      defaultValue: 'Pending',
      allowNull: false,
    },
  }),
  {
    sequelize,
    modelName: 'Appointment',
    tableName: 'appointment',
  }
);

export default Appointment;
