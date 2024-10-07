"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "cbt_package_questions",
      [
        {
          type_id: 1,
          name: "TIU 1",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 1,
          name: "TIU 2",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 1,
          name: "TIU 3",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 2,
          name: "Interview 1",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 2,
          name: "Interview 2",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 2,
          name: "Interview 3",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 3,
          name: "TPA 1",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 3,
          name: "TPA 2",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 3,
          name: "TPA 3",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 4,
          name: "Psikotest 1",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 4,
          name: "Psikotest 2",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 4,
          name: "Psikotest 3",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 5,
          name: "Bahasa Inggris 1",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 5,
          name: "Bahasa Inggris 2",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 5,
          name: "Bahasa Inggris 3",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 7,
          name: "Bahasa Indonesia 1",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 7,
          name: "Bahasa Indonesia 2",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 7,
          name: "Bahasa Indonesia 3",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 8,
          name: "Matematika 1",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 8,
          name: "Matematika 2",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          type_id: 8,
          name: "Matematika 3",
          status: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("cbt_package_questions", null, {});
  },
};
