'use strict';
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, _Sequelize) {
    const userId = uuidv4();

    await queryInterface.bulkInsert('user', [
      {
        user_id: userId,
        first_name: 'Master',
        last_name: 'Admin',
        profile_image: null, // Set to null if it's not required
        email: 'masteradmin@dpa.com',
        phone_number: '9737725468',
        password: bcryptjs.hashSync('12345678', 10), // Hashed password
        role: 'superadmin',
        date_of_birth: '2001-10-07', // You might want to set a specific DOB
        gender: 'male',
        isActive: true, // Use camelCase consistently
        created_by: userId, // Set to null if no creator
        last_modified_by: userId, // Set to null if no modifier
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.bulkDelete('user', { email: 'masteradmin@dpa.com' }, {}); // Target specific user for rollback
  },
};
