'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Answers', [{
      question_id: 1,
      name: 'Hitam',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 1,
      name: 'Biru',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 1,
      name: 'Kuning',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 1,
      name: 'Hijau',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Answers', null, {});
  }
};
