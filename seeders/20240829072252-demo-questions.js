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
    },
    //
    {
      package_question_id: 2,
      name: 'What is the correct verb to complete the sentence?',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      package_question_id: 2,
      name: 'Choose the correct form of the adjective: "This is the ____ book I have ever read."',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      package_question_id: 2,
      name: 'Select the correct word to complete the sentence: "He has been working here ____ three years."',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      package_question_id: 2,
      name: 'Choose the correct pronoun: "____ are going to the party tomorrow."',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      package_question_id: 2,
      name: 'Which of the following is a synonym for "happy"?',
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {});
  }
};
