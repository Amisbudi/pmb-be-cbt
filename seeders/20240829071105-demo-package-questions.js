'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PackageQuestions', [{
      type_id: 1,
      name: 'TPA 1',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      type_id: 1,
      name: 'TPA 2',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PackageQuestions', null, {});
  }
};
