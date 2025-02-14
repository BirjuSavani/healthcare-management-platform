import { DataTypes } from 'sequelize';
import sequelize from '../config/config';
import { addCommonFields, BaseModel } from './baseModel';
import Specialization from './specialization';
import UserMaster from './user';

class UserMetaData extends BaseModel {}

UserMetaData.init(
  addCommonFields({
    user_metadata_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
    },
    medical_license_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    specialization_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Specialization,
        key: 'specialization_id'
      }
    },
    qualification: {
      type: DataTypes.STRING,
      allowNull: false
    },
    year_of_experience: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    consultation_fee: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    average_rating: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    total_reviews: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    clinic_address: {
      type: DataTypes.STRING,
      allowNull: true
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: UserMaster,
        key: 'user_id'
      }
    }
  }),
  {
    sequelize,
    tableName: 'user_metadata',
    modelName: 'UserMetadata',
    timestamps: false
  }
);

UserMetaData.belongsTo(UserMaster, { foreignKey: 'user_id', as: 'user' });
UserMetaData.belongsTo(UserMaster, { foreignKey: 'created_by', as: 'createdBy' });
UserMetaData.belongsTo(UserMaster, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });

UserMetaData.belongsTo(Specialization, { foreignKey: 'specialization_id', as: 'specialization' });

export default UserMetaData;
