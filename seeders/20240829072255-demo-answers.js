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
    },
    {
      question_id: 6,
      name: 'goes',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 6,
      name: 'go',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 6,
      name: 'gone',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 6,
      name: 'going',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 7,
      name: 'more interesting',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 7,
      name: 'most interesting',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 7,
      name: 'interesting',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 7,
      name: 'interestinger',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 8,
      name: 'since',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 8,
      name: 'from',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 8,
      name: 'for',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 8,
      name: 'until',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 9,
      name: 'Them',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 9,
      name: 'They',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 9,
      name: 'Their',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 9,
      name: 'Those',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 10,
      name: 'Sad',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 10,
      name: 'Angry',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 10,
      name: 'Joyful',
      is_right: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      question_id: 10,
      name: 'Lonely',
      is_right: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Answers', null, {});
  }
};
