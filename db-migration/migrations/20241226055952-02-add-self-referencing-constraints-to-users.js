'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint('user', {
      fields: ['created_by'],
      type: 'foreign key',
      name: 'fk_users_created_by',
      references: {
        table: 'user',
        field: 'user_id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addConstraint('user', {
      fields: ['last_modified_by'],
      type: 'foreign key',
      name: 'fk_users_last_modified_by',
      references: {
        table: 'user',
        field: 'user_id',
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('user', 'fk_users_created_by');
    await queryInterface.removeConstraint('user', 'fk_users_last_modified_by');
  },
};
