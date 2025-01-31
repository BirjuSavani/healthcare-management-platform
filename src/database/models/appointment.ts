import { DataTypes } from 'sequelize';
import sequelize from '../config/config';
import { addCommonFields, BaseModel } from './baseModel';
import SlotMaster from './slot';
import UserMaster from './user';

class Appointment extends BaseModel {}

Appointment.init(
  addCommonFields({
    appointment_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
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
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    slot_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'slot',
        key: 'slot_id'
      }
    },
    status: {
      type: DataTypes.ENUM,
      values: ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'],
      defaultValue: 'Scheduled',
      allowNull: false
    },
    cancellation_reason: {
      type: DataTypes.STRING,
      allowNull: true
    },
    consultation_type: {
      type: DataTypes.ENUM,
      values: ['In-Person', 'Video', 'Audio'],
      defaultValue: 'In-Person',
      allowNull: false
    },
    reason_of_visit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true
    },
    payment_status: {
      type: DataTypes.ENUM,
      values: ['Pending', 'Paid', 'Refunded'],
      defaultValue: 'Pending',
      allowNull: false
    }
  }),
  {
    sequelize,
    tableName: 'appointment',
    modelName: 'Appointment',
    timestamps: false
  }
);

Appointment.belongsTo(UserMaster, { foreignKey: 'user_id', as: 'user' });
Appointment.belongsTo(UserMaster, { foreignKey: 'doctor_id', as: 'doctor' });
Appointment.belongsTo(SlotMaster, { foreignKey: 'slot_id', as: 'slot' });
// Appointment.hasMany(AppointmentHistory, { foreignKey: 'appointment_id', as: 'appointmentHistories' });
// Appointment.hasOne(Prescription, { foreignKey: 'appointment_id', as: 'prescription' });

Appointment.belongsTo(UserMaster, { foreignKey: 'created_by', as: 'createdBy' });
Appointment.belongsTo(UserMaster, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });
export default Appointment;
