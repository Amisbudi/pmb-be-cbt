'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Files', [{
      category_id: 1,
      name: 'Foto',
      namefile: 'foto',
      accept: 'image/*',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      category_id: 1,
      name: 'Kartu Keluarga',
      namefile: 'kartu-keluarga',
      accept: 'image/*',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Files', null, {});
  }
};
