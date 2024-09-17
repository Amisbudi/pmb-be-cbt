'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PackageQuestionUsers', [{
      package_question_id: 1,
      user_id: 1,
      classes: 'Reguler',
      date_exam: null,
      date_start: null,
      date_end: null,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      package_question_id: 2,
      user_id: 1,
      classes: 'Reguler',
      date_exam: null,
      date_start: null,
      date_end: null,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PackageQuestionUsers', null, {});
  }
};
