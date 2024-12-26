import { DataTypes } from 'sequelize';
import sequelize from '../config/config';
import { addCommonFields, BaseModel } from './baseModel';

class Review extends BaseModel {}

Review.init(
  addCommonFields({
    review_id: {
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
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    rating: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    review_text: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  }),
  {
    sequelize,
    modelName: 'Review',
    tableName: 'review',
  }
);

export default Review;
