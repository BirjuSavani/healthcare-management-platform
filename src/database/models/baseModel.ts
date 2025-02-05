import { DataTypes, Model } from 'sequelize';

class BaseModel extends Model {}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const addCommonFields = (fields: any): any => ({
  ...fields,
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  created_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'user',
      key: 'user_id'
    },
    defaultValue: null
  },
  last_modified_by: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'user',
      key: 'user_id'
    },
    defaultValue: null
  }
});

export { addCommonFields, BaseModel };
