'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cbt_types', [{
      category_id: 1,
      name: 'TPA',
      passing_grade: 75,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      category_id: 1,
      name: 'English',
      passing_grade: 75,
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cbt_types', null, {});
  }
};
