'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [{
      program_study_id: 1,
      name: 'CBT',
      price: 50000,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      program_study_id: 1,
      name: 'Seleksi Mandiri',
      price: 35000,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
