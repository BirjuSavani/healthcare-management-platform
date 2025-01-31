import { DataTypes } from 'sequelize';
import sequelize from '../config/config';
import { addCommonFields, BaseModel } from './baseModel';
import UserMaster from './user';

class Review extends BaseModel {}

Review.init(
  addCommonFields({
    review_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4
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
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    review_text: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }),
  {
    sequelize,
    modelName: 'Review',
    tableName: 'review',
    timestamps: false
  }
);

Review.belongsTo(UserMaster, { foreignKey: 'created_by', as: 'createdBy' });
Review.belongsTo(UserMaster, { foreignKey: 'last_modified_by', as: 'lastModifiedBy' });

Review.belongsTo(UserMaster, { foreignKey: 'doctor_id', as: 'doctor' });
Review.belongsTo(UserMaster, { foreignKey: 'user_id', as: 'user' });

export default Review;
