'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('prescription', {
      prescription_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      appointment_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'appointment',
          key: 'appointment_id',
        },
      },
      doctor_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id',
        },
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id',
        },
      },
      prescription_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      diagnosis: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      medications: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      special_instructions: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      follow_up_recommendation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      digital_signature: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('prescription');
  },
};
