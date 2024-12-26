import { DataTypes } from 'sequelize';
import sequelize from '../config/config';
import { addCommonFields, BaseModel } from './baseModel';

class AppointmentHistory extends BaseModel {}

AppointmentHistory.init(
  addCommonFields({
    appointment_history_id: {
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
    rescheduled_from: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'appointment',
        key: 'appointment_id',
      },
    },
    rescheduled_to: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'slot',
        key: 'slot_id',
      },
    },
  }),
  {
    sequelize,
    modelName: 'Appointment_History',
    tableName: 'appointment_history',
  }
);

export default AppointmentHistory;
