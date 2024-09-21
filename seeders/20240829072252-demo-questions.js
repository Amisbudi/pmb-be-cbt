'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('cbt_questions', [{
      package_question_id: 1,
      name: 'Apa nama ibu kota Jawa Barat?',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      package_question_id: 1,
      name: 'Apa nama ibu kota Jepang?',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      package_question_id: 1,
      name: 'Siapa nama pencipta lampu?',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      package_question_id: 1,
      name: 'Siapa penemu benua Amerika?',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      package_question_id: 1,
      name: 'Siapa penjahi bendera pusaka Indonesia?',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },
    //
    {
      package_question_id: 2,
      name: 'What is the correct verb to complete the sentence?',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      package_question_id: 2,
      name: 'Choose the correct form of the adjective: "This is the ____ book I have ever read."',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      package_question_id: 2,
      name: 'Select the correct word to complete the sentence: "He has been working here ____ three years."',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      package_question_id: 2,
      name: 'Choose the correct pronoun: "____ are going to the party tomorrow."',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    },{
      package_question_id: 2,
      name: 'Which of the following is a synonym for "happy"?',
      status: true,
      created_at: new Date(),
      updated_at: new Date(),
    }
  ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('cbt_questions', null, {});
  }
};
