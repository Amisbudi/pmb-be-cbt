'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Questions', [{
      package_question_id: 1,
      name: 'Apa nama ibu kota Jawa Barat?',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      package_question_id: 1,
      name: 'Apa nama ibu kota Jepang?',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      package_question_id: 1,
      name: 'Siapa nama pencipta lampu?',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      package_question_id: 1,
      name: 'Siapa penemu benua Amerika?',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      package_question_id: 1,
      name: 'Siapa penjahi bendera pusaka Indonesia?',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
