import { DataTypes, Model } from 'sequelize';

class BaseModel extends Model {}

const addCommonFields = (fields: any) => ({
  ...fields,
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'user',
      key: 'user_id',
    },
  },
  last_modified_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'user',
      key: 'user_id',
    },
  },
});

export { addCommonFields, BaseModel };
