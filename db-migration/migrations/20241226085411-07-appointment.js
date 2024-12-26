'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('appointment', {
      appointment_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id',
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
      appointment_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      slot_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'slot',
          key: 'slot_id',
        },
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'],
        defaultValue: 'Scheduled',
        allowNull: false,
      },
      cancellation_reason: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      consultation_type: {
        type: Sequelize.ENUM,
        values: ['In-Person', 'Video', 'Audio'],
        defaultValue: 'In-Person',
        allowNull: false,
      },
      reason_of_visit: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      notes: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      payment_status: {
        type: Sequelize.ENUM,
        values: ['Pending', 'Paid', 'Refunded'],
        defaultValue: 'Pending',
        allowNull: false,
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
    await queryInterface.dropTable('appointment');
  },
};
