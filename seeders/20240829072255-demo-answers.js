'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Answers', [{
      question_id: 1,
      name: 'Bandung',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 1,
      name: 'Tasikmalaya',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 1,
      name: 'Garut',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 1,
      name: 'Ciamis',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 2,
      name: 'New York',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 2,
      name: 'Lombok',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 2,
      name: 'Jakarta',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 2,
      name: 'Tokyo',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 3,
      name: 'Suzuki',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 3,
      name: 'Siti Nurhaliza',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 3,
      name: 'Thomas Alfa Edison',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 3,
      name: 'Edo',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 4,
      name: 'Gajah Mada',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 4,
      name: 'Columbus',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 4,
      name: 'Jokowi',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 4,
      name: 'Hayam Wuruk',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 5,
      name: 'Ibu Fatmawati',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 5,
      name: 'Ibu Imas',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 5,
      name: 'Ibu Entin',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 5,
      name: 'Ibu Siti',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Answers', null, {});
  }
};
