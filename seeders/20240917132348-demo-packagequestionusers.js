'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('PackageQuestionUsers', [{
      package_question_id: 1,
      user_id: "3277777777777777",
      classes: 'Reguler',
      date_exam: (() => {
        let examDate = new Date();
        examDate.setSeconds(examDate.getSeconds() + 10);
        return examDate;
      })(),
      date_start: null,
      date_end: null,
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },{
      package_question_id: 2,
      user_id: "3277777777777777",
      classes: 'Employee',
      date_exam: null,
      date_start: (() => {
        let examDate = new Date();
        examDate.setSeconds(examDate.getSeconds() + 10);
        return examDate;
      })(),
      date_end: (() => {
        let examDate = new Date();
        examDate.setDate(examDate.getDate() + 1);
        return examDate;
      })(),
      status: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('PackageQuestionUsers', null, {});
  }
};
