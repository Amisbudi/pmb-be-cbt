"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cbt_package_question_users",
      [
        {
          package_question_id: 1,
          user_id: "3277777777777777",
          classes: "Reguler",
          date_exam: (() => {
            let examDate = new Date();
            examDate.setSeconds(examDate.getSeconds() + 10);
            return examDate;
          })(),
          date_start: null,
          date_end: null,
          request_camera: false,
          camera_status: false,
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },{
          package_question_id: 2,
          user_id: "3277777777777777",
          classes: "Reguler",
          date_exam: (() => {
            let examDate = new Date();
            examDate.setSeconds(examDate.getSeconds() + 10);
            return examDate;
          })(),
          date_start: null,
          date_end: null,
          request_camera: false,
          camera_status: false,
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cbt_package_question_users", null, {});
  },
};
