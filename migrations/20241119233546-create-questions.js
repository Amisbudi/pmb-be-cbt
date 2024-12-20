'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cbt_questions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      package_question_id: {
        type: Sequelize.BIGINT
      },
      id_group_questions: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      naration: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      name: {
        type: Sequelize.TEXT
      },
      image: {
        allowNull: true,
        type: Sequelize.BLOB,
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('cbt_questions');
  }
};