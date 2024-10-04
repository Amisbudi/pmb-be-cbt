"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "exam_type",
      [
        {
          name: "TPA",
          active_status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "English",
          active_status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cbt_types", null, {});
  },
};
