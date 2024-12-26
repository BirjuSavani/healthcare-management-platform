'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('user_metadata', {
      user_metadata_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      medical_license_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      specialization_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'specialization',
          key: 'specialization_id',
        },
      },
      qualification: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      year_of_experience: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      consultation_fee: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      average_rating: {
        type: Sequelize.DECIMAL,
        allowNull: true,
      },
      total_reviews: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      clinic_address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      created_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'user',
          key: 'user_id',
        },
      },
      last_modified_by: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'user',
          key: 'user_id',
        },
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('user_metadata');
  },
};
