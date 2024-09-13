'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Types', [{
      category_id: 1,
      name: 'TPA',
      passing_grade: 75,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      category_id: 1,
      name: 'English',
      passing_grade: 75,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {});
  }
};
