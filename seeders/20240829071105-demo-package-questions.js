'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cbt_package_questions', [{
      type_id: 1,
      name: 'TPA 1',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      type_id: 2,
      name: 'English 1',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cbt_package_questions', null, {});
  }
};
